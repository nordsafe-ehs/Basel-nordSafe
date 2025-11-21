import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../API_URL";
import { useAlert } from "../context/AlertContext";
import { useGetLink } from "../hooks/useGetLink";
import { useToken } from "../hooks/useToken";
import { FormType } from "../types/Form";
import { Input } from "../types/Sidebar";
import {
  findLastRepeatedGroupsRepeatNumber,
  findRepetitiveGroup,
  flattenInputs,
} from "../utils/functions";
import InputField from "./InputField";
import { useTranslation } from "react-i18next";

const Form = () => {
  const { t } = useTranslation();
  const link = useGetLink();
  const [form, setForm] = useState<FormType>({});
  const navigate = useNavigate();
  const { token, activeProject } = useToken();
  const [stayOnPage, setStayOnPage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { showAlert, closeAlert } = useAlert();
  const { id } = useParams();
  const { pathname } = useLocation();
  const [inputs, setInputs] = useState<Input[]>([]);
  const [editForm, setEditForm] = useState<FormType>({});

  useEffect(() => {
    if (id)
      (async () => {
        const res = await fetch(`${API_URL}/reports/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok) setEditForm(data.data);
      })();
    else setEditForm({});
    // i18n.changeLanguage()
  }, [token, id, pathname]);

  useEffect(() => {
    if (!editForm || !link?.inputs) return;
    const inputs: Input[] = [];
    const fi = flattenInputs(link.inputs);

    for (const key in editForm) {
      if (Object.prototype.hasOwnProperty.call(editForm, key)) {
        const match = key.match(/--(\d+)/);
        if (match) {
          const tmpKey: string = key.replace(/--\d+/, "");
          const input = fi.find((input) => input.name == tmpKey);

          if (input && input.parent)
            inputs.push({
              ...input.parent,
              inputs: input.parent.inputs?.map((input) => ({
                ...input,
                name: `${input.name}--${match[1]}`,
              })),
              repeatNumber: parseInt(match[1]),
              deletable: true,
            });
        }
      }
    }

    setInputs((prev) => [
      ...prev,
      ...Array.from(
        new Map(inputs.map((item) => [item.repeatNumber, item])).values()
      ),
    ]);
  }, [editForm, link?.inputs]);

  useEffect(() => {
    if (link?.inputs) setInputs(link.inputs);
  }, [pathname, link]);

  if (!link)
    return <Typography>{t("Something went wrong")}</Typography>;

  const handleSubmit = async () => {
    closeAlert();
    setLoading(true);

    if (!link.inputs) return;

    const fi = flattenInputs(link.inputs);

    // 1️⃣ Validate required fields
    for (let i = 0; i < fi.length; i++) {
      const input = fi[i];
      if (!input.name || input.optional || input.type === "checkbox") continue;

      const value = form[input.name];
      if (value === "" || (value instanceof FileList && value.length === 0)) {
        setLoading(false);
        return showAlert(`${input.label} is required`, "error");
      }
    }

    //2️⃣ Determine endpoint
    const API_ROUTE = link.href?.replace(
      /\/report|\/add|\/safety-tools\/checklists|\//gi,
      ""
    );

    let endpoint = `reports?type=${API_ROUTE}&projectId=${activeProject?.id}&editId=${id}`;

    if (link.endpoint) {
      endpoint = `${link.endpoint}?projectId=${activeProject?.id}&editId=${id}`;
      if (link.endpoint === "checklists") {
        endpoint = `checklists?name=${API_ROUTE}&projectId=${activeProject?.id}&editId=${id}`;
      }
    }

    try {
      let body: FormData | string;
      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };

      // 3️⃣ Check if form has any FileList
      const hasFiles = Object.values(form).some(
        (v) => v instanceof FileList && v.length > 0
      );

      if (hasFiles) {
        body = new FormData();
        Object.keys(form).forEach((key) => {
          const value = form[key];

          if (value instanceof FileList) {
            Array.from(value).forEach((file) =>
              (body as FormData).append(key, file)
            );
          } else {
            (body as FormData).append(key, value as string | Blob);
          }
        });
        // Don't set Content-Type, browser will handle multipart/form-data
      } else {
        body = JSON.stringify(form);
        headers["Content-Type"] = "application/json";
      }

      // 4️⃣ Send request
      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: id ? "PATCH" : "POST",
        headers,
        body,
      });

      const data = await res.json();

      setLoading(false);
      showAlert(data.message, res.ok ? "success" : "error");

      // 5️⃣ Reset or navigate
      setTimeout(() => {
        if (!stayOnPage) {
          if (res.ok) navigate(link.listHref || "/");
        } else {
          setForm((prev) => {
            const newForm: FormType = {};
            Object.keys(prev).forEach((key) => {
              newForm[key] = "";
            });
            return newForm;
          });
          closeAlert();
        }
      }, 2000);
    } catch (err) {
      setLoading(false);
      console.error(err);
      showAlert("Failed to submit form", "error");
    }
  };

  const handleAddNew = (title: string) => {
    if (!link.inputs) return;
    const groupToDuplicate = findRepetitiveGroup(link.inputs, title);
    const repeatNumber = findLastRepeatedGroupsRepeatNumber(inputs, title);
    let redCount = 1;

    const repeatInputsInTree = (_inputs: Input[], title: string): Input[] => {
      return _inputs.flatMap((input) => {
        if (
          input.title === title &&
          input.assignRepetitive &&
          input.repeatNumber
        )
          redCount = input.repeatNumber + 1;

        if (
          redCount == repeatNumber &&
          groupToDuplicate &&
          input.title === title &&
          input.assignRepetitive
        )
          return [
            input,
            {
              ...groupToDuplicate,
              inputs: groupToDuplicate.inputs?.map((input) => ({
                ...input,
                name: `${input.name}--${repeatNumber}`,
              })),
              deletable: true,
              repeatNumber,
            },
          ];

        if (input.inputs) {
          return {
            ...input,
            inputs: repeatInputsInTree(input.inputs, title),
          };
        }

        return input;
      });
    };

    setInputs((inputs) => repeatInputsInTree(inputs, title));
  };

  const handleDeleteItem = (repeatNumber: number) => {
    const deleteByRepeatNumber = (
      inputs: Input[],
      repeatNumber: number
    ): Input[] => {
      return inputs
        .filter((input) => input.repeatNumber !== repeatNumber) // remove matches at this level
        .map((input) => {
          // if has nested inputs, clean them too
          if (input.inputs && input.inputs.length > 0) {
            return {
              ...input,
              inputs: deleteByRepeatNumber(input.inputs, repeatNumber),
            };
          }
          return input;
        });
    };

    setInputs((inputs) => deleteByRepeatNumber(inputs, repeatNumber));
  };

  return (
    <>
      <Grid2 container spacing={2} mb={7}>
        {inputs.map((input) => (
          <InputField
            key={input.name || input.title}
            input={{ ...input }}
            form={form}
            setForm={setForm}
            handleAddNew={handleAddNew}
            handleDeleteItem={handleDeleteItem}
            editForm={editForm}
          />
        ))}
        <Grid2 size={12}>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={stayOnPage}
                onChange={(e) => setStayOnPage(e.target.checked)}
              />
            }
            label={
              <Typography fontSize={14}>
                {t("Stay on this page after submit?")}
              </Typography>
            }
          />
        </Grid2>
      </Grid2>
      <Stack
        sx={{
          position: "absolute",
          bottom: 0,
          right: 10,
          p: 2,
          width: { xs: 1, lg: "calc(100vw - 350px - 20px)" },
          zIndex: 1000,
          bgcolor: "white",
        }}
      >
        <Button
          onClick={handleSubmit}
          size="large"
          loading={loading}
          variant="contained"
          fullWidth
        >
          {t("Save")}
        </Button>
      </Stack>
    </>
  );
};

export default Form;
