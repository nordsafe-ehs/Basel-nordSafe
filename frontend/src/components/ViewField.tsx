import { Grid2, Typography } from "@mui/material";
import { Input } from "../types/Sidebar";

import { FormType } from "../types/Form";

const ViewField = ({
  input: {
    label,
    size,
    type,
    inputs,
    onValue,
    title,
    subTitle,
    name,
    deletable,
  },
  form,
}: {
  input: Input;
  form: FormType;
}) => {
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
          <ViewField key={input.name} input={{ ...input }} form={form} />
        ))}
      {label && (
        <Grid2
          size={{
            xs: 12,
            md: size == "full" || onValue || type == "textarea" ? 12 : 6,
          }}
        >
          <Typography fontWeight={700}>{label}:</Typography>
          <Typography color="primary.main">
            {name &&
              // @ts-expect-error 123
              (typeof form[name] == "object" ? form[name].value : form[name])}
          </Typography>
        </Grid2>
      )}
      {typeof (name && (form[name] as string)) == "string" &&
        onValue?.[name ? (form[name] as string) : ""]?.map((input) => (
          <ViewField key={input.name} input={{ ...input }} form={form} />
        ))}
    </>
  );
};

export default ViewField;
