// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { API_URL } from "../API_URL";
// import axios from "axios";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";

// const Participants = () => {
//   const [participants, setParticipants] = useState<any[]>([]);
//   const [openAdd, setOpenAdd] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);

//   const [newParticipant, setNewParticipant] = useState({
//     name: "",
//     position: "",
//   });

//   const [editParticipant, setEditParticipant] = useState<any>(null);

//   // 🟢 إضافة مشارك جديد
//   const handleAdd = async () => {
//     try {
//       const res = await axios.post(`${API_URL}/participants`, newParticipant);
//       setParticipants([...participants, res.data]);
//       setNewParticipant({ name: "", position: "" });
//       setOpenAdd(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🟢 حذف مشارك
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`${API_URL}/participants/${id}`);
//       setParticipants(participants.filter((p) => p.id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🟢 فتح نافذة التعديل
//   const handleOpenEdit = (participant: any) => {
//     setEditParticipant(participant);
//     setOpenEdit(true);
//   };

//   // 🟢 حفظ التعديلات
//   const handleUpdate = async () => {
//     try {
//       await axios.put(
//         `${API_URL}/participants/${editParticipant.id}`,
//         editParticipant
//       );
//       setParticipants(
//         participants.map((p) =>
//           p.id === editParticipant.id ? editParticipant : p
//         )
//       );
//       setOpenEdit(false);
//       setEditParticipant(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     axios
//       .get(`${API_URL}/participants/basic`)
//       .then((res) => setParticipants(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h5" fontWeight="bold" mb={3}>
//         Participants
//       </Typography>

//       <Box textAlign={"right"}>
//         <Button
//           variant="contained"
//           sx={{ background: "#172E4E", color: "#fff", mb: 2 }}
//           onClick={() => setOpenAdd(true)}
//         >
//           Add New
//         </Button>
//       </Box>

