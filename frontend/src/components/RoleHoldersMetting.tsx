// import { useState, useEffect } from "react";
// import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import axios from "axios";
// import { API_URL } from "../API_URL";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
//   Button,
//   Box,
//   Checkbox,
// } from "@mui/material";

// const AttendanceTable = ({ meetingId }) => {
//   const [rows, setRows] = useState<any[]>([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedRow, setSelectedRow] = useState<any>(null);
//   const [openAddDialog, setOpenAddDialog] = useState(false);
//   const [newParticipant, setNewParticipant] = useState({
//     name: "",
//     role: "",
//     status: "present",
//     responsibleCode: "",
//     meetingId,
//   });

//   // ✅ جلب بيانات الحضور
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `${API_URL}/attendance/meetings/${meetingId}`
//         );
//         setRows(res.data);
//       } catch (err) {
//         console.error("Error fetching attendance:", err);
//       }
//     };
//     fetchData();
//   }, [meetingId]);

//   // ✅ فتح نافذة التعديل
//   const handleEditRow = (row: any) => {
//     setSelectedRow(row);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedRow(null);
//   };

//   // ✅ حفظ التعديلات عبر API
//   const handleSave = async () => {
//     try {
//       const res = await axios.put(
//         `${API_URL}/attendance/${selectedRow.id}`,
//         selectedRow
//       );
//       const updatedRow = res.data;
//       setRows((prev) =>
//         prev.map((row) => (row.id === updatedRow.id ? updatedRow : row))
//       );
//       handleCloseDialog();
//     } catch (err) {
//       console.error("Error updating row:", err);
//     }
//   };

//   // ✅ إضافة مشارك جديد
//   const handleAddParticipant = async () => {
//     try {
//       // تحقق بسيط قبل الإرسال
//       if (!newParticipant.name?.trim()) {
//         console.error("Name is required");
//         return;
//       }
//       if (!meetingId) {
//         console.error("meetingId is required");
//         return;
//       }

//       const payload = {
//         meetingId,
//         name: newParticipant.name.trim(),
//         role: newParticipant.role?.trim() || null,
//         status: newParticipant.status || "present", // لازم تكون واحدة من present/absent/excused
//         responsibleCode: newParticipant.responsibleCode?.trim() || null,
//         admin: false,
//         readOnly: false,
//         mustSign: false,
//         closed: false,
//       };

//       const res = await axios.post(`${API_URL}/attendance`, payload);
//       const created = res.data;

//       // حدث الجدول مباشرةً
//       setRows((prev) => [...prev, created]);

//       // صفّي الفورم
//       setOpenAddDialog(false);
//       setNewParticipant({
//         name: "",
//         role: "",
//         status: "present",
//         meetingId,
//         responsibleCode: "",
//       });
//     } catch (err: any) {
//       // اطبع الرد للتشخيص
//       console.error(
//         "Error adding participant:",
//         err?.response?.data || err.message
//       );
//     }
//   };


//  const columns: GridColDef[] = [
//    { field: "name", headerName: "Participant", flex: 1 },
//    { field: "role", headerName: "Role", flex: 1 },
//    { field: "status", headerName: "Status", flex: 1 },
//    { field: "responsibleCode", headerName: "Responsible Code", flex: 1 },

//    {
//      field: "admin",
//      headerName: "Admin",
//      width: 120,
//      renderCell: (params) => (
//        <Checkbox
//          checked={params.row.admin}
//          onChange={(e) => {
//            const updatedRow = { ...params.row, admin: e.target.checked };
//            axios
//              .put(`${API_URL}/attendance/${params.row.id}`, updatedRow)
//              .then((res) => {
//                setRows((prev) =>
//                  prev.map((row) => (row.id === res.data.id ? res.data : row))
//                );
//              });
//          }}
//        />
//      ),
//    },

