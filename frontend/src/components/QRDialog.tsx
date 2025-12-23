import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import QRCode from "react-qr-code";
import { API_URL } from "../API_URL";
import { useAlert } from "../context/AlertContext";
import { useToken } from "../hooks/useToken";

const AddSDSDialog = ({ open, onClose, onSave }) => {
  const { token } = useToken();
  const { showAlert, closeAlert } = useAlert();

  const [form, setForm] = useState({
    project_name: "",
    company: "",
    role: "",
    responsible: "",
    phone: "",
    location: "",
  });

  const [qrData, setQrData] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      closeAlert();
      const res = await fetch(API_URL + "/sds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        showAlert(data.message, "success");
        onSave({ ...form, doc_id: Date.now().toString() });
        setQrData(JSON.stringify(form));
      } else {
        showAlert(data.message, "error");
      }
    } catch (err) {
      showAlert("Something went wrong", "error");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography sx={{ textAlign: "center" }} variant="h6" fontWeight="bold">
          Substance Catalog
        </Typography>
        <Typography
          sx={{ textAlign: "center" }}
          variant="subtitle2"
          color="text.secondary"
        >
          Generator QR code
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          {/* Row 1 */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Project Name"
              value={form.project_name}
              onChange={(e) => handleChange("project_name", e.target.value)}
              fullWidth
            />
            <TextField
              label="Company"
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              fullWidth
            />
          </Stack>

          {/* Row 2 */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Role"
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
              fullWidth
            />
            <TextField
              label="Responsible person"
              value={form.responsible}
              onChange={(e) => handleChange("responsible", e.target.value)}
              fullWidth
            />
          </Stack>

          {/* Row 3 */}
          <Stack direction="row" spacing={2}>
            <TextField
              label="Phone"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              fullWidth
            />
            <TextField
              label="Project location"
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              fullWidth
            />
          </Stack>

          {/* QR Preview */}
          {qrData && (
            <Stack mt={4} alignItems="center">
              <QRCode value={qrData} />
            </Stack>
          )}
        </Stack>
      </DialogContent>

      {/* بدل DialogActions العادي */}
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#003366", px:7 }}
          onClick={handleSubmit}
        >
          Generate QR code
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSDSDialog;
