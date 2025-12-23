// import { useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Divider,
//   IconButton,
//   TextField,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";
// import axios from "axios";
// import { API_URL } from "../API_URL";

// const SessionDetailsForm = ({
//   meetingId,
//   onMeetingCreated,
// }: {
//   meetingId?: number;
//   onMeetingCreated?: (id: number) => void;
// }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     company: "",
//     project: "",
//     duration: "",
//     meetingDate: "",
//     attenders: "",
//     status: "open",
//     classification: "internal",
//   });

//   const [editField, setEditField] = useState<string | null>(null);
//   const [openDialog, setOpenDialog] = useState(false);

//   const handleCreateMeeting = async () => {
//     try {
//       const res = await axios.post(`${API_URL}/meetings`, formData);
//       if (onMeetingCreated) onMeetingCreated(res.data.id);
//       setFormData(res.data);
//       setOpenDialog(false);
//     } catch (err) {
//       console.error("Error creating meeting:", err);
//     }
//   };

//   const handleAddNewMeeting = () => {
//     setFormData({
//       title: "",
//       description: "",
//       company: "",
//       project: "",
//       duration: "",
//       meetingDate: "",
//       attenders: "",
//       status: "open",
//       classification: "internal",
//     });
//     setEditField(null);
//     setOpenDialog(true);
//   };

//   const handleSaveField = async (field: string) => {
//     setEditField(null);

//     if (meetingId) {
//       try {
//         const res = await axios.put(
//           `${API_URL}/meetings/${meetingId}`,
//           formData
//         );
//         setFormData(res.data);
//       } catch (err) {
//         console.error("Error updating meeting:", err);
//       }
//     }
//   };

//   const EditableRow = ({
//     label,
//     field,
//     value,
//   }: {
//     label: string;
//     field: string;
//     value: string;
//   }) => (
//     <>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 1,
//         }}
//       >
//         {editField === field ? (
//           <>
//             <TextField
//               value={(formData as any)[field]}
//               onChange={(e) =>
//                 setFormData({ ...formData, [field]: e.target.value })
//               }
//               size="small"
//               sx={{ flex: 1, mr: 1 }}
//               type={field === "meetingDate" ? "date" : "text"}
//               InputLabelProps={field === "meetingDate" ? { shrink: true } : {}}
//             />
//             <IconButton onClick={() => handleSaveField(field)} color="primary">
//               <SaveIcon />
//             </IconButton>
//           </>
//         ) : (
//           <>
//             <Typography sx={{ flex: 1 }}>
//               <strong>{label}:</strong>{" "}
//               {field === "meetingDate" && value
//                 ? new Date(value).toLocaleDateString()
//                 : value || "—"}
//             </Typography>
//             <IconButton onClick={() => setEditField(field)} color="success">
//               <EditIcon />
//             </IconButton>
//           </>
//         )}
//       </Box>
//       <Divider sx={{ my: 1 }} />
//     </>
//   );

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Session Details
//       </Typography>

//       <Button variant="contained" sx={{ mb: 2 }} onClick={handleAddNewMeeting}>
//         Add New Meeting
//       </Button>

//       <Dialog
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Add New Meeting</DialogTitle>
//         <DialogContent
//           sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
//         >
//           {Object.keys(formData).map((key) => (
//             <TextField
//               key={key}
//               label={key}
//               fullWidth
//               value={(formData as any)[key]}
//               onChange={(e) =>
//                 setFormData({ ...formData, [key]: e.target.value })
//               }
//               type={key === "meetingDate" ? "date" : "text"}
//               InputLabelProps={key === "meetingDate" ? { shrink: true } : {}}
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleCreateMeeting}>
//             Save Meeting
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Paper sx={{ p: 2 }}>
//         <EditableRow label="Title" field="title" value={formData.title} />
//         <EditableRow
//           label="Description"
//           field="description"
//           value={formData.description}
//         />
//         <EditableRow label="Company" field="company" value={formData.company} />
//         <EditableRow label="Project" field="project" value={formData.project} />
//         <EditableRow
//           label="Duration"
//           field="duration"
//           value={formData.duration}
//         />
//         <EditableRow
//           label="Date"
//           field="meetingDate"
//           value={formData.meetingDate}
//         />
//         <EditableRow
//           label="Attenders"
//           field="attenders"
//           value={formData.attenders}
//         />
//         <EditableRow label="Status" field="status" value={formData.status} />
//         <EditableRow
//           label="Classification"
//           field="classification"
//           value={formData.classification}
//         />
//       </Paper>
//     </Box>
//   );
// };

// export default SessionDetailsForm;


import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Divider,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { API_URL } from "../API_URL";









