import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useToken } from "../hooks/useToken";
import { API_URL } from "../API_URL";

const InputRisk = () => {
  const [form, setForm] = useState({
    name: "",
    hazards: "",
    people_involved: "",
    likelihood_base: 1,
    severity_base: 1,
    control_measures: "",
    responsible: "",
  });

  const { token } = useToken();

  const activityOptions = [
    "Cable Pulling",
    "Welding",
    "Scaffolding",
    "Excavation",
    "Electrical Work",
  ];
  const hazardOptions = [
    "Back pain",
    "Eye irritation",
    "Fall from height",
    "Electric shock",
    "Dust inhalation",
  ];
  const peopleOptions = [
    "Electricians",
    "Welders",
    "Scaffolders",
    "Excavation team",
    "General workers",
  ];
  const responsibleOptions = [
    "Supervisor",
    "Safety Officer",
    "Foreman",
    "Engineer",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const risk_score_base = form.likelihood_base * form.severity_base;
  const risk_level_base =
    risk_score_base >= 15 ? "High" : risk_score_base >= 9 ? "Medium" : "Low";

  const renderRiskLevel = () => {
    const levels = {
      High: { emoji: "🔴", color: "red" },
      Medium: { emoji: "🟠", color: "orange" },
      Low: { emoji: "🟢", color: "green" },
    };

    const { emoji, color } = levels[risk_level_base];

    return (
      <Typography fontWeight="bold" color={color}>
        {emoji} {risk_level_base} Risk
      </Typography>
    );
  };

  const handleSubmit = async () => {
    await axios.post(
      `${API_URL}/activities`,
      {
        ...form,
        risk_score_base,
        risk_level_base,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("successfully created");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Add Risk Activity</Typography>
      <Stack spacing={2}>
        <TextField
          name="name"
          label="Activity Name"
          select
          value={form.name}
          onChange={handleChange}
        >
          {activityOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="hazards"
          label="Hazards"
          select
          value={form.hazards}
          onChange={handleChange}
        >
          {hazardOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="people_involved"
          label="People Involved"
          select
          value={form.people_involved}
          onChange={handleChange}
        >
          {peopleOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="likelihood_base"
          label="Likelihood"
          select
          value={form.likelihood_base}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <MenuItem key={val} value={val}>
              {val} -{" "}
              {val === 1 ? "Rare" : val === 5 ? "Almost Certain" : "Likely"}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="severity_base"
          label="Severity"
          select
          value={form.severity_base}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <MenuItem key={val} value={val}>
              {val} - {val === 1 ? "Minor" : val === 5 ? "Fatal" : "Moderate"}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          name="control_measures"
          label="Control Measures"
          multiline
          rows={3}
          value={form.control_measures}
          onChange={handleChange}
        />

        <TextField
          name="responsible"
          label="Responsible Person"
          select
          value={form.responsible}
          onChange={handleChange}
        >
          {responsibleOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>

        {renderRiskLevel()}

        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default InputRisk;
