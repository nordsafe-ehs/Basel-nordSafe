// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   TextField, IconButton, Typography, Paper
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { useState } from "react";

// const CaseTableMettings = () => {
//  {
//   const [editIndex, setEditIndex] = useState(null);

//   const handleChange = (index, field) => (e) => {
//     const updated = [...cases];
//     updated[index][field] = e.target.value;
//     setCases(updated);
//   };

//   return (
//     <TableContainer component={Paper} sx={{ mb: 4 }}>
//       <Typography variant="h6" sx={{ p: 2 }}>{title}</Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Case No</TableCell>
//             <TableCell>Activity</TableCell>
//             <TableCell>Responsibility</TableCell>
//             <TableCell>Deadline</TableCell>
//             <TableCell>Edit</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {cases.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>{row.caseNumber}</TableCell>
//               <TableCell>
//                 {editIndex === index ? (
//                   <TextField value={row.activity} onChange={handleChange(index, "activity")} />
//                 ) : row.activity || "-"}
//               </TableCell>
//               <TableCell>
//                 {editIndex === index ? (
//                   <TextField value={row.responsibility} onChange={handleChange(index, "responsibility")} />
//                 ) : row.responsibility || "-"}
//               </TableCell>
//               <TableCell>
//                 {editIndex === index ? (
//                   <TextField type="date" value={row.deadline} onChange={handleChange(index, "deadline")} />
//                 ) : row.deadline || "-"}
//               </TableCell>
//               <TableCell>
//                 <IconButton onClick={() => setEditIndex(index === editIndex ? null : index)}>
//                   <EditIcon />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

// export default CaseTableMettings
