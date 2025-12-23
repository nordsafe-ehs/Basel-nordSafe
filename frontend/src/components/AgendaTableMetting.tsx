// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Button,
//   TextField,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";
// import { API_URL } from "../API_URL";

// const AgendaTable = ({ meetingId }: { meetingId: number }) => {
//   const [rows, setRows] = useState<any[]>([]);
//   const [newItem, setNewItem] = useState({
//     title: "",
//     description: "",
//     responsible: "",
//     date: "",
//   });
//   const [openDialog, setOpenDialog] = useState(false); 

//   useEffect(() => {
//     const fetchAgenda = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/agenda/meeting/${meetingId}`);
//         const formatted = res.data.map((item: any, index: number) => ({
//           id: item.id ?? index,
//           task: item.title,
//           action: item.description,
//           date: item.date,
//           member: item.responsible,
//         }));
//         setRows(formatted);
//       } catch (err) {
//         console.error("Error fetching agenda:", err);
//       }
//     };
//     if (meetingId) fetchAgenda();
//   }, [meetingId]);

//   const handleAddAgenda = async () => {
//     if (!newItem.title) return alert("Title is required");
//     const payload = {
//       itemNumber: rows.length + 1, 
//       title: newItem.title,
//       description: newItem.description,
//       responsible: newItem.responsible,
//       date: newItem.date,
//       meetingId,
//     };
//     try {
//       const res = await axios.post(`${API_URL}/agenda`, payload);
      
//       const added = {
//         id: res.data.id,
//         task: res.data.title,
//         action: res.data.description,
//         date: res.data.date,
//         member: res.data.responsible,
//       };
//       setRows([...rows, added]);
//       setNewItem({ title: "", description: "", responsible: "", date: "" });
//       setOpenDialog(false); 
//     } catch (err) {
//       console.error("Error adding agenda item:", err);
//     }
//   };

//   const processRowUpdate = async (
//     newRow: GridRowModel,
//     oldRow: GridRowModel
//   ) => {
//     try {
//       await axios.put(`${API_URL}/agenda/${newRow.id}`, {
//         title: newRow.task,
//         description: newRow.action,
//         date: newRow.date,
//         responsible: newRow.member,
//         meetingId,
//       });
//       setRows((prev) =>
//         prev.map((row) => (row.id === newRow.id ? { ...newRow } : row))
//       );
//       return newRow;
//     } catch (err) {
//       console.error("Error updating agenda item:", err);
//       return oldRow;
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`${API_URL}/agenda/${id}`);
//       setRows(rows.filter((row) => row.id !== id));
//     } catch (err) {
//       console.error("Error deleting agenda item:", err);
//     }
//   };

//   const columns: GridColDef[] = [
//     { field: "task", headerName: "Task", flex: 1, editable: true },
//     { field: "action", headerName: "Action", flex: 1, editable: true },
//     { field: "date", headerName: "Date", flex: 1, editable: true },
//     { field: "member", headerName: "Member", flex: 1, editable: true },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 0.5,
//       renderCell: (params) => (
//         <IconButton onClick={() => handleDelete(params.row.id)}>
//           <DeleteIcon color="error" />
//         </IconButton>
//       ),
//     },
//   ];

//   return (
//     <Paper sx={{ p: 2 }}>
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Agenda Table
//       </Typography>

//       <Button
//         variant="contained"
//         sx={{ mb: 2 }}
//         onClick={() => setOpenDialog(true)}
//       >
//         Add New Item
//       </Button>

//       <Dialog
//         open={openDialog}
//         onClose={() => setOpenDialog(false)}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>Add Agenda Item</DialogTitle>
//         <DialogContent
//           sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
//         >
//           <TextField
//             label="Title"
//             value={newItem.title}
//             onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
//             fullWidth
//           />
//           <TextField
//             label="Description"
//             value={newItem.description}
//             onChange={(e) =>
//               setNewItem({ ...newItem, description: e.target.value })
//             }
//             fullWidth
//           />
//           <TextField
//             label="Responsible"
//             value={newItem.responsible}
//             onChange={(e) =>
//               setNewItem({ ...newItem, responsible: e.target.value })
//             }
//             fullWidth
//           />
//           <TextField
//             label="Date"
//             type="date"
//             InputLabelProps={{ shrink: true }}
//             value={newItem.date}
//             onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddAgenda}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Box sx={{ height: 400 }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           pageSizeOptions={[5, 10]}
//           initialState={{
//             pagination: { paginationModel: { pageSize: 5 } },
//           }}
//           processRowUpdate={processRowUpdate}
//           experimentalFeatures={{ newEditingApi: true }}
//         />
//       </Box>
//     </Paper>
//   );
// };

