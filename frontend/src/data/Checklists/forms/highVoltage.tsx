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
    title: "Pre-Work Requirements",
    inputs: [
      ...createYesNoNaInput("Power source switched off and locked/tagged"),
      ...createYesNoNaInput(
        "Work area demarcated to prevent unauthorized access"
      ),
      ...createYesNoNaInput(
        "Test equipment available to confirm absence of voltage"
      ),
      ...createYesNoNaInput("Insulating gloves and boots available"),
      ...createYesNoNaInput("Face shield available"),
      ...createYesNoNaInput("Flame-resistant clothing available"),
      ...createYesNoNaInput("Workers trained in high-voltage safety"),
      ...createYesNoNaInput("Security plan reviewed and shared"),
    ],
  },
  {
    title: "During Work",
    inputs: [
      ...createYesNoNaInput("Maintain safe distance from high voltage lines"),
      ...createYesNoNaInput("Use grounding equipment where necessary"),
      ...createYesNoNaInput("Verify continuous absence of voltage"),
      ...createYesNoNaInput("Designated safety guard monitoring work"),
      ...createYesNoNaInput("Continuous communication with team"),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        "Exposure to high voltage – High/Critical → Very High",
        "Exposure to high voltage"
      ),
      createPendingDoneInput(
        "Arc flash hazard – Medium/Critical → High",
        "Arc flash hazard"
      ),
      createPendingDoneInput(
        "Unauthorized access – Medium/Serious → Medium",
        "Unauthorized access"
      ),
      createPendingDoneInput(
        "Lock/tag error – Low/Critical → Medium",
        "Lock/tag error"
      ),
      createPendingDoneInput(
        "Equipment failure – Low/Serious → Low",
        "Equipment failure"
      ),
    ],
  },
];

export const highVoltage: LinkType = {
  text: "Working Near High Voltage",
  href: "/safety-tools/checklists/high-voltage",
  addHref: "/safety-tools/checklists/high-voltage/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add High Voltage Checklist",
      desc: "Checklist for safe work near high voltage equipment, covering PPE, lockout-tagout, and risk assessment.",
      href: "/safety-tools/checklists/high-voltage/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/high-voltage",
    },
  ],
};
