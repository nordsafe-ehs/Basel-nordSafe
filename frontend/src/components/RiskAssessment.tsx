// import { useEffect, useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { IconButton, Box, Tooltip } from "@mui/material";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
// import AddIcon from "@mui/icons-material/Add";
// import axios from "axios";
// import { API_URL } from "../API_URL";
// import { useToken } from "../hooks/useToken";
// import { riskColumns } from "../data/RiskAssesment/column";

// const RiskAssessment = () => {
//   const [rows, setRows] = useState<any[]>([]);
//   const [hiddenRows, setHiddenRows] = useState<(string | number)[]>([]);
//   const [rowModesModel, setRowModesModel] = useState({});

//   const { token } = useToken();

//  const handleProcessRowUpdate = async (newRow: any, oldRow: any) => {
//    try {
//      if (String(newRow.id).startsWith("temp-")) {
//        // صف جديد → POST
//        const res = await axios.post(`${API_URL}/risk-evaluations`, newRow, {
//          headers: { Authorization: `Bearer ${token}` },
//        });
//        // استبدل الـ temp id بالـ id الحقيقي من السيرفر
//        setRows((prev) =>
//          prev.map((row) =>
//            row.id === newRow.id ? { ...newRow, id: res.data.id } : row
//          )
//        );
//        return { ...newRow, id: res.data.id };
//      } else {
//        // صف موجود → PUT
//        await axios.put(`${API_URL}/risk-evaluations/${newRow.id}`, newRow, {
//          headers: { Authorization: `Bearer ${token}` },
//        });
//        setRows((prev) =>
//          prev.map((row) => (row.id === newRow.id ? newRow : row))
//        );
//        return newRow;
//      }
//    } catch (err: any) {
//      console.error("Error updating row:", err.message);
//      return oldRow;
//    }
//  };

//   // ✅ جلب البيانات من الـ API عند التحميل
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/risk-evaluations`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         // تأكد أن كل صف عنده id
//         const formatted = res.data.map((item: any) => ({
//           id: item.id,
//           activity: item.activity,
//           hazards: item.hazards,
//           peopleInvolved: item.peopleInvolved,
//           likelihood: item.likelihood,
//           severity: item.severity,
//           riskScore: item.riskScore,
//           riskRating: item.riskRating,
//           controlMeasures: item.controlMeasures,
//           residualLikelihood: item.residualLikelihood,
//           residualSeverity: item.residualSeverity,
//           residualRiskScore: item.residualRiskScore,
//           residualRiskRating: item.residualRiskRating,
//           responsiblePerson: item.responsiblePerson,
//         }));
//         setRows(formatted);
//       } catch (err: any) {
//         console.error("Error fetching risks:", err.message);
//       }
//     };
//     fetchData();
//   }, [token]);

//   // ✅ حذف صف
//   const handleDeleteRow = async (id: number) => {
//     try {
//       await axios.delete(`${API_URL}/risk-evaluations/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setRows((prev) => prev.filter((row) => row.id !== id));
//     } catch (err: any) {
//       console.error("Error deleting row:", err.message);
//     }
//   };

//   // ✅ إضافة صف جديد فارغ (محلي فقط)
//   const handleAddRow = () => {
//     setRows((prev) => [
//       ...prev,
//       {
//         id: `temp-${Date.now()}`, // مؤقت        activity: "New Activity",
//         hazards: "Hazard not defined",
//         peopleInvolved: "",
//         likelihood: "Low",
//         severity: "",
//         controlMeasures: "",
//         residualLikelihood: "Low",
//         residualSeverity: "",
//         responsiblePerson: "",
//       },
//     ]);
//      setRowModesModel((prev) => ({
//        ...prev,
//        [id]: { mode: "edit", fieldToFocus: "activity" }, // يبدأ مباشرة بالتحرير
//      }));
//   };

//   // ✅ عمود Actions
//   const actionColumn = {
//     field: "actions",
//     headerName: "Actions",
//     width: 150,
//     sortable: false,
//     filterable: false,
//     renderCell: (params: any) => (
//       <>
//         <Tooltip title="Delete">
//           <IconButton
//             color="error"
//             onClick={() => handleDeleteRow(params.row.id)}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//         <Tooltip title="Hide">
//           <IconButton
//             color="default"
//             onClick={() => setHiddenRows((prev) => [...prev, params.row.id])}
//           >
//             <VisibilityOffIcon />
//           </IconButton>
//         </Tooltip>
//       </>
//     ),
//   };

