import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../API_URL";


const phases = [
  "Planning",
  "Preparation",
  "Construction",
  "Operation",
  "Closure",
];

const categories = [
  "Surveying & Geotechnical",
  "Engineering & Design",
  "Safety Management",
  "Legal & Regulatory",
  "Logistics & Procurement",
  "Earthworks",
  "Foundation",
  "Waterproofing",
  "Utilities",
  "General Safety",
];

// const planningModules = [
//   {
//     title: "Site Survey and Inspection",
//     description:
//       "Conducting topographical and geotechnical surveys, identifying underground utilities, drilling boreholes, and testing soil.",
//     hazards:
//       "Uneven ground, environmental exposure, utility strikes, equipment injuries, pit collapse, electrocution, gas leaks, flooding.",
//     risks:
//       "Fractures, hazardous exposure, fire/explosion, equipment trauma, structural errors, contamination.",
//     controls:
//       "Risk assessments, PPE, utility marking, GPR scans, hydro excavation, trained personnel, ventilation, emergency plans.",
//     phase: "Planning",
//     category: "Surveying & Geotechnical",
//   },
//   {
//     title: "Design and Engineering Analysis",
//     description:
//       "Creating structural designs, performing load calculations, planning layouts, and assessing environmental impact.",
//     hazards:
//       "Design errors, miscommunication, code violations, pollution, ecosystem disruption.",
//     risks:
//       "Collapse, delays, legal action, fines, reputational damage, ecological harm.",
//     controls:
//       "Code compliance, peer reviews, BIM, EIA, green standards, sustainable materials.",
//     phase: "Planning",
//     category: "Engineering & Design",
//   },
//   {
//     title: "Risk Assessment and Safety Planning",
//     description:
//       "Identifying hazards, preparing ERP, assigning safety roles, and planning emergency readiness.",
//     hazards:
//       "Incomplete hazard ID, poor preparedness, flammable materials, electrical faults.",
//     risks: "Injuries, legal penalties, shutdowns, low morale, fire escalation.",
//     controls:
//       "Risk assessments, ERP, SMS, training, first aid, fire extinguishers, safe storage.",
//     phase: "Planning",
//     category: "Safety Management",
//   },
//   {
//     title: "Permits and Regulatory Compliance",
//     description:
//       "Securing permits, ensuring legal compliance, resolving land issues, and engaging stakeholders.",
//     hazards:
//       "Legal violations, environmental harm, land disputes, community resistance.",
//     risks: "Fines, delays, shutdowns, reputational damage, financial loss.",
//     controls:
//       "Legal consultation, permit acquisition, EIA, title verification, community engagement.",
//     phase: "Planning",
//     category: "Legal & Regulatory",
//   },
//   {
//     title: "Logistics and Resource Planning",
//     description:
//       "Planning materials, workforce, transport, budgeting, and storage.",
//     hazards:
//       "Poor storage, traffic hazards, theft, budget overruns, manual handling injuries.",
//     risks: "Financial loss, workflow delays, legal disputes, injuries, fires.",
//     controls:
//       "Site security, logistics plan, traffic zones, audits, secure stacking, lifting aids.",
//     phase: "Planning",
//     category: "Logistics & Procurement",
//   },
// ];

