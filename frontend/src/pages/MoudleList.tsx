// import { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   IconButton,
//   Paper,
//   Chip,
//   Grid,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   TextField,
//   Popover,
//   Button,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import axios from "axios";
// import { API_URL } from "../API_URL";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// import FilterAltIcon from "@mui/icons-material/FilterAlt";

// const phases = [
//   "All",
//   "Planning",
//   "Preparation",
//   "Construction",
//   "Operation",
//   "Closure",
// ];
// const categories = [
//   "All",
//   "Surveying & Geotechnical",
//   "Engineering & Design",
//   "Safety Management",
//   "Legal & Regulatory",
//   "Logistics & Procurement",
//   "Foundation",
//   "Utilities",
//   "General Safety",
// ];

// interface ProjectModule {
//   id: number;
//   title: string;
//   description?: string;
//   phase?: string;
//   category?: string;
//   hazards?: string;
//   risks?: string;
//   controls?: string;
// }

// interface RiskEvaluation {
//   id?: number;
//   module_id: number;
//   user_id: number;
//   likelihood: number;
//   severity: number;
// }

// const ModuleListPage = () => {
//   const [modules, setModules] = useState<ProjectModule[]>([]);
//   const [evaluations, setEvaluations] = useState<RiskEvaluation[]>([]);
//   const [selectedPhase, setSelectedPhase] = useState("All");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
//   const [inlineEdits, setInlineEdits] = useState<
//     Record<number, Partial<ProjectModule>>
//   >({});

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "filter-popover" : undefined;

//   const exportToExcel = () => {
//     const data = filteredModules.map((mod) => {
//       const evaluation = evaluations.find((e) => e.module_id === mod.id);
//       const score =
//         evaluation?.likelihood && evaluation?.severity
//           ? evaluation.likelihood * evaluation.severity
//           : null;
//       const level = score ? getRiskLevel(score).label : "";

//       return {
//         Title: mod.title,
//         Phase: mod.phase,
//         Category: mod.category,
//         Description: mod.description,
//         Hazards: mod.hazards,
//         Risks: mod.risks,
//         Controls: mod.controls,
//         Likelihood: evaluation?.likelihood ?? "",
//         Severity: evaluation?.severity ?? "",
//         Score: score ?? "",
//         RiskLevel: level,
//       };
//     });

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Modules");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });
//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, "ProjectModules.xlsx");
//   };

//   useEffect(() => {
//     axios.get(`${API_URL}/project-modules`).then((res) => setModules(res.data));
//     axios
//       .get(`${API_URL}/risk-evaluations`)
//       .then((res) => setEvaluations(res.data));
//   }, []);

//   const getRiskLevel = (score: number) => {
//     if (score >= 15) return { label: "High", color: "error", emoji: "🔴" };
//     if (score >= 9) return { label: "Medium", color: "warning", emoji: "🟠" };
//     return { label: "Low", color: "success", emoji: "🟢" };
//   };

//   const handleDelete = async (id: number) => {
//     if (!window.confirm("Are you sure you want to delete this module?")) return;
//     try {
//       await axios.delete(`${API_URL}/project-modules/${id}`);
//       setModules((prev) => prev.filter((mod) => mod.id !== id));
//       alert("✅ Module deleted successfully");
//     } catch (err) {
//       console.error("❌ Failed to delete module:", err);
//       alert("❌ Failed to delete module");
//     }
//   };

//   const handleEvaluationChange = async (
//     moduleId: number,
//     field: "likelihood" | "severity",
//     value: number
//   ) => {
//     const existing = evaluations.find((e) => e.module_id === moduleId);
//     const updated = {
//       ...existing,
//       module_id: moduleId,
//       user_id: 1,
//       [field]: value,
//     };

//     try {
//       if (existing?.id) {
//         await axios.patch(
//           `${API_URL}/risk-evaluations/${existing.id}`,
//           updated
//         );
//       } else {
//         await axios.post(`${API_URL}/risk-evaluations`, updated);
//       }

//       setEvaluations((prev) => {
//         const others = prev.filter((e) => e.module_id !== moduleId);
//         return [...others, updated];
//       });
//     } catch (err) {
//       console.error("❌ Failed to update evaluation:", err);
//     }
//   };

//   const handleInlineEdit = (
//     id: number,
//     field: keyof ProjectModule,
//     value: string
//   ) => {
//     setInlineEdits((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], [field]: value },
//     }));
//   };

