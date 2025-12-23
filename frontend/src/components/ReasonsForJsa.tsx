import React from "react";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const reasons = [
  { value: "new unfamiliar task", label: "New / unfamiliar task" },
  { value: "mixed teams", label: "Mixed teams" },
  { value: "changed conditions", label: "Changed conditions" },
  { value: "previous incidents", label: "Previous incidents" },
  { value: "audit requirement", label: "Audit requirement" },
];

const riskData = [
  { id: 1, symbol: "🚗", meaning: "Hit by moving vehicle" },
  { id: 2, symbol: "🩸", meaning: "Severe injury" },
  { id: 3, symbol: "⚡", meaning: "Electrical hazard" },
  { id: 4, symbol: "🔥", meaning: "Hot work & welding" },
  { id: 5, symbol: "🏗️", meaning: "Heavy machinery" },
  { id: 6, symbol: "🧗", meaning: "Working at height" },
  { id: 7, symbol: "🌊", meaning: "Confined space / drowning" },
  { id: 8, symbol: "🧫", meaning: "Handling infectious materials" },
  { id: 9, symbol: "📦", meaning: "Falling object" },
  { id: 10, symbol: "☣️", meaning: "Chemical exposure" },
];

const columns: GridColDef[] = [
  { field: "symbol", headerName: "Symbol", width: 190 },
  { field: "meaning", headerName: "Meaning", flex: 1 },
];

const ReasonsForJsa: React.FC = () => {
  const [selectedReason, setSelectedReason] = React.useState("");

  return (
    <Box>
      {/* اختيار السبب */}
      <FormControl component="fieldset" sx={{ mb: 4 }}>
        <RadioGroup
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
        >
          {reasons.map((reason) => (
            <FormControlLabel
              key={reason.value}
              value={reason.value}
              control={<Radio />}
              label={reason.label}
            />
          ))}
        </RadioGroup>
      </FormControl>

     
      <Box display={'flex'} justifyContent={'center'}>

      <div style={{ height: 600, width: "700px" }}>
        <DataGrid
          rows={riskData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
      </Box>
    </Box>
  );
};

export default ReasonsForJsa;
