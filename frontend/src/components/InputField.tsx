import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FetchedOption, Input, Option } from "../types/Sidebar";

import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "../API_URL";
import { useToken } from "../hooks/useToken";
import { FormType } from "../types/Form";
import LocationPicker from "./Inputs/LocationPicker";
import { useTranslation } from "react-i18next";

const InputField = ({
  input,
  form,
  setForm,
  handleAddNew,
  handleDeleteItem,
  editForm,
}: {
  input: Input;
  form: FormType;
  setForm: Dispatch<SetStateAction<FormType>>;
  handleAddNew?: (title: string) => void;
  handleDeleteItem?: (i: number) => void;
  editForm?: FormType;
}) => {
  const {
    label: _label,
    size,
    type,
    options: _options,
    inputs,
    onValue,
    title,
    subTitle,
    multiple,
    info,
    name,
    infoType = "text",
    optional,
    assignRepetitive,
    deletable,
    repeatNumber,
    height,
    readonly,
  } = input;
  const [v, setV] = useState<FormType[0]>("");
  const [options, setOptions] = useState<Option[]>([]);
  const { token, activeProject } = useToken();
  const { pathname } = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation();

  const label = useMemo(
    () =>
      type == "radio" ? _label : _label && _label + (optional ? "" : " *"),
    [optional, _label, type]
  );

  useEffect(() => {
    if (Array.isArray(_options)) return setOptions(_options);

    if (typeof _options == "object") {
      (async () => {
        const options = _options as FetchedOption;
        const res = await fetch(
          `${API_URL}/${options.endpoint}?projectId=${activeProject?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setOptions(
          data.map((item: { [key: string]: string }) => ({
            label: item[options.name],
            value: item.id,
          }))
        );
      })();
    }
  }, [_options, token, activeProject]);

  const handleChange = (v: FormType[0]) => {
    setV(v);
    if (name) setForm((form) => ({ ...form, [name]: v }));
  };

  useEffect(() => {
    setTimeout(() => {
      if (!name) return;
      let value: FormType[0] = "";
      switch (type) {
        case "checkbox":
          value = false;
          break;
        case "date":
        case "time":
          value = new Date().toString();
          break;
        case "radio":
          if (Array.isArray(options))
            value = options[0].value || options[0].label;
          break;
      }

      if (editForm?.[name]) {
        value =
          typeof editForm[name] == "object"
            ? // @ts-expect-error 123
              editForm[name].id
            : editForm[name];
      }

      setForm((form) => ({
        ...form,
        [name]: value,
      }));
    }, 10);

    return () => {
      if (name) {
        setForm((form) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [name]: _, ...rest } = form;
          return rest;
        });
      }
    };
  }, [setForm, name, type, pathname, options, editForm]);

  useEffect(() => {
    if (name && form[name] !== undefined) setV(form[name]);
  }, [form, name]);

  useEffect(() => {
    setV("");
  }, [pathname]);

  return (
    <>
      {!deletable && title && (
        <Grid2 size={12}>
          <Typography variant="h6" fontWeight={700} color="primary">
            {title}
          </Typography>
        </Grid2>
      )}
      {subTitle && (
        <Grid2 size={12}>
          <Typography color="secondary">{subTitle}</Typography>
        </Grid2>
      )}
      {inputs &&
        inputs.map((input) => (
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
      {label && (
        <Grid2
          size={{
            xs: 12,
            md: size == "full" || onValue || type == "textarea" ? 12 : 6,
          }}
        >
          {type == "select" ? (
            !!_options && (
              <>
                <FormControl fullWidth size="small">
                  <InputLabel>{label}</InputLabel>
                  <Select
                    label={label}
                    fullWidth
                    onChange={(e) =>
                      handleChange(e.target.value as FormType[0])
                    }
                    value={v}
                  >
                    {options?.map(({ label, value }) => (
                      <MenuItem key={value || label} value={value || label}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {!options.length && (
                  <Typography
                    sx={{
                      a: {
                        color: "primary.main",
                      },
                    }}
                    variant="body2"
                    color="textSecondary"
                  >
                    {t("No options?")}
                    <Typography
                      to={`/${(_options as FetchedOption)?.endpoint}/add`}
                      component={Link}
                    >
                      {t("add options")}
                    </Typography>
                  </Typography>
                )}
              </>
            )
          ) : type == "radio" ? (
            <FormControl component="fieldset">
              <FormLabel>{label}</FormLabel>
              <RadioGroup
                value={v}
                onChange={(e) => handleChange(e.target.value)}
                row
              >
                {options?.map(({ label, value }) => (
                  <FormControlLabel
                    key={value || label}
                    value={value}
                    control={<Radio />}
                    label={label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ) : type == "file" ? (
            <>
              <Typography color="secondary" mb={2}>
                {label}
              </Typography>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  color: "#777",
                  borderColor: "#999",
                  textTransform: "unset",
                }}
              >
                {v
                  ? Object.values(v as FileList)
                      .map((file) => file.name)
                      .join(", ")
                  : "Choose the files"}
                <input
                  multiple={multiple}
                  type="file"
                  onChange={(e) =>
                    handleChange(e.target.files?.length ? e.target.files : "")
                  }
                  hidden
                />
              </Button>
            </>
          ) : type == "time" ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label={label}
                value={v ? dayjs(v as string) : null}
                onChange={(value) =>
                  value && handleChange(value.format("h:mm:ss A"))
                }
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          ) : type == "date" ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={label}
                value={v ? dayjs(v as string) : null}
                onChange={(value) =>
                  value && handleChange(value.format("ddd, D MMM YYYY"))
                }
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          ) : type == "checkbox" ? (
            <FormControlLabel
              control={
                <Checkbox
                  value={v}
                  onChange={(_, checked) => {
                    handleChange(checked);
                  }}
                />
              }
              label={(label as string).replace("*", "")}
            />
          ) : type == "location" ? (
            <LocationPicker
              label={label as string}
              value={v as string}
              onChange={(v) => handleChange(v)}
            />
          ) : (
            <Stack position="relative">
              <TextField
                sx={{
                  display: type == "hidden" ? "none" : "",
                }}
                slotProps={{
                  input: {
                    readOnly: readonly,
                  },
                }}
                size={height || "small"}
                fullWidth
                label={label}
                multiline={type == "textarea"}
                minRows={3}
                maxRows={6}
                value={v}
                onChange={(e) => handleChange(e.target.value)}
                type={
                  type == "password"
                    ? !showPassword
                      ? "password"
                      : "text"
                    : type
                }
              />
              {type == "password" && (
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                    svg: {
                      fontSize: height == "medium" ? "unset" : 15,
                    },
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <VisibilityOffRounded />
                  ) : (
                    <VisibilityRounded />
                  )}
                </IconButton>
              )}
            </Stack>
          )}
          {info &&
            (infoType == "text" ? (
              <Typography
                sx={{
                  a: {
                    color: "primary.main",
                  },
                }}
                variant="body2"
                color="textSecondary"
              >
                {info}
              </Typography>
            ) : (
              info
            ))}
        </Grid2>
      )}
      {typeof v == "string" &&
        onValue?.[v]?.map((input) => (
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
      {deletable && handleDeleteItem && repeatNumber && (
        <Grid2 size={12}>
          <Stack alignItems="end">
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteItem(repeatNumber)}
            >
              {t("Delete")}
            </Button>
          </Stack>
        </Grid2>
      )}
      {!deletable && assignRepetitive && handleAddNew && title && (
        <Grid2 size={12}>
          <Stack alignItems="end">
            <Button variant="contained" onClick={() => handleAddNew(title)}>
              {t("Add new")}
            </Button>
          </Stack>
        </Grid2>
      )}
    </>
  );
};

export default InputField;