//       <TableContainer component={Paper} sx={{ background: "#F0FFF8" }}>
//         <Table>
         
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <strong>Name</strong>
//               </TableCell>
//               <TableCell>
//                 <strong>Position</strong>
//               </TableCell>
//               <TableCell align="right">
//                 <strong>Actions</strong>
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {participants.map((p) => (
//               <TableRow key={p.id}>
//                 <TableCell>{p.name}</TableCell>
//                 <TableCell>{p.position}</TableCell>
//                 <TableCell align="right">
//                   <IconButton color="primary" onClick={() => handleOpenEdit(p)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton color="error" onClick={() => handleDelete(p.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>

//           <TableBody>
//             {participants.map((p) => (
//               <TableRow key={p.id}>
//                 <TableCell>{p.name}</TableCell>
//                 <TableCell>{p.position}</TableCell>
//                 {/* <TableCell>
//                   {p.signatureUrl ? (
//                     <img
//                       src={p.signatureUrl}
//                       alt="signature"
//                       style={{ width: 100, height: 50 }}
//                     />
//                   ) : (
//                     "No signature"
//                   )}
//                 </TableCell> */}
//                 <TableCell align="right">
//                   <IconButton color="primary" onClick={() => handleOpenEdit(p)}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton color="error" onClick={() => handleDelete(p.id)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Dialog لإضافة مشارك جديد */}
//       <Dialog
//         open={openAdd}
//         onClose={() => setOpenAdd(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogContent
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             background: "#F0FFF8",
//           }}
//         >
//           <DialogTitle>New Participant</DialogTitle>
//           <TextField
//             label="Name"
//             value={newParticipant.name}
//             onChange={(e) =>
//               setNewParticipant({ ...newParticipant, name: e.target.value })
//             }
//             fullWidth
//           />
//           <TextField
//             label="Position"
//             value={newParticipant.position}
//             onChange={(e) =>
//               setNewParticipant({ ...newParticipant, position: e.target.value })
//             }
//             fullWidth
//           />
//           <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
//             <Button
//               variant="contained"
//               sx={{
//                 background: "#172E4E",
//                 color: "#fff",
//                 px: 5,
//                 borderRadius: 2,
//               }}
//               onClick={handleAdd}
//             >
//               Add
//             </Button>
//           </DialogActions>
//         </DialogContent>
//       </Dialog>

//       {/* Dialog لتعديل مشارك */}
//       <Dialog
//         open={openEdit}
//         onClose={() => setOpenEdit(false)}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>Edit Participant</DialogTitle>
//         <DialogContent
//           sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//         >
//           <TextField
//             label="Name"
//             value={editParticipant?.name || ""}
//             onChange={(e) =>
//               setEditParticipant({ ...editParticipant, name: e.target.value })
//             }
//             fullWidth
//           />
//           <TextField
//             label="Position"
//             value={editParticipant?.position || ""}
//             onChange={(e) =>
//               setEditParticipant({
//                 ...editParticipant,
//                 position: e.target.value,
//               })
//             }
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             sx={{ background: "#172E4E", color: "#fff" }}
//             onClick={handleUpdate}
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Participants;



import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { API_URL } from "../API_URL";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Participants = ({documentId}) => {
  const [participants, setParticipants] = useState<any[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [newParticipant, setNewParticipant] = useState({
    name: "",
    position: "",
  });

  const [editParticipant, setEditParticipant] = useState<any>(null);

  // 🟢 إضافة مشارك جديد
  const handleAdd = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/participants`,
        newParticipant,
        documentId
      );
      setParticipants([...participants, res.data]);
      setNewParticipant({ name: "", position: "" });
      setOpenAdd(false);
    } catch (err) {
      console.error(err);
    }
  };

  // 🟢 حذف مشارك
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/participants/${id}`);
      setParticipants(participants.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // 🟢 فتح نافذة التعديل
  const handleOpenEdit = (participant: any) => {
    setEditParticipant(participant);
    setOpenEdit(true);
  };

  // 🟢 حفظ التعديلات
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${API_URL}/participants/${editParticipant.id}`,
        editParticipant
      );
      setParticipants(
        participants.map((p) =>
          p.id === editParticipant.id ? editParticipant : p
        )
      );
      setOpenEdit(false);
      setEditParticipant(null);
    } catch (err) {
      console.error(err);
    }
  };

 useEffect(() => {
   if (documentId) {
     axios
       .get(`${API_URL}/participants/byDoc/${documentId}`)
       .then((res) => setParticipants(res.data))
       .catch((err) => console.error(err));
   }
 }, [documentId]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Participants
      </Typography>

      <Box textAlign={"right"}>
        <Button
          variant="contained"
          sx={{ background: "#172E4E", color: "#fff", mb: 2 }}
          onClick={() => setOpenAdd(true)}
        >
          Add New
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ background: "#F0FFF8" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Position</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {participants.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.position}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleOpenEdit(p)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(p.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog لإضافة مشارك جديد */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            background: "#F0FFF8",
          }}
        >
          <DialogTitle>New Participant</DialogTitle>
          <TextField
            label="Name"
            value={newParticipant.name}
            onChange={(e) =>
              setNewParticipant({ ...newParticipant, name: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Position"
            value={newParticipant.position}
            onChange={(e) =>
              setNewParticipant({ ...newParticipant, position: e.target.value })
            }
            fullWidth
          />
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                background: "#172E4E",
                color: "#fff",
                px: 5,
                borderRadius: 2,
              }}
              onClick={handleAdd}
            >
              Add
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* Dialog لتعديل مشارك */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Participant</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Name"
            value={editParticipant?.name || ""}
            onChange={(e) =>
              setEditParticipant({ ...editParticipant, name: e.target.value })
            }
            fullWidth
          />
          <TextField
            label="Position"
            value={editParticipant?.position || ""}
            onChange={(e) =>
              setEditParticipant({
                ...editParticipant,
                position: e.target.value,
              })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ background: "#172E4E", color: "#fff" }}
            onClick={handleUpdate}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Participants;