//    {
//      field: "readOnly",
//      headerName: "Read-only",
//      width: 120,
//      renderCell: (params) => (
//        <Checkbox
//          checked={params.row.readOnly}
//          onChange={(e) => {
//            const updatedRow = { ...params.row, readOnly: e.target.checked };
//            axios
//              .put(`${API_URL}/attendance/${params.row.id}`, updatedRow)
//              .then((res) => {
//                setRows((prev) =>
//                  prev.map((row) => (row.id === res.data.id ? res.data : row))
//                );
//              });
//          }}
//        />
//      ),
//    },

//    {
//      field: "mustSign",
//      headerName: "Must Sign",
//      width: 120,
//      renderCell: (params) => (
//        <Checkbox
//          checked={params.row.mustSign}
//          onChange={(e) => {
//            const updatedRow = { ...params.row, mustSign: e.target.checked };
//            axios
//              .put(`${API_URL}/attendance/${params.row.id}`, updatedRow)
//              .then((res) => {
//                setRows((prev) =>
//                  prev.map((row) => (row.id === res.data.id ? res.data : row))
//                );
//              });
//          }}
//        />
//      ),
//    },

//    {
//      field: "closed",
//      headerName: "Closed",
//      width: 120,
//      renderCell: (params) => (
//        <Checkbox
//          checked={params.row.closed}
//          onChange={(e) => {
//            const updatedRow = { ...params.row, closed: e.target.checked };
//            axios
//              .put(`${API_URL}/attendance/${params.row.id}`, updatedRow)
//              .then((res) => {
//                setRows((prev) =>
//                  prev.map((row) => (row.id === res.data.id ? res.data : row))
//                );
//              });
//          }}
//        />
//      ),
//    },

//    {
//      field: "actions",
//      headerName: "Actions",
//      width: 120,
//      type: "actions",
//      getActions: (params) => [
//        <GridActionsCellItem
//          icon={<EditIcon sx={{ color: "green" }} />}
//          label="Edit"
//          onClick={() => handleEditRow(params.row)}
//        />,
//      ],
//    },
//  ];

//   return (
//     <>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <h3>Attendance</h3>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           sx={{ backgroundColor: "green" }}
//           onClick={() => setOpenAddDialog(true)}
//         >
//           Add Participant
//         </Button>
//       </Box>

//       <div style={{ height: 400, width: "100%" }}>
//         <DataGrid rows={rows} columns={columns} getRowId={(row) => row.id} />
//       </div>

//       {/* Dialog للتعديل */}
//       <Dialog open={openDialog} onClose={handleCloseDialog}>
//         <DialogTitle>Edit Participant</DialogTitle>
//         <DialogContent>
//           {selectedRow && (
//             <>
//               <TextField
//                 margin="dense"
//                 label="Name"
//                 fullWidth
//                 value={selectedRow.name}
//                 onChange={(e) =>
//                   setSelectedRow({ ...selectedRow, name: e.target.value })
//                 }
//               />
//               <TextField
//                 margin="dense"
//                 label="Role"
//                 fullWidth
//                 value={selectedRow.role || ""}
//                 onChange={(e) =>
//                   setSelectedRow({ ...selectedRow, role: e.target.value })
//                 }
//               />
//               <TextField
//                 margin="dense"
//                 label="Responsible Code"
//                 fullWidth
//                 value={selectedRow.responsibleCode || ""}
//                 onChange={(e) =>
//                   setSelectedRow({
//                     ...selectedRow,
//                     responsibleCode: e.target.value,
//                   })
//                 }
//               />
//             </>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={handleSave} variant="contained" color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Dialog لإضافة مشارك جديد */}
//       <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
//         <DialogTitle>Add Participant</DialogTitle>
//         <DialogContent>
//           <TextField
//             margin="dense"
//             label="Name"
//             fullWidth
//             value={newParticipant.name}
//             onChange={(e) =>
//               setNewParticipant({ ...newParticipant, name: e.target.value })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Role"
//             fullWidth
//             value={newParticipant.role}
//             onChange={(e) =>
//               setNewParticipant({ ...newParticipant, role: e.target.value })
//             }
//           />
//           <TextField
//             margin="dense"
//             label="Responsible Code"
//             fullWidth
//             value={newParticipant.responsibleCode || ""}
//             onChange={(e) =>
//               setNewParticipant({
//                 ...newParticipant,
//                 responsibleCode: e.target.value,
//               })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
//           <Button
//             onClick={handleAddParticipant}
//             variant="contained"
//             color="primary"
//           >
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default AttendanceTable;
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../API_URL";

