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
    title: "Pre-Work Checklist",
    inputs: [
      ...createYesNoNaInput(
        "Electrical equipment inspected and in good condition"
      ),
      ...createYesNoNaInput("Safety zones established with warning signs"),
      ...createYesNoNaInput("Existing systems examined for hazards"),
      ...createYesNoNaInput("Workers wear insulating gloves and boots"),
      ...createYesNoNaInput("Safety glasses available"),
      ...createYesNoNaInput("Fire-resistant clothing available"),
      ...createYesNoNaInput("Workers trained in emergency procedures"),
      ...createYesNoNaInput("Communication network established"),
    ],
  },
  {
    title: "During Work",
    inputs: [
      ...createYesNoNaInput("Power off and lockout-tagout applied"),
      ...createYesNoNaInput("Work at safe distance from live wires"),
      ...createYesNoNaInput("Monitor grounding and insulation continuously"),
      ...createYesNoNaInput("Two-person rule applied for critical work"),
      ...createYesNoNaInput("Avoid wet/damp conditions"),
      ...createYesNoNaInput("First aid and AED available"),
      ...createYesNoNaInput("Confirm safe power restoration"),
      ...createYesNoNaInput("Inspect area for hazards before leaving"),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        "Power surge – High probability / Critical consequence → High risk",
        "Power surge"
      ),
      createPendingDoneInput(
        "Arc flash – Medium probability / Serious consequence → Medium risk",
        "Arc flash"
      ),
      createPendingDoneInput(
        "Fire – Low probability / Critical consequence → Medium risk",
        "Fire"
      ),
      createPendingDoneInput(
        "Equipment failure – Medium probability / Moderate consequence → Low risk",
        "Equipment failure"
      ),
      createPendingDoneInput(
        "Electric shock – Medium probability / Critical consequence → High risk",
        "Electric shock"
      ),
      createPendingDoneInput(
        "Miscommunication – Low probability / Serious consequence → Medium risk",
        "Miscommunication"
      ),
      createPendingDoneInput(
        "Inadequate grounding/insulation – Medium probability / Serious consequence → Medium risk",
        "Grounding insulation"
      ),
    ],
  },
];

export const electricalWork: LinkType = {
  text: "Electrical Work – Industrial/Construction Sites",
  href: "/safety-tools/checklists/electrical-work",
  addHref: "/safety-tools/checklists/electrical-work/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Electrical Work Checklist",
      desc: "Checklist for electrical work in industrial or construction sites, covering PPE, lockout-tagout, and risk assessment.",
      href: "/safety-tools/checklists/electrical-work/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/electrical-work",
    },
  ],
};
