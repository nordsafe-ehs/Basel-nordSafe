import { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { API_URL } from "../API_URL";

const MeetingForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    organizer: "",
    date: "",
    time: "",
    location: "",
    participants: "",
    agenda: [
      { topic: "", responsible: "", notes: "", action: "", deadline: "" },
    ],
    decisions: [""],
    openActions: [
      { action: "", responsible: "", deadline: "", status: "Open" },
    ],
    notes: "",
    signedBy: "",
    signedRole: "",
    signedDate: "",
  });

  const [meetings, setMeetings] = useState([]);

  // 📌 جلب الاجتماعات عند تحميل الصفحة
  useEffect(() => {
    axios
      .get(`${API_URL}/meetings`)
      .then((res) => setMeetings(res.data))
      .catch((err) => console.error("❌ Error fetching meetings:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateAgenda = (i, key, value) => {
    const updated = [...form.agenda];
    updated[i][key] = value;
    setForm((prev) => ({ ...prev, agenda: updated }));
  };

  const addAgendaItem = () =>
    setForm((prev) => ({
      ...prev,
      agenda: [
        ...prev.agenda,
        { topic: "", responsible: "", notes: "", action: "", deadline: "" },
      ],
    }));

  const updateDecision = (i, value) => {
    const updated = [...form.decisions];
    updated[i] = value;
    setForm((prev) => ({ ...prev, decisions: updated }));
  };

  const addDecision = () =>
    setForm((prev) => ({ ...prev, decisions: [...prev.decisions, ""] }));

  const updateAction = (i, key, value) => {
    const updated = [...form.openActions];
    updated[i][key] = value;
    setForm((prev) => ({ ...prev, openActions: updated }));
  };

  const addOpenAction = () =>
    setForm((prev) => ({
      ...prev,
      openActions: [
        ...prev.openActions,
        { action: "", responsible: "", deadline: "", status: "Open" },
      ],
    }));

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API_URL}/meetings`, form);
      alert("✅ Meeting saved successfully");
      setMeetings((prev) => [...prev, res.data]); // تحديث القائمة
    } catch (err) {
      console.error("❌ Error saving meeting:", err);
      alert("⚠️ Failed to save meeting");
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">📝 Meeting Minutes</Typography>
      </Grid>

      {/* Meeting Info */}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Meeting Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Organizer"
          name="organizer"
          value={form.organizer}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Date"
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Time"
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Location"
          name="location"
          value={form.location}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Participants"
          name="participants"
          value={form.participants}
          onChange={handleChange}
          fullWidth
          multiline
        />
      </Grid>

      {/* Agenda */}
      <Grid item xs={12}>
        <Typography variant="h5"> Agenda</Typography>
      </Grid>
      {form.agenda.map((item, i) => (
        <Grid container spacing={1} sx={{ margin: 1 }} key={i}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Topic"
              value={item.topic}
              onChange={(e) => updateAgenda(i, "topic", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Responsible"
              value={item.responsible}
              onChange={(e) => updateAgenda(i, "responsible", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Notes"
              value={item.notes}
              onChange={(e) => updateAgenda(i, "notes", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Action"
              value={item.action}
              onChange={(e) => updateAgenda(i, "action", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Deadline"
              type="date"
              value={item.deadline}
              onChange={(e) => updateAgenda(i, "deadline", e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button onClick={addAgendaItem} startIcon={<AddIcon />}>
          Add Agenda Item
        </Button>
      </Grid>

      {/* Decisions */}
      <Grid item xs={12}>
        <Typography variant="h6"> Decisions</Typography>
      </Grid>
      {form.decisions.map((d, i) => (
        <Grid item xs={12} key={i}>
          <TextField
            label={`Decision ${i + 1}`}
            value={d}
            onChange={(e) => updateDecision(i, e.target.value)}
            fullWidth
          />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button onClick={addDecision} startIcon={<AddIcon />}>
          Add Decision
        </Button>
      </Grid>

      {/* Open Actions */}
      <Grid item xs={12}>
        <Typography variant="h6"> Open Actions</Typography>
      </Grid>
      {form.openActions.map((a, i) => (
        <Grid container spacing={1} sx={{ margin: 1 }} key={i}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Action"
              value={a.action}
              onChange={(e) => updateAction(i, "action", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Responsible"
              value={a.responsible}
              onChange={(e) => updateAction(i, "responsible", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Deadline"
              type="date"
              value={a.deadline}
              onChange={(e) => updateAction(i, "deadline", e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Status"
              value={a.status}
              onChange={(e) => updateAction(i, "status", e.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
      ))}

      {/* Notes & Signature */}
      <Grid item xs={12}>
        <TextField
          label="Additional Notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          fullWidth
          multiline
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Signed By"
          name="signedBy"
          value={form.signedBy}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Role"
          name="signedRole"
          value={form.signedRole}
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Signature Date"
          type="date"
          name="signedDate"
          value={form.signedDate}
          onChange={handleChange}
          fullWidth
        />
      </Grid>

      {/* Save Button */}
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Meeting Minutes
        </Button>
      </Grid>

      {/* 📋 قائمة الاجتماعات */}
      <Grid item xs={12}>
        <Typography variant="h6">📋 All Meetings</Typography>
        {meetings.map((m) => (
          <Accordion key={m.id} sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {m.title} — {m.date} {m.time}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* Meeting Info */}
              <Typography variant="subtitle1">
                Organizer: {m.organizer}
              </Typography>
              <Typography variant="subtitle1">
                Location: {m.location}
              </Typography>
              <Typography variant="body2">
                Description: {m.description}
              </Typography>
              <Typography variant="body2">
                Participants: {m.participants}
              </Typography>
              <Divider sx={{ my: 1 }} />

              {/* Agenda */}
              <Typography variant="h6">Agenda</Typography>
              <List>
                {m.AgendaItems?.map((a) => (
                  <ListItem key={a.id}>
                    <ListItemText
                      primary={`${a.topic} — Responsible: ${a.responsible}`}
                      secondary={`Notes: ${a.notes} | Action: ${a.action} | Deadline: ${a.deadline}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 1 }} />

              {/* Decisions */}
              <Typography variant="h6">Decisions</Typography>
              <List>
                {m.Decisions?.map((d) => (
                  <ListItem key={d.id}>
                    <ListItemText primary={d.decisionText} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 1 }} />

              {/* Open Actions */}
              <Typography variant="h6">Open Actions</Typography>
              <List>
                {m.OpenActions?.map((o) => (
                  <ListItem key={o.id}>
                    <ListItemText
                      primary={`${o.action} — Responsible: ${o.responsible}`}
                      secondary={`Deadline: ${o.deadline} | Status: ${o.status}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 1 }} />

              {/* Notes & Signature */}
              <Typography variant="body2">Notes: {m.notes}</Typography>
              <Typography variant="body2">
                Signed By: {m.signedBy} ({m.signedRole}) on {m.signedDate}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
    </Grid>
  );
};
export default MeetingForm;
