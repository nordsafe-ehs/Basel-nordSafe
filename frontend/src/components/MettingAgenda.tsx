

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   IconButton,
//   Button,
//   TextField,
//   Grid,
//   Collapse,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import AddIcon from "@mui/icons-material/Add";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import axios from "axios";
// import { API_URL } from "../API_URL";
// import AgendaTable from "./AgendaTableMetting";

// const AgendaCard = ({ item, onSelect, onDelete, onEdit }: any) => {
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <Paper
//       sx={{
//         p: 2,
//         mb: 2,
//         backgroundColor: "#f0fdf4",
//         cursor: "pointer",
//       }}
//       onClick={() => onSelect(item)}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         {/* رقم البند + سهم + العنوان */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Typography variant="h6" sx={{ mr: 1 }}>
//             {item.itemNumber}
//           </Typography>
//           <ArrowForwardIosIcon sx={{ mx: 1, color: "green", fontSize: 18 }} />
//           <Typography variant="h6">{item.title}</Typography>
//         </Box>

//         {/* أيقونات التحكم */}
//         <Box>
//           <IconButton
//             onClick={(e) => {
//               e.stopPropagation();
//               onEdit(item); // يفتح فورم تعديل في العمود الأيمن
//             }}
//             sx={{ color: "blue" }}
//           >
//             <EditIcon />
//           </IconButton>

//           <IconButton
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete(item.id);
//             }}
//             sx={{ color: "red" }}
//           >
//             <DeleteIcon />
//           </IconButton>

//           <IconButton
//             onClick={(e) => {
//               e.stopPropagation();
//               setExpanded(!expanded); // يفتح الوصف داخل البطاقة
//             }}
//             sx={{ color: "green" }}
//           >
//             <ExpandMoreIcon />
//           </IconButton>
//         </Box>
//       </Box>

//       {/* المسؤول */}
//       <Typography variant="subtitle2" sx={{ mt: 1 }}>
//         Responsible: {item.responsible || "—"}
//       </Typography>

//       {/* الوصف عند التوسيع */}
//       <Collapse in={expanded}>
//         <Typography variant="body2" sx={{ mt: 1 }}>
//           {item.description || "No description"}
//         </Typography>
//       </Collapse>
//     </Paper>
//   );
// };

// const MettingAgenda = ({ meetingId }: { meetingId: number }) => {
//   const [agendaItems, setAgendaItems] = useState<any[]>([]);
//   const [selectedItem, setSelectedItem] = useState<any | null>(null);

//   // ✅ جلب البنود
//   useEffect(() => {
//     const fetchAgenda = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/agenda/meeting/${meetingId}`);
//         console.log("Agenda items:", res.data);

//         setAgendaItems(res.data);
//       } catch (err) {
//         console.error("Error fetching agenda:", err);
//       }
//     };
//     fetchAgenda();
//   }, [meetingId]);

//   // ✅ إضافة بند جديد
//   // داخل handleAddAgenda
//   const handleAddAgenda = async () => {
//     if (!meetingId) {
//       alert("Meeting ID is missing");
//       return;
//     }
//     if (!selectedItem?.title) {
//       alert("Title is required");
//       return;
//     }
//     try {
//       const payload = {
//         itemNumber: agendaItems.length + 1,
//         title: selectedItem.title,
//         responsible: selectedItem.responsible,
//         description: selectedItem.description,
//         meetingId, // ✅ يربط البند بالاجتماع الصحيح
//       };
//       const res = await axios.post(`${API_URL}/agenda`, payload);
//       setAgendaItems((prev) => [...prev, res.data]);
//       setSelectedItem(null);
//     } catch (err: any) {
//       console.error("Error adding agenda:", err.response?.data || err.message);
//     }
//   };

//   // ✅ تعديل بند
//   const handleUpdateAgenda = async () => {
//     if (!selectedItem) return;
//     try {
//       await axios.put(`${API_URL}/agenda/${selectedItem.id}`, selectedItem);
//       setAgendaItems((prev) =>
//         prev.map((item) => (item.id === selectedItem.id ? selectedItem : item))
//       );
//       setSelectedItem(null);
//     } catch (err) {
//       console.error("Error updating agenda:", err);
//     }
//   };