const AttendanceTable = ({ meetingId }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newParticipant, setNewParticipant] = useState({
    name: "",
    meetingId,
    admin: false,
    readOnly: true,
    present: true,
    mustSign: false,
    description: "Our meetings planned for today",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/attendance/meetings/${meetingId}`
        );
        setRows(res.data);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };
    fetchData();
  }, [meetingId]);

  const handleCheckboxChange = async (id, field, value) => {
    const updatedRow = rows.find((r) => r.id === id);
    if (!updatedRow) return;

    const updated = { ...updatedRow, [field]: value };
    try {
      const res = await axios.put(`${API_URL}/attendance/${id}`, updated);
      setRows((prev) => prev.map((r) => (r.id === id ? res.data : r)));
    } catch (err) {
      console.error("Error updating checkbox:", err);
    }
  };

  const handleAddParticipant = async () => {
    if (!newParticipant.name.trim()) return;

    try {
      const res = await axios.post(`${API_URL}/attendance`, {
        ...newParticipant,
        meetingId,
      });
      setRows((prev) => [...prev, res.data]);
      setOpenAddDialog(false);
      setNewParticipant({
        name: "",
        meetingId,
        admin: false,
        readOnly: true,
        present: true,
        mustSign: false,
        description: "Our meetings planned for today",
      });
    } catch (err) {
      console.error("Error adding participant:", err);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Participant",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ background: "#F0FFF8" }}>
          <Typography fontWeight="bold">{params.row.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {params.row.description}
          </Typography>
        </Box>
      ),
    },
    {
      field: "admin",
      headerName: "Administrator",
      width: 150,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.admin}
          onChange={(e) =>
            handleCheckboxChange(params.row.id, "admin", e.target.checked)
          }
        />
      ),
    },
    {
      field: "readOnly",
      headerName: "Read Only Access",
      width: 150,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.readOnly}
          onChange={(e) =>
            handleCheckboxChange(params.row.id, "readOnly", e.target.checked)
          }
        />
      ),
    },
    {
      field: "present",
      headerName: "Present",
      width: 120,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.present}
          onChange={(e) =>
            handleCheckboxChange(params.row.id, "present", e.target.checked)
          }
        />
      ),
    },
    {
      field: "mustSign",
      headerName: "Required to Sign",
      width: 150,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.mustSign}
          onChange={(e) =>
            handleCheckboxChange(params.row.id, "mustSign", e.target.checked)
          }
        />
      ),
    },
  ];

  return (
    <Box sx={{ p: 2, borderRadius: "8px" }}>
      <Box sx={{ display: "flex", justifyContent: "end", mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: "#172E4E", color: "#fff" }}
          onClick={() => setOpenAddDialog(true)}
        >
          Add Participant
        </Button>
      </Box>

      <Box sx={{ height: 400, borderRadius: "8px" }}>
        <DataGrid
          
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
        />
      </Box>

      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        fullWidth
      >
        <DialogTitle>Add Participant</DialogTitle>
        <DialogContent sx={{ background: "#F0FFF8" }}>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={newParticipant.name}
            onChange={(e) =>
              setNewParticipant({ ...newParticipant, name: e.target.value })
            }
            sx={{ background: "white", borderRadius: "6px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button
            onClick={handleAddParticipant}
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AttendanceTable;
