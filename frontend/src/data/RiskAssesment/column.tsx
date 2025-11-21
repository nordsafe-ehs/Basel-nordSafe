import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export const riskColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 80,
    editable: false,
  },
  { field: "activity_name", headerName: "Activity", flex: 1, editable: true },
  {
    field: "identified_hazards",
    headerName: "Identified Hazards/Risks",
    flex: 2,
    editable: true,
  },
  {
    field: "people_involved",
    headerName: "People Involved",
    flex: 1,
    editable: true,
  },

  // Base Risk
  {
    field: "base_likelihood",
    headerName: "L (Base)",
    type: "singleSelect",
    valueOptions: [1, 2, 3, 4, 5],
    width: 100,
    editable: true,
    valueParser: (value) => Number(value), // ✅ يحول القيمة لرقم
  },
  {
    field: "base_severity",
    headerName: "S (Base)",
    type: "singleSelect",
    valueOptions: [1, 2, 3, 4, 5],
    width: 100,
    editable: true,
    valueParser: (value) => Number(value), // ✅ يحول القيمة لرقم
  },
  {
    field: "base_risk_score",
    headerName: "Risk Score (Base)",
    type: "number",
    width: 140,
    editable: false,
  },
  {
    field: "base_risk_level",
    headerName: "Risk Level (Base)",
    width: 160,
    editable: false,
    renderCell: (params) => {
      let bgColor = "";
      let textColor = "white";
      switch (params.value) {
        case "Low":
          bgColor = "#4CAF50";
          break;
        case "Medium":
          bgColor = "#FFC107";
          textColor = "black";
          break;
        case "High":
          bgColor = "#F44336";
          break;
        default:
          bgColor = "gray";
      }
      return (
        <Box
          sx={{
            backgroundColor: bgColor,
            color: textColor,
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: "4px",
            width: "100%",
            padding: "4px",
          }}
        >
          {params.value}
        </Box>
      );
    },
  },

  {
    field: "control_measures",
    headerName: "Control Measures",
    flex: 2,
    editable: true,
  },

  // Residual Risk
  {
    field: "residual_likelihood",
    headerName: "L (Residual)",
    type: "singleSelect",
    valueOptions: [1, 2, 3, 4, 5],
    width: 120,
    editable: true,
    valueParser: (value) => Number(value), // ✅ يحول القيمة لرقم
  },
  {
    field: "residual_severity",
    headerName: "S (Residual)",
    type: "singleSelect",
    valueOptions: [1, 2, 3, 4, 5],
    width: 120,
    editable: true,
    valueParser: (value) => Number(value), // ✅ يحول القيمة لرقم
  },
  {
    field: "residual_risk_score",
    headerName: "Risk Score (Residual)",
    type: "number",
    width: 160,
    editable: false,
  },
  {
    field: "residual_risk_level",
    headerName: "Risk Level (Residual)",
    width: 180,
    editable: false,
    renderCell: (params) => {
      let bgColor = "";
      let textColor = "white";
      switch (params.value) {
        case "Low":
          bgColor = "#4CAF50";
          break;
        case "Medium":
          bgColor = "#FFC107";
          textColor = "black";
          break;
        case "High":
          bgColor = "#F44336";
          break;
        default:
          bgColor = "gray";
      }
      return (
        <Box
          sx={{
            backgroundColor: bgColor,
            color: textColor,
            fontWeight: "bold",
            textAlign: "center",
            borderRadius: "4px",
            width: "100%",
            padding: "4px",
          }}
        >
          {params.value}
        </Box>
      );
    },
  },

  {
    field: "person_responsible",
    headerName: "Person Responsible",
    flex: 1,
    editable: true,
  },
];