//   // ✅ حذف بند
//   const handleDeleteAgenda = async (id: number) => {
//     try {
//       await axios.delete(`${API_URL}/agenda/${id}`);
//       setAgendaItems((prev) => prev.filter((item) => item.id !== id));
//       if (selectedItem?.id === id) setSelectedItem(null);
//     } catch (err) {
//       console.error("Error deleting agenda:", err);
//     }
//   };

//   return (
//     <Grid container spacing={2}>
//       {/* ✅ أولاً: جدول المهام بكامل العرض */}
//       {/* <Grid item sx={{marginBottom:7}} xs={12}>
//         <AgendaTable meetingId={meetingId} />
//       </Grid> */}

//       {/* ✅ ثانياً: قائمة المهام + الفورم تحت الجدول */}
//       <Grid item xs={12}>
//         <Grid container spacing={2}>
//           {/* العمود الأيسر: قائمة المهام */}
//           <Grid item xs={6}>
//             <Box>
//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
//               >
//                 <Typography variant="h5">Agenda</Typography>
//                 <Button
//                   variant="contained"
//                   startIcon={<AddIcon />}
//                   onClick={() =>
//                     setSelectedItem({
//                       isNew: true,
//                       itemNumber: "",
//                       title: "",
//                       responsible: "",
//                       description: "",
//                     })
//                   }
//                 >
//                   New Task
//                 </Button>
//               </Box>

//               {agendaItems.map((item) => (
//                 <AgendaCard
//                   key={item.id}
//                   item={item}
//                   onSelect={setSelectedItem}
//                   onDelete={handleDeleteAgenda}
//                   onEdit={(task) => setSelectedItem(task)}
//                 />
//               ))}
//             </Box>
//           </Grid>

//           {/* العمود الأيمن: فورم إضافة/تعديل */}
//           <Grid item xs={6}>
//             <Paper sx={{ p: 3, minHeight: "100%" }}>
//               {selectedItem ? (
//                 selectedItem.isNew ? (
//                   <>
//                     <Typography variant="h6" sx={{ mb: 2 }}>
//                       Add New Task
//                     </Typography>
//                     <TextField
//                       label="Item Number"
//                       type="number"
//                       fullWidth
//                       sx={{ mb: 2 }}
//                       value={selectedItem.itemNumber}
//                       onChange={(e) =>
//                         setSelectedItem({
//                           ...selectedItem,
//                           itemNumber: e.target.value,
//                         })
//                       }
//                     />
//                     <TextField
//                       label="Title"
//                       fullWidth
//                       sx={{ mb: 2 }}
//                       value={selectedItem.title}
//                       onChange={(e) =>
//                         setSelectedItem({
//                           ...selectedItem,
//                           title: e.target.value,
//                         })
//                       }
//                     />
//                     <TextField
//                       label="Responsible"
//                       fullWidth
//                       sx={{ mb: 2 }}
//                       value={selectedItem.responsible}
//                       onChange={(e) =>
//                         setSelectedItem({
//                           ...selectedItem,
//                           responsible: e.target.value,
//                         })
//                       }
//                     />
//                     <TextField
//                       label="Description"
//                       multiline
//                       rows={4}
//                       fullWidth
//                       value={selectedItem.description}
//                       onChange={(e) =>
//                         setSelectedItem({
//                           ...selectedItem,
//                           description: e.target.value,
//                         })
//                       }
//                     />
//                     <Button
//                       variant="contained"
//                       sx={{ mt: 2 }}
//                       onClick={handleAddAgenda}
//                     >
//                       Save Task
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Typography variant="h6" sx={{ mb: 2 }}>
//                       Edit Task
//                     </Typography>
//                     <TextField
//                       label="Item Number"
//                       type="number"
//                       fullWidth
//                       sx={{ mb: 2 }}
//                       value={selectedItem.itemNumber}
//                       onChange={(e) =>
//                         setSelectedItem({
//                           ...selectedItem,
//                           itemNumber: e.target.value,
//                         })
//                       }
//                     />
//                     <TextField
//                       label="Title"
//                       fullWidth
//                       sx={{ mb: 2 }}
//                       value={selectedItem.title}
//                       onChange={(e) =>
//                         setSelectedItem({
//                           ...selectedItem,
//                           title: e.target.value,
//                         })
//                       }
//                     />
//                     <TextField
//                       label="Responsible"
//                       fullWidth
//                       sx={{ mb: 2 }}
//                       value={selectedItem.responsible}
//                       onChange={(e) =>
//                         setSelectedItem({
//                           ...selectedItem,
//                           responsible: e.target.value,
//                         })
//                       }
//                     />
//                     <TextField
//                       label="Description"
//                       multiline
//                       rows={4}
//                       fullWidth
//                       value={selectedItem.description}
//                       onChange={(e) =>
//                         setSelectedItem({
//                           ...selectedItem,
//                           description: e.target.value,
//                         })
//                       }
//                     />
//                     <Button
//                       variant="contained"
//                       sx={{ mt: 2 }}
//                       onClick={handleUpdateAgenda}
//                     >
//                       Save Changes
//                     </Button>
//                   </>
//                 )
//               ) : (
//                 <Typography variant="body1">
//                   Select a task to view or edit...
//                 </Typography>
//               )}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default MettingAgenda;