//   // ✅ Toolbar
//   const CustomToolbar = () => (
//     <Box display="flex" justifyContent="flex-end" p={1} gap={1}>
//       <Tooltip title="Add New">
//         <IconButton
//           color="primary"
//           onClick={() => {
//             console.log("Add clicked");
//             handleAddRow();
//           }}
//         >
//           <AddIcon />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Show All Hidden Rows">
//         <IconButton
//           color="secondary"
//           onClick={() => {
//             console.log("Show all clicked");
//             setHiddenRows([]);
//           }}
//         >
//           <VisibilityOffIcon />
//         </IconButton>
//       </Tooltip>
//       <Tooltip title="Export Excel">
//         <IconButton color="primary" onClick={() => console.log("Export")}>
//           <FileDownloadIcon />
//         </IconButton>
//       </Tooltip>
//     </Box>
//   );

//   return (
//     <Box>
//       <h2 style={{ margin: "8px" }}>Risk Assessment Records</h2>
//       <Box sx={{ border: "1px solid #ccc", borderRadius: "8px", height: 600 }}>
//         <CustomToolbar />
//         <DataGrid
//           rows={rows.filter((row) => !hiddenRows.includes(row.id))}
//           columns={[...riskColumns, actionColumn]}
//           getRowId={(row) => row.id}
//           pageSize={10}
//           rowsPerPageOptions={[10, 20, 50]}
//           processRowUpdate={handleProcessRowUpdate}
//           rowModesModel={rowModesModel}
//           onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
//           experimentalFeatures={{ newEditingApi: true }}
//           slots={{ toolbar: CustomToolbar }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default RiskAssessment;