//   const saveInlineEdit = async (id: number) => {
//     try {
//       await axios.put(`${API_URL}/project-modules/${id}`, inlineEdits[id]);
//       setModules((prev) =>
//         prev.map((mod) =>
//           mod.id === id ? { ...mod, ...inlineEdits[id] } : mod
//         )
//       );
//       setEditingModuleId(null);
//       alert("✅ Module updated");
//     } catch (err) {
//       console.error("❌ Failed to save inline edit:", err);
//       alert("❌ Failed to save changes");
//     }
//   };

//   const filteredModules = modules.filter((mod) => {
//     const phaseMatch = selectedPhase === "All" || mod.phase === selectedPhase;
//     const categoryMatch =
//       selectedCategory === "All" || mod.category === selectedCategory;
//     return phaseMatch && categoryMatch;
//   });

//   return (
//     <Box>
//       <Typography variant="h5" gutterBottom>
//         Project Modules with Risk Evaluations
//       </Typography>

//       <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
//         {/* ✅ أيقونة الفلاتر */}
//         <IconButton
//           sx={{
//             border: 1,
//             background: "#3A7659",
//             borderRadius: "1",
//             color: "white",
//             margin: 1,
//           }}
//           onClick={handleFilterClick}
//         >
//           <FilterAltIcon />
//         </IconButton>

//         {/* ✅ زر التصدير */}
//         <Button variant="contained" onClick={exportToExcel}>
//           <ArrowDownwardIcon />
//         </Button>

//         <Popover
//           id={id}
//           open={open}
//           anchorEl={anchorEl}
//           onClose={handleClose}
//           anchorOrigin={{
//             vertical: "bottom",
//             horizontal: "left",
//           }}
//           transformOrigin={{
//             vertical: "top",
//             horizontal: "left",
//           }}
//         >
//           <Box sx={{ p: 2, minWidth: 250 }}>
//             <Typography variant="subtitle1" gutterBottom>
//               Filter Options
//             </Typography>

//             <FormControl fullWidth sx={{ mb: 2 }}>
//               <InputLabel>Phase</InputLabel>
//               <Select
//                 value={selectedPhase}
//                 label="Phase"
//                 onChange={(e) => setSelectedPhase(e.target.value)}
//               >
//                 {phases.map((p) => (
//                   <MenuItem key={p} value={p}>
//                     {p}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl fullWidth>
//               <InputLabel>Category</InputLabel>
//               <Select
//                 value={selectedCategory}
//                 label="Category"
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//               >
//                 {categories.map((c) => (
//                   <MenuItem key={c} value={c}>
//                     {c}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Box>
//         </Popover>
//       </Box>

//       <Paper>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Title</TableCell>
//               <TableCell>Phase</TableCell>
//               <TableCell>Category</TableCell>
//               <TableCell>Likelihood</TableCell>
//               <TableCell>Severity</TableCell>
//               <TableCell>Score</TableCell>
//               <TableCell>Risk Level</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredModules.length > 0 ? (
//               filteredModules.map((mod) => {
//                 const evalForModule = evaluations.find(
//                   (e) => e.module_id === mod.id
//                 );
//                 const score =
//                   evalForModule?.likelihood && evalForModule?.severity
//                     ? evalForModule.likelihood * evalForModule.severity
//                     : null;
//                 const level = score !== null ? getRiskLevel(score) : null;

//                 return (
//                   <>
//                     <TableRow key={mod.id}>
//                       <TableCell>{mod.title}</TableCell>
//                       <TableCell>{mod.phase}</TableCell>
//                       <TableCell>{mod.category}</TableCell>
//                       <TableCell>
//                         <TextField
//                           type="number"
//                           size="small"
//                           value={evalForModule?.likelihood ?? ""}
//                           onChange={(e) =>
//                             handleEvaluationChange(
//                               mod.id,
//                               "likelihood",
//                               Number(e.target.value)
//                             )
//                           }
//                           inputProps={{ min: 1, max: 5 }}
//                           sx={{ width: 80 }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <TextField
//                           type="number"
//                           size="small"
//                           value={evalForModule?.severity ?? ""}
//                           onChange={(e) =>
//                             handleEvaluationChange(
//                               mod.id,
//                               "severity",
//                               Number(e.target.value)
//                             )
//                           }
//                           inputProps={{ min: 1, max: 5 }}
//                           sx={{ width: 80 }}
//                         />
//                       </TableCell>
//                       <TableCell>{score ?? "-"}</TableCell>
//                       <TableCell>
//                         {level ? (
//                           <Chip
//                             label={`${level.emoji} ${level.label}`}
//                             color={level.color}
//                             variant="outlined"
//                           />
//                         ) : (
//                           "-"
//                         )}
//                       </TableCell>
//                       <TableCell align="right">
//                         <IconButton
//                           color="primary"
//                           onClick={() => setEditingModuleId(mod.id)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           color="error"
//                           onClick={() => handleDelete(mod.id)}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>