// import { useState, useEffect } from "react";
// import { Box, Typography, Button, TextField, Paper } from "@mui/material";
// import axios from "axios";
// import { API_URL } from "../API_URL";

// const MettingAgenda = ({ meetingId }: { meetingId: number }) => {
//   const [agendaItems, setAgendaItems] = useState<any[]>([]);
//   const [newItem, setNewItem] = useState({
//     title: "",
//     description: "",
//     responsible: "",
//   });

//   // ✅ جلب الأجندة المرتبطة بالاجتماع
//   useEffect(() => {
//     const fetchAgenda = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/agenda/meeting/${meetingId}`);
//         setAgendaItems(res.data);
//       } catch (err) {
//         console.error("Error fetching agenda:", err);
//       }
//     };
//     if (meetingId) fetchAgenda();
//   }, [meetingId]);

//   // ✅ إضافة بند جديد
//   const handleAddAgenda = async () => {
//     if (!meetingId) {
//       alert("Meeting ID is missing");
//       return;
//     }
//     if (!newItem.title) {
//       alert("Title is required");
//       return;
//     }

//     const payload = {
//       itemNumber: agendaItems.length + 1,
//       title: newItem.title,
//       description: newItem.description,
//       responsible: newItem.responsible,
//       meetingId, // ✅ يرسل الـ id الصحيح
//     };

//     try {
//       const res = await axios.post(`${API_URL}/agenda`, payload);
//       setAgendaItems([...agendaItems, res.data]);
//       setNewItem({ title: "", description: "", responsible: "" });
//     } catch (err) {
//       console.error("Error adding agenda item:", err);
//     }
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h5" gutterBottom>
//         Meeting Agenda
//       </Typography>

//       <Paper sx={{ p: 2, mb: 2 }}>
//         <TextField
//           label="Title"
//           value={newItem.title}
//           onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Description"
//           value={newItem.description}
//           onChange={(e) =>
//             setNewItem({ ...newItem, description: e.target.value })
//           }
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           label="Responsible"
//           value={newItem.responsible}
//           onChange={(e) =>
//             setNewItem({ ...newItem, responsible: e.target.value })
//           }
//           fullWidth
//           sx={{ mb: 2 }}
//         />
//         <Button variant="contained" onClick={handleAddAgenda}>
//           Add Agenda Item
//         </Button>
//       </Paper>

//       {/* عرض البنود */}
//       {agendaItems.map((item) => (
//         <Paper key={item.id} sx={{ p: 2, mb: 1 }}>
//           <Typography>
//             <strong>{item.itemNumber}.</strong> {item.title}
//           </Typography>
//           <Typography>{item.description}</Typography>
//           <Typography sx={{ fontStyle: "italic" }}>
//             Responsible: {item.responsible}
//           </Typography>
//         </Paper>
//       ))}
//     </Box>
//   );
// };

// export default MettingAgenda;
// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Paper,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";
// import { API_URL } from "../API_URL";

// const MettingAgenda = ({ meetingId }: { meetingId: number }) => {
//   const [agendaItems, setAgendaItems] = useState<any[]>([]);
//   const [newItem, setNewItem] = useState({
//     title: "",
//     description: "",
//     responsible: "",
//   });
//   const [editItem, setEditItem] = useState<any>(null);
//   const [openAddDialog, setOpenAddDialog] = useState(false);

//   useEffect(() => {
//     const fetchAgenda = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/agenda/meeting/${meetingId}`);
//         setAgendaItems(res.data);
//       } catch (err) {
//         console.error("Error fetching agenda:", err);
//       }
//     };
//     if (meetingId) fetchAgenda();
//   }, [meetingId]);

