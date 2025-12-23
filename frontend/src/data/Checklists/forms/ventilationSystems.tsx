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
        label: "Building Type",
        name: "building_type",
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
        label: "Responsible Person",
        name: "responsible_person",
        type: "text",
        size: "half",
      },
      {
        label: "Participants",
        name: "participants",
        type: "textarea",
        size: "full",
      },
    ],
  },
  {
    title: "Pre-Work Checklist",
    inputs: [
      ...createYesNoNaInput(
        "Ventilation equipment inspected for damage or defects"
      ),
      ...createYesNoNaInput("Work area secure and clear of obstacles"),
      ...createYesNoNaInput(
        "Ladders, scaffolding, lifting equipment inspected and in good condition"
      ),
      ...createYesNoNaInput(
        "Helmets, safety glasses, and gloves available and in use"
      ),
      ...createYesNoNaInput(
        "Respiratory protection available against dust, mold, or chemicals"
      ),
      ...createYesNoNaInput(
        "Non-slip shoes provided for working at heights or slippery surfaces"
      ),
      ...createYesNoNaInput(
        "Workers trained in equipment use and ventilation hazards"
      ),
      ...createYesNoNaInput(
        "Communication systems evaluated for confined spaces"
      ),
    ],
  },
  {
    title: "During Work",
    inputs: [
      ...createYesNoNaInput("Adequate ventilation ensured during maintenance"),
      ...createYesNoNaInput(
        "Avoid working in confined spaces without permission and supervision"
      ),
      ...createYesNoNaInput(
        "Follow safety procedures for handling chemicals or dust"
      ),
      ...createYesNoNaInput("Continuous monitoring of air quality"),
      ...createYesNoNaInput(
        "Regular communication with team via radios or other means"
      ),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        "Exposure to dust/mold – Medium probability / Serious consequence → High risk. Mitigation: certified respiratory protection, proper ventilation",
        "Exposure to dust/mold"
      ),
      createPendingDoneInput(
        "Fall from heights – Medium probability / Critical consequence → High risk. Mitigation: secure ladders/scaffolding, full fall protection",
        "Fall from heights"
      ),
      createPendingDoneInput(
        "Working in confined spaces – Low probability / Critical consequence → Medium risk. Mitigation: work permit, monitoring, trained standby personnel",
        "Working in confined spaces"
      ),
      createPendingDoneInput(
        "Contact with hazardous chemicals – Low probability / Serious consequence → Medium risk. Mitigation: chemical-resistant PPE, review SDS",
        "Contact with hazardous chemicals"
      ),
      createPendingDoneInput(
        "Electrical hazards – Low probability / Critical consequence → Medium risk. Mitigation: isolate and lockout power supply, verify absence of voltage",
        "Electrical hazards"
      ),
    ],
  },
];

export const ventilationSystems: LinkType = {
  text: "Ventilation Systems – Inspection & Maintenance",
  href: "/safety-tools/checklists/ventilation-systems",
  addHref: "/safety-tools/checklists/ventilation-systems/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Ventilation Systems Checklist",
      desc: "Checklist for inspection and maintenance of ventilation systems, covering PPE, confined spaces, and risk assessment.",
      href: "/safety-tools/checklists/ventilation-systems/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/ventilation-systems",
    },
  ],
};
