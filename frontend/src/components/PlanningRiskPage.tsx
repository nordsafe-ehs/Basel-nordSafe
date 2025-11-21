// import { useEffect, useState } from "react";
// import {
//   Typography,
//   Box,
//   Paper,
//   Grid,
//   TextField,
//   MenuItem,
//   Chip,
//   Button,
//   Select,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import axios from "axios";
// import { API_URL } from "../API_URL";

// interface ProjectModule {
//   id: number;
//   title: string;
//   description: string;
// }

// interface RiskEvaluation {
//   id?: number;
//   module_id: number;
//   user_id: number;
//   likelihood: number;
//   severity: number;
// }

// const PlanningRiskPage = () => {
//   const [modules, setModules] = useState<ProjectModule[]>([]);
//   const [evaluations, setEvaluations] = useState<
//     Record<number, RiskEvaluation>
//   >({});
//   const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);

//   useEffect(() => {
//     axios.get(`${API_URL}/project-modules`).then((res) => {
//       console.log("Modules:", res.data);
//       setModules(res.data);
//     });

//     axios.get(`${API_URL}/risk-evaluations`).then((res) => {
//       const grouped: Record<number, RiskEvaluation> = {};
//       res.data.forEach((evaluation: RiskEvaluation) => {
//         grouped[evaluation.module_id] = evaluation;
//       });
//       setEvaluations(grouped);
//     });
//   }, []);

//   useEffect(() => {
//     if (
//       selectedModuleId &&
//       !evaluations[selectedModuleId] &&
//       modules.some((mod) => mod.id === selectedModuleId)
//     ) {
//       setEvaluations((prev) => ({
//         ...prev,
//         [selectedModuleId]: {
//           module_id: selectedModuleId,
//           user_id: 1,
//           likelihood: 1,
//           severity: 1,
//         },
//       }));
//     }
//   }, [selectedModuleId, evaluations, modules]);


//   const handleChange = (
//     id: number,
//     field: keyof RiskEvaluation,
//     value: number
//   ) => {
//     setEvaluations((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         module_id: id,
//         user_id: 1,
//         likelihood: field === "likelihood" ? value : prev[id]?.likelihood || 1,
//         severity: field === "severity" ? value : prev[id]?.severity || 1,
//       },
//     }));
//   };

//  const handleSubmit = async (id: number) => {
//    const evalData = evaluations[id];
//    if (!evalData) {
//      console.warn("No evaluation data found for module:", id);
//      return;
//    }

//    const payload: RiskEvaluation = {
//      module_id: id,
//      user_id: 1,
//      likelihood: evalData.likelihood,
//      severity: evalData.severity,
//    };

//    try {
//      if (evalData.id) {
//        await axios.put(`${API_URL}/risk-evaluations/${evalData.id}`, payload);
//      } else {
//        const res = await axios.post(`${API_URL}/risk-evaluations`, payload);
//        setEvaluations((prev) => ({
//          ...prev,
//          [id]: res.data,
//        }));
//      }
//    } catch (err) {
//      console.error("Error saving evaluation:", err);
//    }
//  };


//   const getRiskLevel = (score: number) => {
//     if (score >= 15) return { label: "High", color: "error", emoji: "🔴" };
//     if (score >= 9) return { label: "Medium", color: "warning", emoji: "🟠" };
//     return { label: "Low", color: "success", emoji: "🟢" };
//   };

//   const selectedModule = modules.find((mod) => mod.id === selectedModuleId);
//   const evalData =
//     selectedModuleId && evaluations[selectedModuleId]
//       ? evaluations[selectedModuleId]
//       : {
//           module_id: selectedModuleId || 0,
//           user_id: 1,
//           likelihood: 1,
//           severity: 1,
//         };

//   const score = evalData.likelihood * evalData.severity;
//   const level = getRiskLevel(score);

//   return (
//     <Box p={3}>
//       <Typography variant="h4" gutterBottom>
//         Risk Evaluation by Selected Module
//       </Typography>

//       <FormControl fullWidth sx={{ mb: 3 }}>
//         <InputLabel>Select a Module</InputLabel>
//         <Select
//           value={selectedModuleId || ""}
//           label="Select a Module"
//           onChange={(e) => setSelectedModuleId(Number(e.target.value))}
//         >
//           {modules.map((mod) => (
//             <MenuItem key={mod.id} value={mod.id}>
//               {mod.title}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>

//       {selectedModule && (
//         <Paper sx={{ p: 2 }}>
//           <Typography variant="h6">{selectedModule.title}</Typography>
//           <Typography variant="body2" color="text.secondary">
//             {selectedModule.description}
//           </Typography>

//           <Grid container spacing={2} mt={2}>
//             <Grid item xs={6}>
//               <TextField
//                 label="Likelihood"
//                 select
//                 fullWidth
//                 value={evalData.likelihood}
//                 onChange={(e) =>
//                   handleChange(
//                     selectedModule.id,
//                     "likelihood",
//                     Number(e.target.value)
//                   )
//                 }
//               >
//                 {[1, 2, 3, 4, 5].map((val) => (
//                   <MenuItem key={val} value={val}>
//                     {val}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Severity"
//                 select
//                 fullWidth
//                 value={evalData.severity}
//                 onChange={(e) =>
//                   handleChange(
//                     selectedModule.id,
//                     "severity",
//                     Number(e.target.value)
//                   )
//                 }
//               >
//                 {[1, 2, 3, 4, 5].map((val) => (
//                   <MenuItem key={val} value={val}>
//                     {val}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//           </Grid>

//           <Box mt={2}>
//             <Chip
//               label={`${level.emoji} ${level.label} Risk`}
//               color={level.color}
//               variant="outlined"
//             />
//             <Typography variant="caption" ml={2}>
//               Score: {score}
//             </Typography>
//             {evalData.id && (
//               <Typography variant="caption" ml={2} color="text.secondary">
//                 Evaluation saved by user ID: {evalData.user_id}
//               </Typography>
//             )}
//           </Box>

//           <Box mt={2}>
//             <Button
//               variant="contained"
//               onClick={() => handleSubmit(selectedModule.id)}
//             >
//               Save Evaluation
//             </Button>
//           </Box>
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default PlanningRiskPage;