// export default AgendaTable;
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { API_URL } from "../API_URL";

const AgendaTable = ({ meetingId }: { meetingId: number }) => {
  const [rows, setRows] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newItem, setNewItem] = useState({
    action: "",
    date: "",
    responsible: "",
  });

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const res = await axios.get(`${API_URL}/agenda/meeting/${meetingId}`);
        const formatted = res.data.map((item: any, index: number) => ({
          id: item.id ?? index,
          task: "Our meetings planned for today",
          action: item.description,
          date: item.date,
          responsible: item.responsible,
        }));
        setRows(formatted);
      } catch (err) {
        console.error("Error fetching agenda:", err);
      }
    };
    if (meetingId) fetchAgenda();
  }, [meetingId]);

  const handleAddAgenda = async () => {
    if (!newItem.action || !newItem.date || !newItem.responsible) return;

    const payload = {
      itemNumber: rows.length + 1,
      title: "Our meetings planned for today",
      description: newItem.action,
      date: newItem.date,
      responsible: newItem.responsible,
      meetingId,
    };

    try {
      const res = await axios.post(`${API_URL}/agenda`, payload);
      const added = {
        id: res.data.id,
        task: "Our meetings planned for today",
        action: res.data.description,
        date: res.data.date,
        responsible: res.data.responsible,
      };
      setRows([...rows, added]);
      setNewItem({ action: "", date: "", responsible: "" });
      setOpenDialog(false);
    } catch (err) {
      console.error("Error adding agenda item:", err);
    }
  };

  const processRowUpdate = async (
    newRow: GridRowModel,
    oldRow: GridRowModel
  ) => {
    try {
      await axios.put(`${API_URL}/agenda/${newRow.id}`, {
        title: "Our meetings planned for today",
        description: newRow.action,
        date: newRow.date,
        responsible: newRow.responsible,
        meetingId,
      });
      setRows((prev) =>
        prev.map((row) => (row.id === newRow.id ? { ...newRow } : row))
      );
      return newRow;
    } catch (err) {
      console.error("Error updating agenda item:", err);
      return oldRow;
    }
  };

  const columns: GridColDef[] = [
    { field: "task", headerName: "Task", flex: 1 },
    { field: "action", headerName: "Action", flex: 1, editable: true },
    { field: "date", headerName: "Date", flex: 1, editable: true },
    {
      field: "responsible",
      headerName: "Responsible",
      flex: 1,
      editable: true,
    },
  ];

  return (
    <Box sx={{ background: "#F0FFF8", p: 2, borderRadius: "8px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Agenda</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ backgroundColor: "#172E4E", color: "#fff" }}
          onClick={() => setOpenDialog(true)}
        >
          Add new action
        </Button>
      </Box>

      <Paper sx={{ height: 400, background: "#fff", borderRadius: "8px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          processRowUpdate={processRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>Add Action</DialogTitle>
        <DialogContent
          sx={{
            background: "#F0FFF8",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Action"
            value={newItem.action}
            onChange={(e) => setNewItem({ ...newItem, action: e.target.value })}
            fullWidth
            sx={{ background: "white", borderRadius: "6px" }}
          />
          <TextField
            label="Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newItem.date}
            onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
            fullWidth
            sx={{ background: "white", borderRadius: "6px" }}
          />
          <TextField
            label="Responsible"
            value={newItem.responsible}
            onChange={(e) =>
              setNewItem({ ...newItem, responsible: e.target.value })
            }
            fullWidth
            sx={{ background: "white", borderRadius: "6px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="outlined" sx={{background:""}} onClick={handleAddAgenda}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgendaTable;
