
import { Input, LinkType } from "../../../types/Sidebar";
import {
  createPendingDoneInput,
  createYesNoNaInput,
} from "../../../utils/functions";
const inputs: Input[] = [
  {
    title: "General Information",
    inputs: [
      {
        label: "Project Name",
        name: "project_name",
        type: "text",
        size: "full",
      },
      {
        label: "Site Location",
        name: "site_location",
        type: "text",
        size: "full",
      },
      {
        label: "Operation Date",
        name: "operation_date",
        type: "date",
        size: "half",
      },
      {
        label: "Person Responsible",
        name: "responsible_person",
        type: "text",
        size: "half",
      },
      {
        label: "Team Members",
        name: "team_members",
        type: "textarea",
        size: "full",
      },
      {
        label: "Chemical(s) Managed",
        name: "chemicals_managed",
        type: "text",
        size: "full",
      },
    ],
  },
  {
    title: "Pre-Task Checklist",
    inputs: [
      ...createYesNoNaInput(
        "Safety Data Sheets (SDS) are available and reviewed"
      ),
      ...createYesNoNaInput("Necessary permits and approvals obtained"),
      ...createYesNoNaInput(
        "Emergency contact details and procedures available"
      ),
      ...createYesNoNaInput(
        "Workers trained in handling hazardous chemicals and spill response"
      ),
      ...createYesNoNaInput(
        "Toolbox talk conducted on chemical-specific hazards"
      ),
      ...createYesNoNaInput(
        "Emergency response roles and responsibilities assigned"
      ),
      ...createYesNoNaInput(
        "PPE available and suitable (gloves, goggles, respirators)"
      ),
      ...createYesNoNaInput("Spill kits and neutralizing agents accessible"),
      ...createYesNoNaInput("Ventilation and extraction systems operational"),
    ],
  },
  {
    title: "Site-Specific Risk Assessment",
    inputs: [
      ...createYesNoNaInput(
        "Work area ventilated and free from ignition sources"
      ),
      ...createYesNoNaInput("Segregation of incompatible materials"),
      ...createYesNoNaInput("Emergency exits and eyewash stations marked"),
      ...createYesNoNaInput("Hazard classification of chemicals identified"),
      ...createYesNoNaInput("Proper labeling and storage of containers"),
      ...createYesNoNaInput("Decanting and mixing procedures reviewed"),
      ...createYesNoNaInput("Exposure risks assessed"),
      ...createYesNoNaInput("Environmental risks evaluated"),
    ],
  },
  {
    title: "Task Execution Checklist",
    inputs: [
      ...createYesNoNaInput("Supervisor present during chemical handling"),
      ...createYesNoNaInput("Containers checked for leaks or damage"),
      ...createYesNoNaInput("Safe transfer and handling procedures followed"),
      ...createYesNoNaInput("Spill containment measures in place"),
      ...createYesNoNaInput("PPE worn by all personnel"),
      ...createYesNoNaInput("Equipment cleaned and stored properly"),
      ...createYesNoNaInput("Chemical waste disposed according to regulations"),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        "Chemical exposure (skin contact) – Medium/High → High",
        "Chemical exposure"
      ),
      createPendingDoneInput(
        "Chemical inhalation – Medium/High → High",
        "Chemical inhalation"
      ),
      createPendingDoneInput(
        "Spills and leaks – Medium/High → High",
        "Spills and leaks"
      ),
      createPendingDoneInput(
        "Fire/explosion – Low/Very High → High",
        "Fire explosion"
      ),
      createPendingDoneInput(
        "Mixing incompatible chemicals – Low/High → Medium",
        "Mixing incompatible"
      ),
      createPendingDoneInput(
        "Environmental contamination – Low/Medium → Low",
        "Environmental contamination"
      ),
      createPendingDoneInput(
        "Equipment malfunction – Low/Medium → Low",
        "Equipment malfunction"
      ),
      createPendingDoneInput(
        "Slips/trips/falls – Low/Medium → Low",
        "Slips trips falls"
      ),
    ],
  },
];

export const hazardousChemicals: LinkType = {
  text: "Handling Hazardous Chemicals",
  href: "/safety-tools/checklists/hazardous-chemicals",
  addHref: "/safety-tools/checklists/hazardous-chemicals/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Hazardous Chemicals Checklist",
      desc: "Checklist for safe handling of hazardous chemicals including SDS, PPE, and risk assessment.",
      href: "/safety-tools/checklists/hazardous-chemicals/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/hazardous-chemicals",
    },
  ],
};
