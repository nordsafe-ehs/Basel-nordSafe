// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   MenuItem,
//   Stack,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useToken } from "../hooks/useToken";
// import { API_URL } from "../API_URL";

// const OtherRisk = () => {
//   const [form, setForm] = useState({
//     name: "",
//     hazards: "",
//     people_involved: "",
//     likelihood_base: 1,
//     severity_base: 1,
//     control_measures: "",
//     responsible: "",
//   });

//   const [options, setOptions] = useState({
//     activity: [],
//     hazard: [],
//     people: [],
//     responsible: [],
//   });

//   const [addDialog, setAddDialog] = useState(null); // type: "activity" | "hazard" | "people" | "responsible"
//   const [newOption, setNewOption] = useState("");

//   const { token } = useToken();

//   const fetchOptions = async () => {
//     const res = await axios.get(`${API_URL}/user-options`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const grouped = {
//       activity: [],
//       hazard: [],
//       people: [],
//       responsible: [],
//     };

//     res.data.forEach((opt) => {
//       if (grouped[opt.type]) {
//         grouped[opt.type].push(opt.value);
//       }
//     });

//     setOptions(grouped);
//   };

//   useEffect(() => {
//     fetchOptions();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const risk_score_base = form.likelihood_base * form.severity_base;
//   const risk_level_base =
//     risk_score_base >= 15 ? "High" : risk_score_base >= 9 ? "Medium" : "Low";

//   const renderRiskLevel = () => {
//     const levels = {
//       High: { emoji: "🔴", color: "red" },
//       Medium: { emoji: "🟠", color: "orange" },
//       Low: { emoji: "🟢", color: "green" },
//     };

//     const { emoji, color } = levels[risk_level_base];

//     return (
//       <Typography fontWeight="bold" color={color}>
//         {emoji} {risk_level_base} Risk
//       </Typography>
//     );
//   };

//   const handleSubmit = async () => {
//     await axios.post(
//       `${API_URL}/activities`,
//       {
//         ...form,
//         risk_score_base,
//         risk_level_base,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log("successfully created");
//   };

//   const handleAddOption = async () => {
//     await axios.post(
//       `${API_URL}/user-options`,
//       { type: addDialog, value: newOption },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     setNewOption("");
//     setAddDialog(null);
//     fetchOptions();
//   };

//   const renderSelect = (name, label, values) => (
//     <Stack direction="row" spacing={1} alignItems="center">
//       <TextField
//         name={name}
//         label={label}
//         select
//         value={form[name]}
//         onChange={handleChange}
//         sx={{ flex: 1 }}
//       >
//         {values.map((opt) => (
//           <MenuItem key={opt} value={opt}>
//             {opt}
//           </MenuItem>
//         ))}
//       </TextField>
//       <Button onClick={() => setAddDialog(name)}>Add</Button>
//     </Stack>
//   );

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h6">Add Risk Activity</Typography>
//       <Stack spacing={2}>
//         {renderSelect("name", "Activity Name", options.activity)}
//         {renderSelect("hazards", "Hazards", options.hazard)}
//         {renderSelect("people_involved", "People Involved", options.people)}

//         <TextField
//           name="likelihood_base"
//           label="Likelihood"
//           select
//           value={form.likelihood_base}
//           onChange={handleChange}
//         >
//           {[1, 2, 3, 4, 5].map((val) => (
//             <MenuItem key={val} value={val}>
//               {val} -{" "}
//               {val === 1 ? "Rare" : val === 5 ? "Almost Certain" : "Likely"}
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           name="severity_base"
//           label="Severity"
//           select
//           value={form.severity_base}
//           onChange={handleChange}
//         >
//           {[1, 2, 3, 4, 5].map((val) => (
//             <MenuItem key={val} value={val}>
//               {val} - {val === 1 ? "Minor" : val === 5 ? "Fatal" : "Moderate"}
//             </MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           name="control_measures"
//           label="Control Measures"
//           multiline
//           rows={3}
//           value={form.control_measures}
//           onChange={handleChange}
//         />

//         {renderSelect("responsible", "Responsible Person", options.responsible)}

//         {renderRiskLevel()}

//         <Button variant="contained" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </Stack>

//       <Dialog open={!!addDialog} onClose={() => setAddDialog(null)}>
//         <DialogTitle>Add {addDialog} Option</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="New Option"
//             fullWidth
//             value={newOption}
//             onChange={(e) => setNewOption(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setAddDialog(null)}>Cancel</Button>
//           <Button onClick={handleAddOption} variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default OtherRisk;
