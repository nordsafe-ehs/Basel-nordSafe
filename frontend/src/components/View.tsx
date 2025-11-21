import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { API_URL } from "../API_URL";
import { useAlert } from "../context/AlertContext";
import { useGetLink } from "../hooks/useGetLink";
import { useToken } from "../hooks/useToken";
import { FormType } from "../types/Form";
import { Input } from "../types/Sidebar";
import { flattenInputs } from "../utils/functions";
import ViewField from "./ViewField";
import { useTranslation } from "react-i18next";

type Statuses = "Open" | "In Progress" | "Closed";

const View = () => {
  const link = useGetLink();
  const { token, decodedToken } = useToken();
  const { id } = useParams();
  const [inputs, setInputs] = useState<Input[]>([]);
  const [viewForm, setViewForm] = useState<FormType>({});
  const [assignReport, setAssignReport] = useState<
    {
      status: Statuses;
      id: number;
      fullname: string;
    }[]
  >([]);
  const { pathname } = useLocation();
  const { closeAlert, showAlert } = useAlert();
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/reports/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (!res.ok) return;
      setViewForm(data.data);
      if (data.assignReport) {
        setAssignReport(data.assignReport);
      }
    })();
  }, [token, id]);

  useEffect(() => {
    if (!viewForm || !link?.inputs) return;
    const inputs: Input[] = [];
    const fi = flattenInputs(link.inputs);

    for (const key in viewForm) {
      if (Object.prototype.hasOwnProperty.call(viewForm, key)) {
        const match = key.match(/--(\d+)/);
        if (match) {
          const tmpKey: string = key.replace(/--\d+/, "");
          const input = fi.find((input) => input.name == tmpKey);

          if (input && input.parent)
            inputs.push({
              ...input.parent,
              inputs: [
                ...(input.parent.inputs?.map((input) => ({
                  ...input,
                  name: `${input.name}--${match[1]}`,
                })) || []),
                {
                  label: "Status",
                  size: "full",
                  name: `status--${match[1]}`,
                },
              ],
              repeatNumber: parseInt(match[1]),
              deletable: true,
            });
        }
      }
    }

    // @ts-expect-error 111
    setInputs((prev) => [
      ...prev.map((input) => {
        return input.assignRepetitive
          ? {
              ...input,
              inputs: [
                ...(input.inputs || []),
                {
                  label: "Status",
                  name: `status`,
                  size: "full",
                },
              ],
            }
          : input;
      }),
      ...Array.from(
        new Map(inputs.map((item) => [item.repeatNumber, item])).values()
      ),
    ]);
  }, [viewForm, link?.inputs]);

  useEffect(() => {
    if (link?.inputs) setInputs(link.inputs);
  }, [pathname, link]);

  if (!link) return <Typography>{t("Something went wrong")}</Typography>;

  const handleUpdateStatus = async () => {
    if (!assignReport) return;
    closeAlert();
    const res = await fetch(`${API_URL}/reports/status`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignReport),
    });
    if (!res.ok) return;
    const data = await res.json();
    showAlert(data.message, res.ok ? "success" : "error");
  };

  return (
    <>
      <Grid2 container spacing={2}>
        {inputs.map((input) => (
          <ViewField
            key={input.name || input.title}
            input={{ ...input }}
            form={viewForm}
          />
        ))}
      </Grid2>
      {assignReport.some(({ fullname }) => fullname == decodedToken.fullname) ||
      decodedToken.role == "admin" ||
      decodedToken.role == "super-admin" ? (
        <Stack alignItems="start" mt={2}>
          <Typography fontWeight={700}>Statuses:</Typography>
          {assignReport
            .filter((item) =>
              decodedToken.role == "admin" || decodedToken.role == "super-admin"
                ? true
                : item.fullname == decodedToken.fullname
            )
            .map(({ status, fullname }, i) => (
              <Stack
                direction="row"
                key={fullname}
                alignItems="center"
                gap={2}
                sx={{
                  span: { textTransform: "capitalize" },
                }}
              >
                <FormControl component="fieldset">
                  <FormLabel>
                    {fullname == decodedToken.fullname ? (
                      <>{t("My assign status:")}</>
                    ) : (
                      <>
                        <span>{fullname}</span> {t("assign status:")}
                      </>
                    )}
                  </FormLabel>
                  <RadioGroup
                    value={status}
                    onChange={(e) =>
                      setAssignReport((prev) => {
                        const tmp = [...prev];
                        tmp[i].status = e.target.value as Statuses;
                        return tmp;
                      })
                    }
                    row
                  >
                    {[
                      {
                        label: "Open",
                      },
                      {
                        label: "In Progress",
                      },
                      {
                        label: "Closed",
                      },
                    ].map(({ label }) => (
                      <FormControlLabel
                        key={label}
                        value={label}
                        control={<Radio />}
                        label={label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Stack>
            ))}
          <Button
            sx={{ mt: 2 }}
            fullWidth
            variant="contained"
            size="large"
            onClick={handleUpdateStatus}
          >
            {t("update status")}
          </Button>
        </Stack>
      ) : (
        ""
      )}
    </>
  );
};

export default View;
