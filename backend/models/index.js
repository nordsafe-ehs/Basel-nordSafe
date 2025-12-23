const Users = require("./users");
const Projects = require("./projects");
const Companies = require("./companies");
const UserProjects = require("./user-projects");
const BasePlans = require("./base-plans");
const Checklists = require("./checklists");
const Plans = require("./plans");
const Reports = require("./reports");
const SDS = require("./sds");
const AssignReport = require("./assign-report");
const EntranceLog = require("./entrance-log");
//const { ProjectModule } = require("./ProjectModule");
const { RiskEvaluation } = require("./RiskEvaluation");
const sequelize = require("../db");
const MeetingDetails = require("./MeetingDetails");
const AgendaItem = require("./AgendaItemMetting");
const Attendance = require("./AttendanceMetting");
const Attachment = require("./AttechmentsMetting");

Checklists.belongsTo(Projects);
Companies.belongsTo(Plans);
Plans.belongsTo(BasePlans);
Projects.belongsTo(Companies);
Projects.belongsToMany(Users, { through: UserProjects });
Reports.belongsTo(Projects);
SDS.belongsTo(Projects);
Users.belongsTo(Companies);
Users.belongsToMany(Projects, { through: UserProjects });
EntranceLog.belongsTo(Users);
EntranceLog.belongsTo(Projects);

UserProjects.belongsTo(Projects);
Projects.hasMany(UserProjects);

UserProjects.belongsTo(Users);
Users.hasMany(UserProjects);

AssignReport.belongsTo(Reports);
Reports.hasMany(AssignReport);

AssignReport.belongsTo(Users);
Users.hasMany(AssignReport);

// ProjectModule.hasMany(RiskEvaluation, { foreignKey: "module_id" });
// RiskEvaluation.belongsTo(ProjectModule, { foreignKey: "module_id" });

// اجتماع واحد له عدة بنود أجندة
// MeetingDetails.hasMany(AgendaItem, {
//   foreignKey: { name: "meetingId", allowNull: false },
//   as: "agendaItems",
//   onDelete: "CASCADE",
// });
// AgendaItem.belongsTo(MeetingDetails, {
//   foreignKey: { name: "meetingId", allowNull: false },
//   as: "meeting",
// });

// ✅ الربط مع Meeting
MeetingDetails.hasMany(Attachment, {
  foreignKey: "meetingId",
  onDelete: "CASCADE",
});
Attachment.belongsTo(MeetingDetails, { foreignKey: "meetingId" });

MeetingDetails.hasMany(Attendance, {
  foreignKey: { name: "meetingId", allowNull: false },
  as: "attendances",
  onDelete: "CASCADE",
});

Attendance.belongsTo(MeetingDetails, {
  foreignKey: { name: "meetingId", allowNull: false },
  as: "meeting",
});

sequelize
  .sync({ alter: true })
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Sync error:", err));

module.exports = {
  Users,
  Projects,
  Companies,
  UserProjects,
  BasePlans,
  Checklists,
  Plans,
  Reports,
  SDS,
  AssignReport,
  EntranceLog,
  // ProjectModule,
  RiskEvaluation,
  sequelize,
  MeetingDetails,
  AgendaItem,
  Attachment,
};