// const sitePreparationModules = [
//   {
//     title: "Site Establishment, Clearing & Earthworks",
//     description:
//       "Clearing vegetation, debris, and existing structures. Marking and leveling the site. Excavating trenches or pits. Setting up temporary site offices, fencing, and access routes.",
//     hazards:
//       "Uneven terrain, excavation collapse, equipment strikes, underground utility exposure, dust inhalation, slips and falls.",
//     risks:
//       "Injuries or fatalities from collapse or impact, electrocution, respiratory issues, fractures.",
//     controls:
//       "Site surveys, PPE, excavation safety training, trench protection systems, traffic management, dust suppression.",
//     phase: "Preparation",
//     category: "Earthworks",
//   },
//   {
//     title: "Excavation & Trenching",
//     description:
//       "Digging trenches and pits for footings. Removing soil and debris. Preparing ground for foundations. Installing shoring or trench boxes.",
//     hazards:
//       "Cave-ins, falls, machinery movement, hazardous gases, water accumulation.",
//     risks:
//       "Burial, fractures, crushing injuries, drowning, increased accident risk.",
//     controls:
//       "Trench protection systems, safe access, equipment distance, gas testing, water removal, barricades.",
//     phase: "Preparation",
//     category: "Earthworks",
//   },
//   {
//     title: "Deep Excavation & Pile Foundation Installation",
//     description:
//       "Drilling boreholes, driving piles, installing pile caps and reinforcement.",
//     hazards:
//       "Falls, equipment malfunction, noise, underground utility contact.",
//     risks:
//       "Fatal injuries, hearing loss, ground instability, fire or explosion.",
//     controls:
//       "Guardrails, fall protection, hearing PPE, utility surveys, safe distances.",
//     phase: "Preparation",
//     category: "Foundation",
//   },
//   {
//     title: "Laying Foundations (Concrete & Reinforcement Work)",
//     description:
//       "Cutting, bending, tying rebar. Erecting formwork. Pouring and curing concrete.",
//     hazards:
//       "Rebar injuries, chemical burns, formwork collapse, slips, manual handling.",
//     risks:
//       "Skin irritation, fractures, musculoskeletal disorders, serious injury.",
//     controls:
//       "PPE, secure formwork, training, mechanical aids, slip-resistant surfaces, pressure monitoring.",
//     phase: "Preparation",
//     category: "Foundation",
//   },
//   {
//     title: "Waterproofing & Drainage Installation",
//     description:
//       "Applying waterproofing membranes. Installing drainage systems. Sealing foundation walls. Backfilling.",
//     hazards:
//       "Toxic chemicals, confined spaces, manual handling, poor ventilation.",
//     risks: "Respiratory issues, fire, suffocation, musculoskeletal disorders.",
//     controls:
//       "Ventilation, chemical PPE, handling training, confined space procedures, clean work areas.",
//     phase: "Preparation",
//     category: "Waterproofing",
//   },
//   {
//     title: "Ground Recompaction & Site Restoration",
//     description: "Refilling excavated areas. Compacting soil. Leveling ground.",
//     hazards:
//       "Wall collapse, machinery strikes, vibration exposure, dust and noise.",
//     risks:
//       "Burial, severe injuries, nerve damage, respiratory and hearing issues.",
//     controls:
//       "Shoring, safe zones, PPE, dust suppression, vibration monitoring.",
//     phase: "Preparation",
//     category: "Earthworks",
//   },
//   {
//     title: "Utility Installation (Piping, Electrical, etc.)",
//     description:
//       "Laying underground pipes and conduits. Installing grounding systems.",
//     hazards: "Live cable contact, gas leaks, trench collapse.",
//     risks: "Electrocution, fire, asphyxiation.",
//     controls: "Utility mapping, insulated tools, emergency training.",
//     phase: "Preparation",
//     category: "Utilities",
//   },
//   {
//     title: "Final Inspection & Site Cleanup",
//     description:
//       "Checking foundation defects. Cleaning debris. Preparing for next phase.",
//     hazards: "Sharp objects, slips, dust inhalation.",
//     risks: "Cuts, respiratory problems, falls, contamination.",
//     controls: "PPE, safe disposal, dust control, clear walkways.",
//     phase: "Preparation",
//     category: "General Safety",
//   },
// ];

const AddModulePage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    hazards: "",
    risks: "",
    controls: "",
    phase: "",
    category: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/project-modules`, form);
      alert("✅ Module saved successfully");
      setForm({
        title: "",
        description: "",
        hazards: "",
        risks: "",
        controls: "",
        phase: "",
        category: "",
      });
    } catch (err) {
      console.error("Error saving module:", err);
      alert("❌ Failed to save module");
    }
  };

  const handleInsertModules = async (modules: typeof planningModules) => {
    for (const mod of modules) {
      try {
        await axios.post(`${API_URL}/project-modules`, mod);
        console.log(`✅ Inserted: ${mod.title}`);
      } catch (err) {
        console.error(`❌ Failed: ${mod.title}`, err);
      }
    }
    alert("✅ Modules inserted successfully");
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Add New Module
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {/* العنوان + المرحلة */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Module Title"
              fullWidth
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phase"
              select
              fullWidth
              value={form.phase}
              onChange={(e) => handleChange("phase", e.target.value)}
            >
              {phases.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* الوصف + الفئة */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={2}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Category"
              select
              fullWidth
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* المخاطر + الإجراءات */}
          <Grid item xs={12} md={6}>
            <TextField
              label="Hazards"
              fullWidth
              multiline
              rows={2}
              value={form.hazards}
              onChange={(e) => handleChange("hazards", e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Risks"
              fullWidth
              multiline
              rows={2}
              value={form.risks}
              onChange={(e) => handleChange("risks", e.target.value)}
            />
          </Grid>

          {/* إجراءات التحكم */}
          <Grid item xs={12}>
            <TextField
              label="Control Measures"
              fullWidth
              multiline
              rows={2}
              value={form.controls}
              onChange={(e) => handleChange("controls", e.target.value)}
            />
          </Grid>
        </Grid>

        <Box mt={3} display="flex" gap={2}>
          <Button variant="contained" onClick={handleSubmit}>
            Save Module
          </Button>
          {/* <Button
            variant="outlined"
            onClick={() => handleInsertModules(planningModules)}
          >
            Insert Planning Modules
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleInsertModules(sitePreparationModules)}
          >
            Insert Site Preparation Modules
          </Button> */}
        </Box>
      </Paper>
    </Box>
  );
};

export default AddModulePage;
