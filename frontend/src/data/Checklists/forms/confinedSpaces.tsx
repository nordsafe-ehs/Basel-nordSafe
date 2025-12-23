import { Input, LinkType } from "../../../types/Sidebar";
import { createPendingDoneInput, createYesNoNaInput } from "../../../utils/functions";

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
      { label: "Location", name: "location", type: "text", size: "full" },
      {
        label: "Date of Work",
        name: "date_of_work",
        type: "date",
        size: "half",
      },
      {
        label: "Duration of Work",
        name: "duration_of_work",
        type: "text",
        size: "half",
      },
      {
        label: "Responsible Manager",
        name: "responsible_manager",
        type: "text",
        size: "full",
      },
      {
        label: "Number of Workers",
        name: "number_of_workers",
        type: "text",
        size: "half",
      },
      {
        label: "Description of Work Area",
        name: "work_area_description",
        type: "textarea",
        size: "full",
      },
    ],
  },
  {
    title: "Pre-Work Requirements",
    inputs: [
      ...createYesNoNaInput(
        "Identify hazards (oxygen deficiency, toxic gases, flooding)"
      ),
      ...createYesNoNaInput("Check if special permits required"),
      ...createYesNoNaInput(
        "Ensure PPE available (helmet, respirator, harness, gloves, non-slip shoes)"
      ),
      ...createYesNoNaInput("Check ventilation equipment working"),
      ...createYesNoNaInput("Monitoring equipment available for oxygen/gases"),
      ...createYesNoNaInput("Prepare specific rescue plan"),
      ...createYesNoNaInput("Personnel trained in emergency evacuation/rescue"),
      ...createYesNoNaInput("Safe escape routes marked"),
    ],
  },
  {
    title: "During Work",
    inputs: [
      ...createYesNoNaInput("Continuous gas monitoring"),
      ...createYesNoNaInput("Maintain adequate ventilation"),
      ...createYesNoNaInput("Limit number of people inside"),
      ...createYesNoNaInput("Establish communication inside/outside"),
      ...createYesNoNaInput("Dedicated sentry outside for emergencies"),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        "Oxygen deficiency – High/Critical → High",
        "Oxygen deficiency"
      ),
      createPendingDoneInput(
        "Exposure to toxic gases – Medium/Critical → High",
        "Toxic gases"
      ),
      createPendingDoneInput(
        "Poor communication – Medium/Serious → Medium",
        "Poor communication"
      ),
      createPendingDoneInput(
        "Difficult evacuation – Low/Critical → Medium",
        "Difficult evacuation"
      ),
      createPendingDoneInput(
        "Overcrowding – Medium/Serious → Medium",
        "Overcrowding"
      ),
      createPendingDoneInput(
        "Equipment failure – Low/Critical → Medium",
        "Equipment failure"
      ),
    ],
  },
];

export const confinedSpaces: LinkType = {
  text: "Working in Confined Spaces",
  href: "/safety-tools/checklists/confined-spaces",
  addHref: "/safety-tools/checklists/confined-spaces/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Confined Spaces Checklist",
      desc: "Checklist for safe work in confined spaces, covering hazards, PPE, communication, and risk assessment.",
      href: "/safety-tools/checklists/confined-spaces/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/confined-spaces",
    },
  ],
};
