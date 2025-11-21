// import {
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Chip,
//   Button,
//   TextField,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Stack,
//   IconButton,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Document,
//   Packer,
//   Paragraph,
//   Table as DocxTable,
//   TableRow as DocxTableRow,
//   TableCell as DocxTableCell,
//   TextRun,
// } from "docx";
// import { saveAs } from "file-saver";
// import { API_URL } from "../API_URL";
// import { useToken } from "../hooks/useToken";

// const RiskAssessmentManager = () => {
//   const [activities, setActivities] = useState([]);
//   const [filter, setFilter] = useState("All");
//   const [editOpen, setEditOpen] = useState(false);
//   const [selected, setSelected] = useState(null);

//   const { token } = useToken();

//   const fetchActivities = async () => {
//     const res = await axios.get(`${API_URL}/activities`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     setActivities(res.data);
//   };

//   useEffect(() => {
//     fetchActivities();
//   }, []);

//   const getRiskLevelDisplay = (level) => {
//     const map = {
//       High: { label: "🔴 High", color: "error" },
//       Medium: { label: "🟠 Medium", color: "warning" },
//       Low: { label: "🟢 Low", color: "success" },
//     };
//     return map[level] || { label: level, color: "default" };
//   };

//   const handleEdit = (activity) => {
//     setSelected(activity);
//     setEditOpen(true);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/activities/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       fetchActivities();
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   const handleSave = async () => {
//     const risk_score_base = selected.likelihood_base * selected.severity_base;
//     const risk_level_base =
//       risk_score_base >= 15 ? "High" : risk_score_base >= 9 ? "Medium" : "Low";

//     await axios.put(
//       `${API_URL}/activities/${selected.id}`,
//       {
//         ...selected,
//         risk_score_base,
//         risk_level_base,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     setEditOpen(false);
//     setSelected(null);
//     fetchActivities();
//   };

//   const handleExport = async () => {
//     const tableRows = [
//       new DocxTableRow({
//         children: [
//           "Activity",
//           "Hazards",
//           "Likelihood",
//           "Severity",
//           "Risk Score",
//           "Risk Level",
//         ].map(
//           (text) =>
//             new DocxTableCell({
//               children: [new Paragraph({ children: [new TextRun(text)] })],
//             })
//         ),
//       }),
//       ...activities.map(
//         (a) =>
//           new DocxTableRow({
//             children: [
//               a.name,
//               a.hazards,
//               a.likelihood_base.toString(),
//               a.severity_base.toString(),
//               a.risk_score_base.toString(),
//               a.risk_level_base,
//             ].map(
//               (text) =>
//                 new DocxTableCell({
//                   children: [new Paragraph({ children: [new TextRun(text)] })],
//                 })
//             ),
//           })
//       ),
//     ];

//     const doc = new Document({
//       sections: [
//         {
//           children: [
//             new Paragraph({
//               children: [new TextRun("Risk Activities Report")],
//               heading: "Heading1",
//             }),
//             new DocxTable({ rows: tableRows }),
//           ],
//         },
//       ],
//     });

//     const blob = await Packer.toBlob(doc);
//     saveAs(blob, "RiskActivities.docx");
//   };

//   const filtered =
//     filter === "All"
//       ? activities
//       : activities.filter((a) => a.risk_level_base === filter);

//   return (
//     <Box p={2}>
//       <Stack direction="row" spacing={2} mb={2}>
//         <TextField
//           select
//           label="Filter by Risk Level"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           sx={{ width: 200 }}
//         >
//           {["All", "High", "Medium", "Low"].map((level) => (
//             <MenuItem key={level} value={level}>
//               {level}
//             </MenuItem>
//           ))}
//         </TextField>
//         <Button variant="outlined" onClick={handleExport}>
//           Export to Word
//         </Button>
//       </Stack>

//       <Typography variant="h6" gutterBottom>
//         Risk Activities
//       </Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Activity</TableCell>
//             <TableCell>Hazards</TableCell>
//             <TableCell>Likelihood</TableCell>
//             <TableCell>Severity</TableCell>
//             <TableCell>Risk Score</TableCell>
//             <TableCell>Risk Level</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filtered.map((a) => (
//             <TableRow key={a.id}>
//               <TableCell>{a.name}</TableCell>
//               <TableCell>{a.hazards}</TableCell>
//               <TableCell>{a.likelihood_base}</TableCell>
//               <TableCell>{a.severity_base}</TableCell>
//               <TableCell>{a.risk_score_base}</TableCell>
//               <TableCell>
//                 {(() => {
//                   const { label, color } = getRiskLevelDisplay(
//                     a.risk_level_base
//                   );
//                   return (
//                     <Chip label={label} variant="outlined" sx={{ color }} />
//                   );
//                 })()}
//               </TableCell>
//               <TableCell>
//                 <Stack direction="row" spacing={1}>
//                   <IconButton
//                     size="small"
//                     onClick={() => handleEdit(a)}
//                     color="primary"
//                   >
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton
//                     size="small"
//                     onClick={() => handleDelete(a.id)}
//                     color="error"
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Stack>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
//         <DialogTitle>Edit Activity</DialogTitle>
//         <DialogContent>
//           {selected && (
//             <Stack spacing={2} mt={1}>
//               <TextField
//                 label="Activity"
//                 value={selected.name}
//                 onChange={(e) =>
//                   setSelected({ ...selected, name: e.target.value })
//                 }
//               />
//               <TextField
//                 label="Hazards"
//                 value={selected.hazards}
//                 onChange={(e) =>
//                   setSelected({ ...selected, hazards: e.target.value })
//                 }
//               />
//               <TextField
//                 label="Likelihood"
//                 type="number"
//                 value={selected.likelihood_base}
//                 onChange={(e) =>
//                   setSelected({
//                     ...selected,
//                     likelihood_base: parseInt(e.target.value),
//                   })
//                 }
//               />
//               <TextField
//                 label="Severity"
//                 type="number"
//                 value={selected.severity_base}
//                 onChange={(e) =>
//                   setSelected({
//                     ...selected,
//                     severity_base: parseInt(e.target.value),
//                   })
//                 }
//               />
//               <TextField
//                 label="Control Measures"
//                 value={selected.control_measures}
//                 onChange={(e) =>
//                   setSelected({
//                     ...selected,
//                     control_measures: e.target.value,
//                   })
//                 }
//               />
//               <TextField
//                 label="Responsible"
//                 value={selected.responsible}
//                 onChange={(e) =>
//                   setSelected({ ...selected, responsible: e.target.value })
//                 }
//               />
//             </Stack>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditOpen(false)}>Cancel</Button>
//           <Button onClick={handleSave} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default RiskAssessmentManager;


