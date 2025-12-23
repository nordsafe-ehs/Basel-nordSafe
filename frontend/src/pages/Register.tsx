import {
  Alert,
  Button,
  Collapse,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { API_URL } from "../API_URL";
import InputField from "../components/InputField";
import { registerInputs } from "../data/RegisterInputs";
import { FormType } from "../types/Form";
import { useTranslation } from "react-i18next";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState<FormType>({});
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<"error" | "success">("error");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

 useEffect(() => {
   if (!form.orgNumber || form.country != "NO") return;
   (async () => {
     const res = await fetch(API_URL + "/companies/company-name", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         orgNumber: form.orgNumber,
       }),
     });

     const data = await res.json();

     setForm((prev) => ({
       ...prev,
       phoneNumber: data.phoneNumber,
       email: data.email,
       name: data.name,
     }));
   })();
 }, [form.orgNumber, form.country]);

  useEffect(() => {
    if (!form.plan)
      setForm((prev) => ({ ...prev, plan: searchParams.get("planid") || "" }));
  }, [form, searchParams]);

  // const handleSubmit = async (e: FormEvent) => {
  //   setSeverity("error");
  //   setOpen(false);
  //   setMessage("");
  //   e.preventDefault();
  //   setLoading(true);

  //   const res = await fetch(API_URL + "/users/register", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(form),
  //   });
  //   const data = await res.json();
  //   setLoading(false);
  //   setOpen(true);
  //   setMessage(data.message);
  //   if (!res.ok) return;
  //   setSeverity("success");
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 1000);
  // };

 const handleSubmit = async (e: FormEvent) => {
   e.preventDefault();
   setSeverity("error");
   setOpen(false);
   setMessage("");

   // ✅ تحقق من الحقول المطلوبة
   if (form.country && form.country !== "OTHER" && !form.orgNumber) {
     setMessage("Company organization number is required");
     setOpen(true);
     return;
   }
   if (form.country === "OTHER" && !form.customCountry) {
     setMessage("Please specify your country");
     setOpen(true);
     return;
   }

   setLoading(true);

   const res = await fetch(API_URL + "/users/register", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(form),
   });
   const data = await res.json();

   setLoading(false);
   setOpen(true);
   setMessage(data.message);
   if (!res.ok) return;
   setSeverity("success");
   setTimeout(() => navigate("/"), 1000);
 };


  return (
    <Stack py={5} px={2} alignItems="center" justifyContent="center">
      <Stack
        width={1}
        maxWidth={900}
        bgcolor="white"
        borderRadius={1}
        boxShadow={3}
        p={3}
      >
        <Typography variant="h5" color="primary.main" fontWeight={600}>
          {t("Register your company")}
        </Typography>
        <Typography variant="body2" mb={2}>
          {t("Please fill in the fields below to register your company.")}
        </Typography>
        <Grid2 container spacing={2}>
          {registerInputs?.map((input, i) => (
            <InputField
              key={i}
              input={{ ...input }}
              form={form}
              setForm={setForm}
            />
          ))}
          <Grid2 size={12}>
            <Collapse in={open}>
              <Alert variant="filled" sx={{ mt: 2 }} severity={severity}>
                {message}
              </Alert>
            </Collapse>
          </Grid2>
          <Grid2 size={12}>
            <Button
              size="large"
              loading={loading}
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              {t("Submit")}
            </Button>
          </Grid2>
        </Grid2>
      </Stack>
    </Stack>
  );
};

export default Register;