const SessionDetailsForm = ({
  meetingId,
  onMeetingCreated,
}: {
  meetingId?: number;
  onMeetingCreated?: (id: number) => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    project: "",
    duration: "",
    meetingDate: "",
    attenders:"",
    participant: "",
    status: "open",
    classification: "internal",
  });

  const [editField, setEditField] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCreateMeeting = async () => {
    try {
      const res = await axios.post(`${API_URL}/meetings`, formData);
      if (onMeetingCreated) onMeetingCreated(res.data.id);
      setFormData(res.data);
      setOpenDialog(false);
    } catch (err) {
      console.error("Error creating meeting:", err);
    }
  };

  const handleAddNewMeeting = () => {
    setFormData({
      title: "",
      description: "",
      company: "",
      project: "",
      duration: "",
      meetingDate: "",
      attenders:"",
      participant: "",
      status: "open",
      classification: "internal",
    });
    setEditField(null);
    setOpenDialog(true);
  };

  const handleSaveField = async () => {
    setOpenDialog(false);
    setEditField(null);

    if (meetingId) {
      try {
        const res = await axios.put(
          `${API_URL}/meetings/${meetingId}`,
          formData
        );
        setFormData(res.data);
      } catch (err) {
        console.error("Error updating meeting:", err);
      }
    }
  };

  const EditableRow = ({
    label,
    field,
    value,
  }: {
    label: string;
    field: string;
    value: string;
  }) => (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography sx={{ flex: 1 }}>
          <strong>{label}:</strong>{" "}
          {field === "meetingDate" && value
            ? new Date(value).toLocaleDateString()
            : value || "—"}
        </Typography>
        <IconButton
          onClick={() => {
            setEditField(field);
            setOpenDialog(true);
          }}
          color="success"
        >
          <EditIcon />
        </IconButton>
      </Box>
      <Divider sx={{ my: 1 }} />
    </>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Session Details
      </Typography>

      <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleAddNewMeeting}
          sx={{ background: "#172E4E", color: "#fff" }}
        >
          Add New Meeting
        </Button>
      </Box>

      {/* ✅ ديالوغ للتعديل أو إضافة */}
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            backgroundColor: "#F0FFF8",
            border: "1px solid #3A7659",
            padding: "16px",
          },
        }}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        //fullWidth
      >
        <DialogTitle
          sx={{
            fontSize: "30px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {editField ? `Edit ${editField}` : "Session Details"}
        </DialogTitle>
        {/* <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          {editField ? (
            <TextField
              label={editField}
              fullWidth
              value={(formData as any)[editField]}
              onChange={(e) =>
                setFormData({ ...formData, [editField]: e.target.value })
              }
              type={editField === "meetingDate" ? "date" : "text"}
              InputLabelProps={
                editField === "meetingDate" ? { shrink: true } : {}
              }
            />
          ) : (
            Object.keys(formData).map((key) => (
              <TextField
                sx={{
                  backgroundColor: "white", // الخلفية بيضاء
                  borderRadius: "6px", // زوايا ناعمة
                }}
                key={key}
                label={key}
                fullWidth
                value={(formData as any)[key]}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                type={key === "meetingDate" ? "date" : "text"}
                InputLabelProps={key === "meetingDate" ? { shrink: true } : {}}
              />
            ))
          )}
        </DialogContent> */}

        {/* <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          {editField ? (
            <TextField
              label={editField}
              fullWidth
              value={(formData as any)[editField]}
              onChange={(e) =>
                setFormData({ ...formData, [editField]: e.target.value })
              }
              type={editField === "meetingDate" ? "date" : "text"}
              InputLabelProps={
                editField === "meetingDate" ? { shrink: true } : {}
              }
            />
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {Object.keys(formData).map((key, index) => (
                <TextField
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "6px",
                    flex: "1 1 45%", // كل حقل ياخذ تقريباً نص العرض
                  }}
                  key={key}
                  label={key}
                  fullWidth
                  value={(formData as any)[key]}
                  onChange={(e) =>
                    setFormData({ ...formData, [key]: e.target.value })
                  }
                  type={key === "meetingDate" ? "date" : "text"}
                  InputLabelProps={
                    key === "meetingDate" ? { shrink: true } : {}
                  }
                />
              ))}
            </Box>
          )}
        </DialogContent> */}

        <DialogContent sx={{ mt: 1 }}>
          {editField ? (
            <TextField
              label={editField}
              fullWidth
              value={(formData as any)[editField]}
              onChange={(e) =>
                setFormData({ ...formData, [editField]: e.target.value })
              }
              type={editField === "meetingDate" ? "date" : "text"}
              InputLabelProps={
                editField === "meetingDate" ? { shrink: true } : {}
              }
            />
          ) : (
            <Grid container spacing={2}>
              {Object.keys(formData).map((key, index) => (
                <Grid
                  item
                  xs={12}
                  sm={index < 2 ? 12 : 6} // أول حقلين ياخدوا كامل العرض، الباقي نص العرض
                  key={key}
                >
                  <TextField
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "6px",
                    }}
                    label={key}
                    fullWidth
                    value={(formData as any)[key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [key]: e.target.value })
                    }
                    type={key === "meetingDate" ? "date" : "text"}
                    InputLabelProps={
                      key === "meetingDate" ? { shrink: true } : {}
                    }
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center", // يخلي الزر في المنتصف
          }}
        >
          <Button
            variant="contained"
            sx={{
              background: "#172E4E",
              color: "#ffffff",
              px: 5,
              borderRadius: 3,
            }}
            onClick={editField ? handleSaveField : handleCreateMeeting}
          >
            {editField ? "Save Field" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>

      <Paper sx={{ p: 2, background: "#F0FFF8" }}>
        <EditableRow label="Title" field="title" value={formData.title} />
        <EditableRow
          label="Description"
          field="description"
          value={formData.description}
        />
        <EditableRow label="Company" field="company" value={formData.company} />
        <EditableRow label="Project" field="project" value={formData.project} />
        <EditableRow
          label="Duration"
          field="duration"
          value={formData.duration}
        />
        <EditableRow
          label="Date"
          field="meetingDate"
          value={formData.meetingDate}
        />
        <EditableRow
          label="Attenders"
          field="attenders"
          value={formData.attenders}
        />
        <EditableRow
          label="Participant"
          field="pttenders"
          value={formData.participant}
        />
        <EditableRow label="Status" field="status" value={formData.status} />
        <EditableRow
          label="Classification"
          field="classification"
          value={formData.classification}
        />
      </Paper>
    </Box>
  );
};

export default SessionDetailsForm;