//                     {editingModuleId === mod.id && (
//                       <TableRow>
//                         <TableCell colSpan={8}>
//                           <Box
//                             sx={{
//                               p: 2,
//                               backgroundColor: "#f9f9f9",
//                               borderRadius: 2,
//                             }}
//                           >
//                             <TextField
//                               label="Title"
//                               fullWidth
//                               value={inlineEdits[mod.id]?.title ?? mod.title}
//                               onChange={(e) =>
//                                 handleInlineEdit(
//                                   mod.id,
//                                   "title",
//                                   e.target.value
//                                 )
//                               }
//                               sx={{ mb: 2 }}
//                             />
//                             <TextField
//                               label="Description"
//                               fullWidth
//                               multiline
//                               rows={2}
//                               value={
//                                 inlineEdits[mod.id]?.description ??
//                                 mod.description ??
//                                 ""
//                               }
//                               onChange={(e) =>
//                                 handleInlineEdit(
//                                   mod.id,
//                                   "description",
//                                   e.target.value
//                                 )
//                               }
//                               sx={{ mb: 2 }}
//                             />
//                             <TextField
//                               label="Hazards"
//                               fullWidth
//                               multiline
//                               rows={2}
//                               value={
//                                 inlineEdits[mod.id]?.hazards ??
//                                 mod.hazards ??
//                                 ""
//                               }
//                               onChange={(e) =>
//                                 handleInlineEdit(
//                                   mod.id,
//                                   "hazards",
//                                   e.target.value
//                                 )
//                               }
//                               sx={{ mb: 2 }}
//                             />
//                             <TextField
//                               label="Risks"
//                               fullWidth
//                               multiline
//                               rows={2}
//                               value={
//                                 inlineEdits[mod.id]?.risks ?? mod.risks ?? ""
//                               }
//                               onChange={(e) =>
//                                 handleInlineEdit(
//                                   mod.id,
//                                   "risks",
//                                   e.target.value
//                                 )
//                               }
//                               sx={{ mb: 2 }}
//                             />
//                             <TextField
//                               label="Controls"
//                               fullWidth
//                               multiline
//                               rows={2}
//                               value={
//                                 inlineEdits[mod.id]?.controls ??
//                                 mod.controls ??
//                                 ""
//                               }
//                               onChange={(e) =>
//                                 handleInlineEdit(
//                                   mod.id,
//                                   "controls",
//                                   e.target.value
//                                 )
//                               }
//                               sx={{ mb: 2 }}
//                             />
//                             <Grid container spacing={2}>
//                               <Grid item xs={12} md={6}>
//                                 <TextField
//                                   select
//                                   label="Phase"
//                                   fullWidth
//                                   value={
//                                     inlineEdits[mod.id]?.phase ??
//                                     mod.phase ??
//                                     ""
//                                   }
//                                   onChange={(e) =>
//                                     handleInlineEdit(
//                                       mod.id,
//                                       "phase",
//                                       e.target.value
//                                     )
//                                   }
//                                   sx={{ mb: 2 }}
//                                 >
//                                   {phases.slice(1).map((p) => (
//                                     <MenuItem key={p} value={p}>
//                                       {p}
//                                     </MenuItem>
//                                   ))}
//                                 </TextField>
//                               </Grid>
//                               <Grid item xs={12} md={6}>
//                                 <TextField
//                                   select
//                                   label="Category"
//                                   fullWidth
//                                   value={
//                                     inlineEdits[mod.id]?.category ??
//                                     mod.category ??
//                                     ""
//                                   }
//                                   onChange={(e) =>
//                                     handleInlineEdit(
//                                       mod.id,
//                                       "category",
//                                       e.target.value
//                                     )
//                                   }
//                                   sx={{ mb: 2 }}
//                                 >
//                                   {categories.slice(1).map((c) => (
//                                     <MenuItem key={c} value={c}>
//                                       {c}
//                                     </MenuItem>
//                                   ))}
//                                 </TextField>
//                               </Grid>
//                             </Grid>
//                             <Box sx={{ display: "flex", gap: 2 }}>
//                               <Button
//                                 variant="contained"
//                                 onClick={() => saveInlineEdit(mod.id)}
//                               >
//                                 💾 Save
//                               </Button>
//                               <Button
//                                 variant="text"
//                                 onClick={() => setEditingModuleId(null)}
//                               >
//                                 ❌ Cancel
//                               </Button>
//                             </Box>
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </>
//                 );
//               })
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
//                   No modules found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// };

// export default ModuleListPage;
