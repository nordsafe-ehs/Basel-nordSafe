import {
  AccessTime,
  ApartmentRounded,
  AssessmentRounded,
  ConstructionRounded,
  GroupRounded,
  HomeRounded,
  InsertDriveFileRounded,
  People,
  ReceiptLongRounded,
  RemoveRedEyeRounded,
  ReportProblemRounded,
  SaveRounded,
  SearchRounded,
  YouTube,
} from "@mui/icons-material";
import SettingsLayout from "../layouts/SettingsLayout";
import Chart from "../pages/Chart";
import Checklists from "../pages/Checklists";
import QRReader from "../pages/QRReader";
import SDSSearch from "../pages/SDSSearch";
import Soon from "../pages/Soon";
import Subscription from "../pages/Subscription";
import Videos from "../pages/Videos";
import { LinkType } from "../types/Sidebar";
import { checklists } from "./Checklists";
import { entranceLogColumns } from "./EntranceLog/columns";
import { hazardColumns } from "./Hazard/columns";
import { hazardInputs } from "./Hazard/inputs";
import { incidentColumns } from "./Incidents/columns";
import { incidentsInputs } from "./Incidents/inputs";
import { projectsActions } from "./Projects/actions";
import { projectsColumns } from "./Projects/columns";
import { projectsInputs } from "./Projects/inputs";
import { SDSActions } from "./SDS/actions";
import { SDSColumns } from "./SDS/columns";
import { siteMonitoringColumns } from "./SiteMonitoring/columns";
import { siteMonitoringInputs } from "./SiteMonitoring/inputs";
import { usersActions } from "./Users/actions";
import { usersInputs } from "./Users/inputs";
import { riskInputs } from "./RiskAssesment/inputs";
import { riskColumns } from "./RiskAssesment/column";
import RiskAssessment from "../components/RiskAssessment";
import MeetingTable from "../pages/MeetingTable";
import { meetingInputs } from "./Metting/Inputs";
// import MeetingForm from "../components/MeetingForm";
// import MettingsTabs from "../components/MettingsTabs";
// import SessionDetailsForm from "../components/SeasionDetails";
import TabsSection from "../components/MettingsTabs";
import EquipmentControl from "../pages/EquipmentControl";
import { equipmentControls } from "./EquipmentControl";
//import { sjaChecklist } from "./SjaChecklist/forms/JsaInput";
import { JsaController } from "./SjaChecklist";
import { ToolboxController } from "./Toolbox";
import BasicTabsRiskAssesment from "../components/TabsRisk";
import SafetyToolsLayout from "../components/SafetyToolsLayout";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ParticipantsTable from "../components/ParticipantTable";
import MeetingList from "./Metting/column";

