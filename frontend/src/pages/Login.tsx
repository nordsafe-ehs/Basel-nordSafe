import { Alert, Box, Button, Collapse, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../API_URL";
import InputField from "../components/InputField";
import { FormType } from "../types/Form";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState<FormType>({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<"error" | "success">("error");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setSeverity("error");
    setOpen(false);
    setMessage("");

    const res = await fetch(API_URL + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log("data is",data);
    setOpen(true);
    setLoading(false);
    setMessage(data.message);
    if (!res.ok) return;
    setSeverity("success");
    localStorage.setItem("token", data.token);
    localStorage.setItem("activeProject", JSON.stringify(data.activeProject));
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Stack
      height="100vh"
      width={1}
      p={2}
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        width={1}
        maxWidth={500}
        bgcolor="white"
        borderRadius={1}
        boxShadow={3}
        p={3}
      >
        <Typography variant="h5" fontWeight={600}>
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          {t("Please enter your credentials to access your account.")}
        </Typography>
        <InputField
          form={form}
          setForm={setForm}
          input={{
            label: "Email",
            name: "email",
            height: "medium",
          }}
        />
        <Box mt={2} />
        <InputField
          form={form}
          setForm={setForm}
          input={{
            label: "Password",
            name: "password",
            height: "medium",
            type: "password",
          }}
        />
        <Collapse in={open}>
          <Alert sx={{ mt: 2 }} variant="filled" severity={severity}>
            {message}
          </Alert>
        </Collapse>
        <Button
          loading={loading}
          variant="contained"
          sx={{ mt: 2, cursor: loading ? "not-allowed" : "pointer" }}
          size="large"
          onClick={handleSubmit}
        >
          {t("Login")}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Login;
