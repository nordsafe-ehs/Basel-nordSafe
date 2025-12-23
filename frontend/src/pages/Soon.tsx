import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import { API_URL } from "../API_URL";
import axios from "axios";

export default function AddFormDialog({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    documentId: "",
    title: "",
    projectNumber: "",
    projectName: "",
    client: "",
    contract: "",
    projectManager: "",
    revisionNo: "",
    preparedBy: "",
    approvedBy: "",
  });

  const [records, setRecords] = useState<any[]>([]);

  // تحديث التوقيع من SignatureField
  // const handleSignatureChange = (name: string, value: string) => {
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API_URL}/participants`, formData);
  if (onCreated) {
    onCreated(res.data.documentId); // يرسل الـ documentId للـ parent
  }      console.log("Form submitted:", res.data);
      alert("Successfully created ✅");

      setRecords([...records, formData]);
      setOpen(false);
      setFormData({
        documentId: "",
        title: "",
        projectNumber: "",
        projectName: "",
        client: "",
        contract: "",
        projectManager: "",
        revisionNo: "",
        preparedBy: "",
        approvedBy: "",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      alert("error ❌: " + error.message);
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          sx={{ background: "#172E4E ", color: "#fff" }}
        >
          Add New
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        sx={{ overflow: "hidden" }}
        maxWidth="sm"
      >
        <DialogContent sx={{ background: "#F0FFF8", color: "black" }}>
          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
            General Information
          </DialogTitle>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {Object.keys(formData).map((key) => (
              <Grid item xs={6} key={key}>
                <TextField
                  sx={{ background: "white" }}
                  label={key.replace(/([A-Z])/g, " $1")}
                  name={key}
                  value={(formData as any)[key]}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
          {/* <Box sx={{ mt: 3 }}>
            <Typography fontWeight="bold" mb={1}>
              Responsible Signature
            </Typography>
            <SignatureField
              name="signatureUrl"
              value={formData.signatureUrl}
              onChange={handleSignatureChange}
            />
          </Box> */}
        </DialogContent>
        <DialogActions
          sx={{
            background: "#F0FFF8",
            display: "flex",
            py: 1,
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              background: "#172E4E",
              color: "white",
              px: 9,
              borderRadius: 4,
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mt: 3 }}>
        {records.map((record, index) => (
          <Box
            key={index}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: "6px",
              background: "#F0FFF8",
            }}
          >
            <Typography variant="h5" fontWeight={"bold"} mb={1} sx={{ mb: 1 }}>
              General Information
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography mb={1}>
                  <strong>Document ID:</strong> {record.documentId}
                </Typography>
                <Typography mb={1}>
                  <strong>Project number:</strong> {record.projectNumber}
                </Typography>
                <Typography mb={1}>
                  <strong>Client:</strong> {record.client}
                </Typography>
                <Typography mb={1}>
                  <strong>Project manager:</strong> {record.projectManager}
                </Typography>
                <Typography mb={1}>
                  <strong>Prepared by:</strong> {record.preparedBy}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography mb={1}>
                  <strong>Title:</strong> {record.title}
                </Typography>
                <Typography mb={1}>
                  <strong>Project name:</strong> {record.projectName}
                </Typography>
                <Typography mb={1}>
                  <strong>Contract:</strong> {record.contract}
                </Typography>
                <Typography mb={1}>
                  <strong>Revision no.:</strong> {record.revisionNo}
                </Typography>
                <Typography mb={1}>
                  <strong>Approved by:</strong> {record.approvedBy}
                </Typography>
                {/* <Typography mb={1}>
                  <strong>Signature is:</strong> {record.signatureUrl}
                </Typography> */}
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </>
  );
}
