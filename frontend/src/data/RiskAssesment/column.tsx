import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

export const riskColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 30, editable: false },
  {
    field: "activity",
    headerName: "Activity",
    flex: 1,
   
    editable: true,
  },
  {
    field: "hazards",
    headerName: "Hazards",
    flex: 1,
  
    editable: true,
  },
  // {
  //   field: "peopleInvolved",
  //   headerName: "People Involved",
  //   flex: 1,
    
  //   editable: true,
  // },

  // Base Risk
  { field: "likelihood", headerName: "L (Base)", width: 100, editable: true },
  { field: "severity", headerName: "S (Base)", width: 100, editable: true },
  {
    field: "riskScore",
    headerName: "Risk Score (Base)",
    width: 140,
    editable: false,
  },
  {
    field: "riskRating",
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
    field: "controlMeasures",
    headerName: "Control Measures",
    flex: 1,
    width: 100,
    editable: true,
  },

  // Residual Risk
  {
    field: "residualLikelihood",
    headerName: "L (Residual)",
    width: 120,
    editable: true,
  },
  {
    field: "residualSeverity",
    headerName: "S (Residual)",
    width: 120,
    editable: true,
  },
  {
    field: "residualRiskScore",
    headerName: "Risk Score (Residual)",
    width: 160,
    editable: false,
  },
  {
    field: "residualRiskRating",
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
    field: "responsiblePerson",
    headerName: "Person Responsible",
    flex: 1,
    width: 100,
    editable: true,
  },
];