export const links: LinkType[] = [
  {
    text: "Home",
    href: "/",
    type: "home",
    icon: <HomeRounded />,
  },

  {
    text: "Company settings",
    href: "/company-settings",
    type: "links",
    hideOnSidebar: true,
    layout: SettingsLayout,
    //permissions: ["admin", "super-admin"],
    links: [
      {
        text: "Projects",
        href: "/company-settings/projects",
        layout: SettingsLayout,
        type: "list",
        endpoint: "projects",
        columns: projectsColumns,
        actions: projectsActions,
        inputs: projectsInputs,
        addHref: "/company-settings/projects/add",
        dataGridCustomProps: {
          rowHeight: 70,
        },
        icon: <ApartmentRounded />,
        links: [
          {
            layout: SettingsLayout,
            text: "Add a new project",
            href: "/company-settings/projects/add",
            type: "form",
            endpoint: "projects",
            inputs: projectsInputs,
            listHref: "/company-settings/projects",
            hideOnSidebar: true,
          },
        ],
      },
      {
        //permissions: ["super-admin"],
        text: "Users",
        href: "/company-settings/users",
        layout: SettingsLayout,
        type: "list",
        endpoint: "users",
        actions: usersActions,
        inputs: usersInputs,
        addHref: "/company-settings/users/add",
        icon: <GroupRounded />,
        links: [
          {
            //permissions: ["super-admin"],
            text: "Add a new user",
            href: "/company-settings/users/add",
            type: "form",
            layout: SettingsLayout,
            endpoint: "users",
            inputs: usersInputs,
            listHref: "/company-settings/users",
            hideOnSidebar: true,
          },
        ],
      },
      {
        text: "Subscription",
        href: "/company-settings/subscription",
        type: "custom",
        icon: <ReceiptLongRounded />,
        component: <Subscription />,
        layout: SettingsLayout,
        //permissions: ["super-admin"],
      },
    ],
  },
  {
    text: "Deviations",
    desc: "This module covers both unsafe behaviors and unsafe conditions — including hazards — that deviate from expected safety standards. Employees can easily report any deviation they observe in the field, whether it’s a behavior, an equipment failure, or a hazardous situation.",
    features: [
      "Mobile-friendly and user-friendly reporting interface.",
      "Covers behavioral, procedural, and physical deviations (hazards).",
      "Attach images, notes, and categorize by severity.",
      "Instant notifications and workflow for corrective actions.",
      "Analytics dashboard to track trends and recurring issues.",
    ],
    href: "/deviations",
    type: "list",
    inputs: hazardInputs,
    columns: hazardColumns,
    addHref: "/deviations/report",
    viewLink: (id) => `/deviations/${id}`,
    editLink: (id) => `/deviations/report/${id}`,
    icon: <ReportProblemRounded />,
    links: [
      {
        text: "Report a deviation",
        type: "form",
        href: "/deviations/report",
        inputs: hazardInputs,
        listHref: "/deviations",
        hideOnSidebar: true,
      },
      {
        text: (id) => `View deviation (Id: ${id})`,
        type: "view",
        href: "/deviations/:id",
        inputs: hazardInputs,
        listHref: "/deviations",
        hideOnSidebar: true,
      },
      {
        text: (id) => `Edit deviation (Id: ${id})`,
        type: "edit",
        href: "/deviations/report/:id",
        inputs: hazardInputs,
        listHref: "/deviations",
        hideOnSidebar: true,
      },
    ],
  },
  {
    text: "Risk Assessment",
    href: "/risk-assessment",
    type: "custom",
    icon: <AssessmentRounded />,
    component: <ParticipantsTable />,
    inputs: riskInputs,
    columns: riskColumns,

    addHref: "/risk-assessment/evaluate",
    viewLink: (id) => `/risk-assessment/${id}`,
    editLink: (id) => `/risk-assessment/evaluate/${id}`,

    desc: "Nordsafe Risk Assessment helps identify, evaluate, and control workplace risks.Easily document hazards and assign corrective actions. Prioritize risks using clear scoring and ranking methods.Ensure compliance with industry standards and regulations.Make better decisions with data - driven risk insights.",
    features: [
      "Hazard identification and documentation",
      "Risk scoring and prioritization",
      "Customizable assessment templates",
      "Assign actions and track completion",
      "Reporting and trend analysis",
    ],

    links: [
      {
        text: "Evaluate Risk",
        type: "custom",
        href: "/risk-assessment/evaluate",
        component: <BasicTabsRiskAssesment />,
        hideOnSidebar: true,
      },
    ],
  },
  {
    text: "Cases Investigations",
    desc: "Enables structured reporting and investigation of any incident, including injuries, near-misses, and equipment damage. The system guides users step-by-step to ensure accurate documentation and effective root cause analysis.",
    features: [
      "Structured forms for incident types.",
      "Root cause analysis tools (e.g., 5 Whys, fishbone).",
      "Corrective and preventive action tracking.",
      "Automatic reporting with export options.",
    ],
    href: "/case-investigations",
    type: "list",
    inputs: incidentsInputs,
    columns: incidentColumns,
    addHref: "/case-investigations/report",
    viewLink: (id) => `/case-investigations/${id}`,
    editLink: (id) => `/case-investigations/report/${id}`,
    icon: <SearchRounded />,
    links: [
      {
        text: "Report a case",
        type: "form",
        href: "/case-investigations/report",
        inputs: incidentsInputs,
        listHref: "/case-investigations",
        hideOnSidebar: true,
      },
      {
        text: (id) => `View case (Id: ${id})`,
        type: "view",
        href: "/case-investigations/:id",
        inputs: incidentsInputs,
        listHref: "/case-investigations",
        hideOnSidebar: true,
      },
      {
        text: (id) => `Edit case (Id: ${id})`,
        type: "edit",
        href: "/case-investigations/report/:id",
        inputs: incidentsInputs,
        listHref: "/case-investigations",
        hideOnSidebar: true,
      },
    ],
  },
  {
    text: "Site Monitoring",
    desc: "Supports real-time inspections to ensure ongoing safety compliance. Supervisors can perform scheduled or random inspections and assign actions on the spot.",
    features: [
      "Custom inspection checklists.",
      "Real-time findings with photos ",
      "Assign corrective actions directly.",
      "Trend analysis and KPI dashboard.",
    ],
    href: "/site-monitoring",
    type: "list",
    inputs: siteMonitoringInputs,
    columns: siteMonitoringColumns,
    addHref: "/site-monitoring/report",
    viewLink: (id) => `/site-monitoring/${id}`,
    editLink: (id) => `/site-monitoring/report/${id}`,
    icon: <RemoveRedEyeRounded />,
    links: [
      {
        text: "Report a site monitoring",
        type: "form",
        href: "/site-monitoring/report",
        inputs: siteMonitoringInputs,
        listHref: "/site-monitoring",
        hideOnSidebar: true,
      },
      {
        text: (id) => `View site monitoring (Id: ${id})`,
        type: "view",
        href: "/site-monitoring/:id",
        inputs: siteMonitoringInputs,
        listHref: "/site-monitoring",
        hideOnSidebar: true,
      },
      {
        text: (id) => `Edit site monitoring (Id: ${id})`,
        type: "edit",
        href: "/site-monitoring/report/:id",
        inputs: siteMonitoringInputs,
        listHref: "/site-monitoring",
        hideOnSidebar: true,
      },
    ],
  },

  {
    text: "Safety Data Sheets (SDS)",

    href: "/sds",
    desc: "NordSafe integrates with CloudSDS to provide instant access to the latest Safety Data Sheets. All SDS are automatically updated and available in multiple languages. Search, view, and share documents with ease across your organization. Stay compliant with global standards like OSHA, GHS, and REACH. Ensure a safer workplace with centralized chemical safety data.",

    features: [
      "Automatic SDS updates in real time",
      "Multi-language SDS support",
      "Smart search by name, CAS, or manufacturer",
      "QR code access for instant retrieval",
      "Compliance with OSHA, GHS, REACH & more",
    ],
    type: "list",
    endpoint: "sds",
    columns: SDSColumns,
    actions: SDSActions,
    icon: <InsertDriveFileRounded />,
    customButton: {
      text: "Search for SDS",
      href: "/sds/search",
      icon: <SearchRounded />,
    },

    links: [
      {
        text: "Search SDS",
        href: "/sds/search",
        type: "custom",
        component: <SDSSearch />,
        //permissions: ["admin", "super-admin"],
        hideOnSidebar: true,
        customButton: {
          text: "Saved SDS",
          href: "/sds",
          icon: <SaveRounded />,
        },
      },
    ],
  },
  // {
  //   text: "Company settings",
  //   href: "/company-settings",
  //   type: "links",
  //   hideOnSidebar: true,
  //   layout: SettingsLayout,
  //   permissions: ["admin", "super-admin"],
  //   links: [
  //     {
  //       text: "Projects",
  //       href: "/company-settings/projects",
  //       layout: SettingsLayout,
  //       type: "list",
  //       endpoint: "projects",
  //       columns: projectsColumns,
  //       actions: projectsActions,
  //       inputs: projectsInputs,
  //       addHref: "/company-settings/projects/add",
  //       dataGridCustomProps: {
  //         rowHeight: 70,
  //       },
  //       icon: <ApartmentRounded />,
  //       links: [
  //         {
  //           layout: SettingsLayout,
  //           text: "Add a new project",
  //           href: "/company-settings/projects/add",
  //           type: "form",
  //           endpoint: "projects",
  //           inputs: projectsInputs,
  //           listHref: "/company-settings/projects",
  //           hideOnSidebar: true,
  //         },
  //       ],
  //     },
  //     {
  //       permissions: ["super-admin"],
  //       text: "Users",
  //       href: "/company-settings/users",
  //       layout: SettingsLayout,
  //       type: "list",
  //       endpoint: "users",
  //       actions: usersActions,
  //       inputs: usersInputs,
  //       addHref: "/company-settings/users/add",
  //       icon: <GroupRounded />,
  //       links: [
  //         {
  //           permissions: ["super-admin"],
  //           text: "Add a new user",
  //           href: "/company-settings/users/add",
  //           type: "form",
  //           layout: SettingsLayout,
  //           endpoint: "users",
  //           inputs: usersInputs,
  //           listHref: "/company-settings/users",
  //           hideOnSidebar: true,
  //         },
  //       ],
  //     },
  //     {
  //       text: "Subscription",
  //       href: "/company-settings/subscription",
  //       type: "custom",
  //       icon: <ReceiptLongRounded />,
  //       component: <Subscription />,
  //       layout: SettingsLayout,
  //       permissions: ["super-admin"],
  //     },
  //   ],
  // },
  {
    text: "Safety Tools",
    href: "/safety-tools",
    type: "links",
    desc: "Nordsafe Safety Tools empower teams to work safely and efficiently. Easily plan, track, and document daily safety activities. From pre-task checks to inspections, everything is streamlined. Stay proactive in identifying hazards before they cause incidents. All safety processes are centralized in one easy-to-use platform.",
    features: [
      "Pre-task safety checks for risk prevention",
      "Toolbox meetings with digital records",
      "Inspection planning and reporting",
      "Job Safety Analysis (JSA) templates",
      "Equipment control and monitoring",
    ],
    icon: <ConstructionRounded />,
    links: [
      {
        text: "Toolbox Meeting Checklist",
        desc: "Toolbox Meeting – Manage PPE, electrical safety, chemicals, housekeeping, emergency preparedness, and site safety.",
        href: "/safety-tools/toolbox",
        type: "custom",
        component: <Checklists />,
        hideOnSidebar: true,
        links: ToolboxController,
      },
      {
        text: "Job safety analysis",
        desc: "Sikker Jobbanalyse (SJA) – Manage project info, documentation, competence, communication, equipment, and site safety.",
        href: "/safety-tools/sja",
        type: "custom",
        component: <Checklists />, // 👈 الكومبوننت اللي يعرض الفورم/الجدول الخاص بالـ SJA
        hideOnSidebar: true,
        links: JsaController, // 👈 المصفوفة اللي فيها الـ inputs والـ forms الخاصة بالـ SJA
      },
      {
        text: "Pre-Task Checklist",
        desc: "This checklist must be completed immediately before execution and preserved as an official record of site conditions and safety measures. Once finalized and approved, it can not be altered. In the event of an incident, it will serve as a reference to confirm that all required measures were in place.",
        href: "/safety-tools/checklists",
        type: "custom",
        component: <Checklists />,
        hideOnSidebar: true,
        links: checklists,
      },

      {
        text: "Equipment Controller",
        desc: "Manage and monitor equipment inspections, control dates, and responsible persons. Ensure all tools and protective gear are checked and documented.",
        href: "/safety-tools/equipment-control",
        type: "custom",
        component: <Checklists />,
        hideOnSidebar: true,
        links: equipmentControls,
      },
    ],
  },

  {
    text: "Entrance log",
    href: "/entrance-log",
    type: "list",
    endpoint: "entrance-log",
    columns: entranceLogColumns,
    dataGridCustomProps: {
      rowHeight: 90,
    },
    hideOnSidebar: true,
    icon: <AccessTime />,
    permissions: ["admin", "super-admin"],
    desc: "Nordsafe Entrance Log provides a secure way to track site access. Automatically record employee, visitor, and contractor entries. Ensure only authorized personnel are on site at any time. Maintain a digital log for audits and compliance checks. Enhance safety with real-time visibility of who is on site.",
    showOnBottomList: true,
    features: [
      "Digital check-in/check-out system",
      "Real-time visitor and contractor logs",
      "Link entries to safety inductions and permits",
      "QR code or badge scanning for fast access",
      "Exportable reports for audits and compliance",
    ],
  },
  {
    text: "QR Reader",
    href: "/qr-reader",
    type: "custom",
    component: <QRReader />,
    hideOnSidebar: true,
    customButton: {
      text: "Back to home",
      href: "/",
      icon: <HomeRounded />,
    },
    hasNoLayout: true,
  },
  {
    text: "Safety Videos",
    href: "/safety-videos",
    type: "custom",
    component: <Videos />,
    icon: <YouTube />,
    hideOnSidebar: false,
    showOnBottomList: false,
  },
  {
    text: (type) => `Chart for ${type?.replace("-", " ")}`,
    href: "/chart/:id",
    type: "custom",
    component: <Chart />,
    hideOnSidebar: true,
  },
  {
    text: "Minutes Of Meetings",
    href: "/minutes-of-meetings",
    type: "custom",
    icon: <People />,
    //component: <MeetingTable />,
    inputs: meetingInputs,
    component: <MeetingList />,

    addHref: "/minutes-of-meetings/create",
    viewLink: (id) => `/minutes-of-meetings/${id}`,
    editLink: (id) => `/minutes-of-meetings/edit/${id}`,

    desc: "Nordsafe Minutes of Meetings helps document, track, and follow up on organizational meetings...",
    features: [
      "Structured meeting documentation",
      "Agenda and discussion tracking",
      "Action items assignment",
      "Signatures and approvals",
      "Search and reporting",
    ],

    links: [
      {
        text: "Minutes of mettings",
        type: "custom",
        href: "/minutes-of-meetings/create",
        component: <TabsSection />,
        hideOnSidebar: true,
      },
    ],
  },
  // permissions: ["admin", "secretary", "manager"],
  // meta: { category: "Documentation", order: 3 },

  // {
  //   text: "Risk Assessment",
  //   desc: "Facilitates structured evaluation of project risks by scoring likelihood and severity, calculating risk levels, and tracking mitigation actions. Designed to support proactive safety planning and compliance.",
  //   features: [
  //     "Module-based risk evaluation.",
  //     "Dynamic scoring: Likelihood × Severity.",
  //     "Visual risk level indicators (Low, Medium, High).",
  //     "Exportable reports and filtering by phase/category.",
  //   ],
  //   href: "/risk-assessment",
  //   type: "list",
  //   inputs: riskInputs,
  //   columns: riskColumns,
  //   addHref: "/risk-assessment/evaluate",
  //   viewLink: (id) => `/risk-assessment/${id}`,
  //   editLink: (id) => `/risk-assessment/evaluate/${id}`,
  //   icon: <AssessmentRounded />,
  //   links: [
  //     {
  //       text: "Evaluate Risk",
  //       type: "form",
  //       href: "/risk-assessment/evaluate",
  //       inputs: riskInputs,
  //       listHref: "/risk-assessment",
  //       hideOnSidebar: true,
  //     },
  //     {
  //       text: (id) => `View Risk (Id: ${id})`,
  //       type: "view",
  //       href: "/risk-assessment/:id",
  //       inputs: riskInputs,
  //       listHref: "/risk-assessment",
  //       hideOnSidebar: true,
  //     },
  //     {
  //       text: (id) => `Edit Risk (Id: ${id})`,
  //       type: "edit",
  //       href: "/risk-assessment/evaluate/:id",
  //       inputs: riskInputs,
  //       listHref: "/risk-assessment",
  //       hideOnSidebar: true,
  //     },
  //   ],
  // },
];