//   // ✅ إضافة بند جديد
//   const handleAddAgenda = async () => {
//     if (!newItem.title) return alert("Title is required");
//     const payload = {
//       itemNumber: agendaItems.length + 1,
//       title: newItem.title,
//       responsible: newItem.responsible,
//       description: newItem.description,
//       meetingId,
//     };
//     try {
//       const res = await axios.post(`${API_URL}/agenda`, payload);
//       setAgendaItems([...agendaItems, res.data]);
//       setNewItem({ title: "", description: "", responsible: "" });
//       setOpenAddDialog(false);
//     } catch (err) {
//       console.error("Error adding agenda item:", err);
//     }
//   };

//   // ✅ تعديل بند
//   const handleSaveEdit = async () => {
//     try {
//       const res = await axios.put(`${API_URL}/agenda/${editItem.id}`, editItem);
//       setAgendaItems(
//         agendaItems.map((item) => (item.id === editItem.id ? res.data : item))
//       );
//       setEditItem(null);
//     } catch (err) {
//       console.error("Error updating agenda item:", err);
//     }
//   };

//   // ✅ حذف بند
//   const handleDelete = async (id: number) => {
//     try {
//       await axios.delete(`${API_URL}/agenda/${id}`);
//       setAgendaItems(agendaItems.filter((item) => item.id !== id));
//     } catch (err) {
//       console.error("Error deleting agenda item:", err);
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", gap: 2, p: 2 }}>
//       <Box sx={{ flex: 1 }}>
//         {/* زر فتح ديالوغ الإضافة */}
//         <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
//           <Button variant="contained" onClick={() => setOpenAddDialog(true)}>
//             Add Agenda Item
//           </Button>
//         </Box>
//         <Typography variant="h5" mb={2}>
//           Meeting Agenda
//         </Typography>

//         {/* عرض البنود */}
//         {agendaItems.map((item) => (
//           <Paper
//             key={item.id}
//             sx={{
//               p: 2,
//               mb: 1,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Box>
//               <Typography>
//                 <strong>{item.itemNumber}.</strong> {item.title}
//               </Typography>
//               <Typography>{item.description}</Typography>
//               <Typography sx={{ fontStyle: "italic" }}>
//                 Responsible: {item.responsible}
//               </Typography>
//             </Box>
//             <Box>
//               <IconButton onClick={() => setEditItem(item)}>
//                 <EditIcon color="primary" />
//               </IconButton>
//               <IconButton onClick={() => handleDelete(item.id)}>
//                 <DeleteIcon color="error" />
//               </IconButton>
//             </Box>
//           </Paper>
//         ))}
//       </Box>

//       {/* القسم الأيمن: فورم التعديل */}
//       <Box sx={{ flex: 1 }}>
//         {editItem && (
//           <Paper sx={{ p: 2 }}>
//             {/* <Typography variant="h6">Edit Agenda Item</Typography> */}
//             <TextField
//               label="Title"
//               value={editItem.title}
//               onChange={(e) =>
//                 setEditItem({ ...editItem, title: e.target.value })
//               }
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               label="Responsible"
//               value={editItem.responsible}
//               onChange={(e) =>
//                 setEditItem({ ...editItem, responsible: e.target.value })
//               }
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               label="Description"
//               value={editItem.description}
//               onChange={(e) =>
//                 setEditItem({ ...editItem, description: e.target.value })
//               }
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             <Box sx={{ display: "flex", gap: 2 }}>
//               <Button onClick={() => setEditItem(null)}>Cancel</Button>
//               <Button variant="contained" onClick={handleSaveEdit}>
//                 Save
//               </Button>
//             </Box>
//           </Paper>
//         )}
//       </Box>

