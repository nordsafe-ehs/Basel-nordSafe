const express = require("express");
const cors = require("cors");
const path = require("path");
const reportsRoutes = require("./routes/reports");
const usersRoutes = require("./routes/users");
const projectsRoutes = require("./routes/projects");
const SDSRoutes = require("./routes/sds");
const sequelize = require("./db");
const checklistsRoutes = require("./routes/checklists");
const plansRoutes = require("./routes/plans");
const entranceLogRoutes = require("./routes/entrance-log");
const subscriptionsRoutes = require("./routes/subscriptions");
const companiesRoutes = require("./routes/companies");
//const projectModuleRoutes = require("./routes/ProjectModuleRoute");
const riskEvaluationRoutes = require("./routes/risk-evaluations");
const riskParticipantsRoutes = require("./routes/Riskparticipants");
//metting
const meetingsRoutes = require("./routes/meetingsٌRoute");
const agendaRoutes = require("./routes/agendaMetting");
const attendanceRoutes = require("./routes/AttendanceMetting");
const attecmentMettingRoutes = require("./routes/AttechmentsRouteMetting");

const { BasePlans } = require("./models");

const dotenv = require("dotenv");

const fileUpload = require("express-fileupload");

dotenv.config();
const app = express();

app.use(
  fileUpload({
    createParentPath: true,
    limits: { fileSize: 20 * 1024 * 1024 },
    abortOnLimit: true,
  })
);

app.use((req, res, next) => {
  if (req.originalUrl === "/api/subscriptions/webhook")
    express.raw({ type: "application/json" })(req, res, next);
  else if (req.is("application/json")) express.json()(req, res, next);
  else next();
});

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/sds-files", express.static(path.join(__dirname, "sds-files")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("Database synced successfully.");

    const count = await BasePlans.count();
    if (count === 0) {
      await BasePlans.bulkCreate([
        {
          name: "Basic Protection",
          usersCount: 4,
          adminsCount: 1,
          projectsCount: 2,
          monthlySDSSearchCount: 10,
          monthlySDSSaveCount: 0,
          price: 100,
        },
        {
          name: "Advanced Protection",
          usersCount: 8,
          adminsCount: 2,
          projectsCount: 10,
          monthlySDSSearchCount: 250,
          monthlySDSSaveCount: 10,
          price: 200,
        },
        {
          name: "Maximum Protection",
          usersCount: 20,
          adminsCount: 5,
          projectsCount: 20,
          monthlySDSSearchCount: 500,
          monthlySDSSaveCount: 20,
          price: 300,
        },
      ]);

      console.log("Default base plans inserted.");
    } else {
      console.log("Base plans already exist. No seeding needed.");
    }
  })
  .catch((err) => {
    console.error("Database sync failed:", err);
  });

app.use("/api/reports", reportsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/sds", SDSRoutes);
app.use("/api/checklists", checklistsRoutes);
app.use("/api/plans", plansRoutes);
app.use("/api/entrance-log", entranceLogRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);
app.use("/api/companies", companiesRoutes);
// app.use("/api/project-modules", projectModuleRoutes);
app.use("/api/risk-evaluations", riskEvaluationRoutes);
app.use("/api/participants", riskParticipantsRoutes);

//metting
app.use("/api/meetings", meetingsRoutes);
app.use("/api/agenda", agendaRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/attachments", attecmentMettingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