import { useEffect, useState } from "react";
import {
  DataGrid,
  GridRowModesModel,
  GridRowModes,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  IconButton,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import axios from "axios";
import { API_URL } from "../API_URL";
import { useToken } from "../hooks/useToken";
import { riskColumns } from "../data/RiskAssesment/column";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as XLSX from "xlsx";
import { Padding } from "@mui/icons-material";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const RiskAssessment = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [hiddenRows, setHiddenRows] = useState<(string | number)[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [riskFilter, setRiskFilter] = useState<string>("All");

  const { token } = useToken();

  // const handleExportExcel = () => {

  //   const worksheet = XLSX.utils.json_to_sheet(rows);

  //   // ✅ ضبط عرض الأعمدة
  //   worksheet["!cols"] = [
  //     { wch: 20 },
  //     { wch: 15 },
  //     { wch: 15 },
  //     { wch: 15 },
  //     { wch: 30 },
  //   ];

  //   // ✅ إضافة ألوان للخلايا حسب درجة الخطورة
  //   rows.forEach((row, index) => {
  //     const excelRow = index + 2; // الصفوف تبدأ من 2
  //     const cellAddress = `D${excelRow}`; // عمود D فيه RiskRating
  //     const cell = worksheet[cellAddress];
  //     if (cell) {
  //       if (row.riskRating === "High") {
  //         cell.s = {
  //           fill: { fgColor: { rgb: "FF0000" } },
  //           font: { color: { rgb: "FFFFFF" } },
  //         };
  //       } else if (row.riskRating === "Medium") {
  //         cell.s = {
  //           fill: { fgColor: { rgb: "FFA500" } },
  //           font: { color: { rgb: "000000" } },
  //         };
  //       } else if (row.riskRating === "Low") {
  //         cell.s = {
  //           fill: { fgColor: { rgb: "00FF00" } },
  //           font: { color: { rgb: "000000" } },
  //         };
  //       }
  //     }
  //   });

  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "RiskAssessment");

  //   XLSX.writeFile(workbook, "RiskAssessment.xlsx");
  // };

  

  // ✅ فلترة حسب مستوى الخطورة



  const handleExportExcel = async (rows) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("RiskAssessment");

  worksheet.columns = [
    { header: "ID", key: "id", width: 8 },
    { header: "Activity",key: "activity", width: 20  },
    { header: "Hazards", key: "hazards", width: 30 },
    { header: "People Involved", key: "peopleInvolved", width: 20 },
    { header: "L (Base)", key: "likelihood", width: 12 },
    { header: "S (Base)", key: "severity", width: 12 },
    { header: "Risk Score (Base)", key: "riskScore", width: 18 },
    { header: "Risk Level (Base)", key: "riskRating", width: 20 },
    { header: "Control Measures", key: "controlMeasures", width: 30 },
    { header: "L (Residual)", key: "residualLikelihood", width: 15 },
    { header: "S (Residual)", key: "residualSeverity", width: 15 },
    { header: "Risk Score (Residual)", key: "residualRiskScore", width: 20 },
    { header: "Risk Level (Residual)", key: "residualRiskRating", width: 22 },
    { header: "Person Responsible", key: "responsiblePerson", width: 20 },
  ];

  rows.forEach((row) => {
    const newRow = worksheet.addRow(row);

    const baseCell = newRow.getCell("riskRating");
    const residualCell = newRow.getCell("residualRiskRating");

    const colorize = (cell, value) => {
      if (value === "High") {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFF0000" },
        };
        cell.font = { color: { argb: "FFFFFFFF" }, bold: true };
      } else if (value === "Medium") {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFA500" },
        };
        cell.font = { color: { argb: "FF000000" }, bold: true };
      } else if (value === "Low") {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF00FF00" },
        };
        cell.font = { color: { argb: "FF000000" }, bold: true };
      }
      cell.alignment = { horizontal: "center" };  
    };

    colorize(baseCell, row.riskRating);
    colorize(residualCell, row.residualRiskRating);
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD3D3D3" },
    };
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center" };
  });

  
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "RiskAssessment.xlsx");
};

  
  
  
  
  
  const filteredRows = rows
    .filter((row) => !hiddenRows.includes(row.id))
    .filter((row) =>
      riskFilter === "All" ? true : row.riskRating === riskFilter
    );

  const handleOpenFilter = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setFilterAnchor(null);
  };

  const handleSelectFilter = (value: string) => {
    setRiskFilter(value);
    handleCloseFilter();
  };

  // ✅ حفظ أو تحديث صف
  // const handleProcessRowUpdate = async (newRow: any, oldRow: any) => {
  //   try {
  //     if (String(newRow.id).startsWith("temp-")) {
  //       // صف جديد → POST
  //       const res = await axios.post(`${API_URL}/risk-evaluations`, newRow, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       const savedRow = res.data; // السيرفر يرجع الصف الجديد مع id والقيم المحسوبة

  //       setRows((prev) =>
  //         prev.map((row) => (row.id === newRow.id ? savedRow : row))
  //       );

  //       return savedRow;
  //     } else {
  //       // صف موجود → PUT
  //       const res = await axios.put(
  //         `${API_URL}/risk-evaluations/${newRow.id}`,
  //         newRow,
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       const updatedRow = res.data; // السيرفر يرجع الصف بعد التحديث

  //       setRows((prev) =>
  //         prev.map((row) => (row.id === newRow.id ? updatedRow : row))
  //       );

  //       return updatedRow;
  //     }
  //   } catch (err: any) {
  //     console.error("Error updating row:", err.message);
  //     return oldRow;
  //   }
  // };
  const handleProcessRowUpdate = async (newRow: any, oldRow: any) => {
    try {
      // ✅ أولاً: حدّث الجدول محلياً بالقيم الجديدة
      setRows((prev) =>
        prev.map((row) => (row.id === newRow.id ? newRow : row))
      );
      let res;
      if (String(newRow.id).startsWith("temp-")) {
        // صف جديد → POST
        res = await axios.post(`${API_URL}/risk-evaluations`, newRow, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // صف موجود → PUT
        res = await axios.put(
          `${API_URL}/risk-evaluations/${Number(newRow.id)}`,
          newRow,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      const updatedRow = res.data; // السيرفر يرجع الصف كامل بالقيم المحسوبة
      // ✅ ثانياً: حدّث الصف بالقيم النهائية من السيرفر
      setRows((prev) =>
        prev.map((row) => (row.id === newRow.id ? updatedRow : row))
      );

      return updatedRow; // مهم جداً: ترجع القيم الجديدة للـ DataGrid
    } catch (err: any) {
      console.error("Error updating row:", err.message);
      return oldRow;
    }
  };

  // ✅ جلب البيانات عند التحميل
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/risk-evaluations`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formatted = res.data.map((item: any) => ({
          id: item.id,
          activity: item.activity,
          hazards: item.hazards,
          peopleInvolved: item.peopleInvolved,
          likelihood: item.likelihood,
          severity: item.severity,
          riskScore: item.riskScore,
          riskRating: item.riskRating,
          controlMeasures: item.controlMeasures,
          residualLikelihood: item.residualLikelihood,
          residualSeverity: item.residualSeverity,
          residualRiskScore: item.residualRiskScore,
          residualRiskRating: item.residualRiskRating,
          responsiblePerson: item.responsiblePerson,
        }));
        setRows(formatted);
      } catch (err: any) {
        console.error("Error fetching risks:", err.message);
      }
    };
    fetchData();
  }, [token]);

  const handleDeleteRow = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/risk-evaluations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRows((prev) => prev.filter((row) => row.id !== id));
    } catch (err: any) {
      console.error("Error deleting row:", err.message);
    }
  };

  const handleAddRow = () => {
    const newId = `temp-${Date.now()}`;
    setRows((prev) => [
      ...prev,
      {
        id: newId,
        activity: "",
        hazards: "",
        // peopleInvolved: "",
        likelihood: "",
        severity: "",
        controlMeasures: "",
        residualLikelihood: "",
        residualSeverity: "",
        responsiblePerson: "",
      },
    ]);

    setRowModesModel((prev) => ({
      ...prev,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: "activity" },
    }));
  };

  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    width: 180,
    type: "actions",
    getActions: (params: any) => {
      const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            color="primary"
            onClick={() =>
              setRowModesModel((prev) => ({
                ...prev,
                [params.id]: { mode: GridRowModes.View },
              }))
            }
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            color="error"
            onClick={() =>
              setRowModesModel((prev) => ({
                ...prev,
                [params.id]: {
                  mode: GridRowModes.View,
                  ignoreModifications: true,
                },
              }))
            }
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="error"
          onClick={() => handleDeleteRow(params.id)}
        />,
        <GridActionsCellItem
          icon={<VisibilityOffIcon />}
          label="Hide"
          onClick={() => setHiddenRows((prev) => [...prev, params.id])}
        />,
      ];
    },
  };

  // ✅ Toolbar
  const CustomToolbar = () => (
    <Box display="flex" justifyContent="flex-end" p={1} gap={1}>
      <Tooltip title="Add New">
        <IconButton color="primary" onClick={handleAddRow}>
          <AddIcon sx={{ color: "#172E4E" }} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Show All Hidden Rows">
        <IconButton color="secondary" onClick={() => setHiddenRows([])}>
          <VisibilityIcon sx={{ color: "#172E4E" }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Export Excel">
        <IconButton color="primary" onClick={() => handleExportExcel(rows)}>
          <FileDownloadIcon sx={{ color: "#172E4E" }} />
        </IconButton>
      </Tooltip>
      {/* ✅ زر الفلترة */}

      <Tooltip title="Filter by Risk" sx={{ background: "#F0FFF8 " }}>
        <IconButton
          color="primary"
          onClick={handleOpenFilter}
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography variant="caption" sx={{ fontSize: "0.75rem" }}>
            Filter
          </Typography>
          <FilterListIcon sx={{ color: "#172E4E", fontSize: "20px" }} />
        </IconButton>
        <Popover
          open={Boolean(filterAnchor)}
          anchorEl={filterAnchor}
          onClose={handleCloseFilter}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "left",
          }}
          disablePortal
        >
          <Box position={"relative"}>
            <MenuItem onClick={() => handleSelectFilter("All")}>All</MenuItem>
            <MenuItem onClick={() => handleSelectFilter("High")}>High</MenuItem>
            <MenuItem onClick={() => handleSelectFilter("Medium")}>
              Medium
            </MenuItem>
            <MenuItem onClick={() => handleSelectFilter("Low")}>Low</MenuItem>
          </Box>
        </Popover>
      </Tooltip>
    </Box>
  );

  return (
    <Box>
      {/* <h2 style={{ margin: "8px" }}>Risk Assessment Records</h2> */}
      <Box
        sx={{
          position: "relative",
          //border: "1px solid #ccc",
          borderRadius: "8px",
          height: 600,
        }}
      >
        <CustomToolbar />
        <DataGrid
          
          //rows={rows.filter((row) => !hiddenRows.includes(row.id))}
          rows={filteredRows}
          columns={[...riskColumns, actionColumn]}
          getRowId={(row) => row.id}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          processRowUpdate={handleProcessRowUpdate}
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          experimentalFeatures={{ newEditingApi: true }}
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>
    </Box>
  );
};

export default RiskAssessment;