//       {/* ✅ Dialog للإضافة */}
//       <Dialog
//         open={openAddDialog}
//         onClose={() => setOpenAddDialog(false)}
//         fullWidth
//       >
//         {/* <DialogTitle>Add Agenda Item</DialogTitle> */}
//         <DialogContent sx={{ background: "#F0FFF8 " }}>
//           <TextField
//             label="Title"
//             value={newItem.title}
//             onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
//             fullWidth
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Responsible"
//             value={newItem.responsible}
//             onChange={(e) =>
//               setNewItem({ ...newItem, responsible: e.target.value })
//             }
//             fullWidth
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Description"
//             value={newItem.description}
//             onChange={(e) =>
//               setNewItem({ ...newItem, description: e.target.value })
//             }
//             fullWidth
//             sx={{ mb: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddAgenda}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default MettingAgenda;

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { API_URL } from "../API_URL";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MettingAgenda = ({ meetingId }: { meetingId: number }) => {
  const [agendaItems, setAgendaItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    responsible: "",
  });
  const [editItem, setEditItem] = useState<any>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const res = await axios.get(`${API_URL}/agenda/meeting/${meetingId}`);
        setAgendaItems(res.data);
      } catch (err) {
        console.error("Error fetching agenda:", err);
      }
    };
    if (meetingId) fetchAgenda();
  }, [meetingId]);

  const handleAddAgenda = async () => {
    if (!newItem.title) return alert("Title is required");
    const payload = {
      itemNumber: agendaItems.length + 1,
      title: newItem.title,
      responsible: newItem.responsible,
      description: newItem.description,
      meetingId,
    };
    try {
      const res = await axios.post(`${API_URL}/agenda`, payload);
      setAgendaItems([...agendaItems, res.data]);
      setNewItem({ title: "", description: "", responsible: "" });
      setOpenAddDialog(false);
    } catch (err) {
      console.error("Error adding agenda item:", err);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(`${API_URL}/agenda/${editItem.id}`, editItem);
      setAgendaItems(
        agendaItems.map((item) => (item.id === editItem.id ? res.data : item))
      );
      setEditItem(null);
    } catch (err) {
      console.error("Error updating agenda item:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/agenda/${id}`);
      setAgendaItems(agendaItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting agenda item:", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        p: 2,
        background: "#F0FFF8",
        minHeight: "100vh",
      }}
    >
      {/* القائمة اليسرى */}
      <Box sx={{ flex: 1 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6">Agenda</Typography>
          <Button
            variant="outlined"
            sx={{ borderRadius: "90%", background: "white" }}
            onClick={() => setOpenAddDialog(true)}
          >
            New Task
          </Button>
        </Box>

    
        {agendaItems.map((item) => (
          <Paper
            key={item.id}
            sx={{
              p: 2,
              mb: 2,
              borderRadius: "8px",
              background: "#fff",
              boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
              border: editItem?.id === item.id ? "0px solid #3A7659" : "none", // ✅ يضيف إطار أخضر لو هو اللي عم يتعدل
              position: "relative",
            }}
          >
            {/* سهم أو إشارة */}
            {editItem?.id === item.id && (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: "-23px",
                  transform: "translateY(-50%)",
                  color: "black",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                <ArrowForwardIosIcon/>
              </Box>
            )}

            <Typography fontWeight="bold" mb={1}>
              ● {item.itemNumber} {item.title}
            </Typography>
            <Typography mb={1}>Responsible: {item.responsible}</Typography>
            <Typography mb={1} color="text.secondary">
              {item.description}
            </Typography>
            <Box
              display="flex"
              justifyContent={"end"}
              alignItems={"center"}
              gap={1}
            >
              <Button
                size="small"
                onClick={() => setEditItem(item)}
                startIcon={<EditIcon />}
              >
                Comment
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => handleDelete(item.id)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* القسم الأيمن */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" mb={2}>
          Write details here ...!
        </Typography>
        {editItem && (
          <Paper sx={{ p: 2, background: "#fff", borderRadius: "8px" }}>
          
            <TextField
              label=""
              value={editItem.description}
              onChange={(e) =>
                setEditItem({ ...editItem, description: e.target.value })
              }
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2, background: "white" }}
            />
            <Box display="flex" gap={2}>
              <Button onClick={() => setEditItem(null)}>Cancel</Button>
              <Button variant="contained" onClick={handleSaveEdit}>
                Save
              </Button>
            </Box>
          </Paper>
        )}
      </Box>

      {/* Dialog للإضافة */}
      <Dialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        fullWidth
      >
        <DialogContent sx={{ background: "#F0FFF8" }}>
          <TextField
            label="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            fullWidth
            
            sx={{ mb: 2, background: "white" , height:'100vh' }}
          />
          <TextField
            label="Responsible"
            value={newItem.responsible}
            onChange={(e) =>
              setNewItem({ ...newItem, responsible: e.target.value })
            }
            fullWidth
            sx={{ mb: 2, background: "white" }}
          />
          <TextField
            label="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2, background: "white" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddAgenda}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MettingAgenda;

