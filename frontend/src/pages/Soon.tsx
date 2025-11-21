import { useState, useRef } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import { API_URL } from "../API_URL";
import { useToken } from "../hooks/useToken";

const Soon = () => {
  const [form, setForm] = useState({
    company_name: "",
    document_reference: "",
    rev_no: "",
    rev_date: "",
    assessed_by: "",
    title: "Safety Officer",
    signature: "",
  });

  const { token } = useToken();
  const sigCanvas = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setForm((prev) => ({ ...prev, signature: "" }));
  };

  const saveSignature = () => {
    const data = sigCanvas.current?.toDataURL();
    setForm((prev) => ({ ...prev, signature: data || "" }));
  };

  const handleSubmit = async () => {
    try {
      const payload = { ...form };
      console.log("payload is", payload);

      const res = await fetch(`${API_URL}/risk-evaluations`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get("content-type");
      let data: any;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        alert(`❌ Server returned non-JSON response: ${text}`);
        return;
      }

      if (!res.ok) {
        console.error("Backend error:", data);
        alert(`❌ Error: ${data.error || data.message || "Failed to save"}`);
        return;
      }

      alert("✅ Saved successfully");
      setForm({
        company_name: "",
        document_reference: "",
        rev_no: "",
        rev_date: "",
        assessed_by: "",
        title: "Safety Officer",
        signature: "",
      });
      sigCanvas.current?.clear();
    } catch (err) {
      console.error("err", err);
      alert("❌ An error occurred");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Basic Risk Assessment Info</Typography>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Company Name"
          name="company_name"
          value={form.company_name}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Document Reference"
          name="document_reference"
          value={form.document_reference}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Revision No."
          name="rev_no"
          value={form.rev_no}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Revision Date"
          name="rev_date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.rev_date}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Assessed By"
          name="assessed_by"
          value={form.assessed_by}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={form.title}
          disabled
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1">Signature</Typography>
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas",
            style: { backgroundColor: "#f5f5f5", border: "1px solid #ccc" },
          }}
        />
        <Button
          onClick={saveSignature}
          variant="outlined"
          sx={{ mt: 1, mr: 1 }}
        >
          Save Signature
        </Button>
        <Button onClick={clearSignature} variant="outlined" sx={{ mt: 1 }}>
          Clear
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default Soon;
