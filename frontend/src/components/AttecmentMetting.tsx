
import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { API_URL } from "../API_URL";

const BASE_URL = `${API_URL}`; // ✅ رابط أساسي للملفات

const AttachmentsTable = ({ meetingId }) => {
  const [attachments, setAttachments] = useState([]);
  const [member, setMember] = useState("");
  const [file, setFile] = useState(null);
  const [docName, setDocName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // ✅ جلب المرفقات
  const fetchAttachments = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/attachments?meetingId=${meetingId}`
      );
      setAttachments(res.data);
    } catch (err) {
      console.error("Error fetching attachments:", err);
    }
  };

  // ✅ إضافة مرفق جديد
  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append("documentName", docName);
      formData.append("member", member);
      formData.append("meetingId", meetingId);
      if (file) formData.append("file", file);

      await axios.post(`${API_URL}/attachments`, formData);

      fetchAttachments();
      setDocName("");
      setMember("");
      setFile(null);
      setOpenDialog(false);
    } catch (err) {
      console.error(
        "Error adding attachment:",
        err.response?.data || err.message
      );
    }
  };

  // ✅ حذف مرفق
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/attachments/${deleteId}`);
      setDeleteId(null);
      fetchAttachments();
    } catch (err) {
      console.error("Error deleting attachment:", err);
    }
  };

  useEffect(() => {
    fetchAttachments();
  }, [meetingId]);

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Attachments
      </Typography>

      {/* زر فتح الديالوغ */}
      <Box sx={{display:'flex', justifyContent:'flex-end'}}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
          onClick={() => setOpenDialog(true)}
        >
          Add Attachment
        </Button>
      </Box>

      {/* ✅ ديالوغ لإضافة مرفق */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Attachment</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Member"
            value={member}
            onChange={(e) => setMember(e.target.value)}
            fullWidth
          />

          {/* أيقونة رفع ملف بدل كلمة Choose */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton component="label" color="primary">
              <CloudUploadIcon />
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  setFile(selectedFile);
                  if (selectedFile) setDocName(selectedFile.name);
                }}
              />
            </IconButton>
            <Typography variant="body2">
              {docName ? docName : "No file selected"}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleAdd}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* جدول المرفقات */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Document</TableCell>
            <TableCell>Member</TableCell>
            <TableCell>File</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attachments.map((att) => (
            <TableRow key={att.id}>
              <TableCell>{att.id}</TableCell>
              <TableCell>
                {att.filePath ? (
                  <a
                    href={`${BASE_URL}${att.filePath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {att.documentName}
                  </a>
                ) : (
                  att.documentName
                )}
              </TableCell>
              <TableCell>{att.member}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    window.open(
                      `${API_URL}/attachments/${att.id}/download`,
                      "_blank"
                    )
                  }
                >
                  Download
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setDeleteId(att.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ✅ نافذة تأكيد الحذف */}
      <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>هل أنت متأكد أنك تريد حذف هذا المرفق؟</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AttachmentsTable;
