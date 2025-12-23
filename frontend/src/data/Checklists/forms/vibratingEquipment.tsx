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
      ...createYesNoNaInput("All vibrating equipment inspected before use"),
      ...createYesNoNaInput("Vibration level assessed and documented"),
      ...createYesNoNaInput(
        "Use of equipment that reduces vibration prioritized"
      ),
      ...createYesNoNaInput("Workers have vibration-damping gloves"),
      ...createYesNoNaInput("Hearing protection available"),
      ...createYesNoNaInput("Work shoes to minimize vibration transmission"),
      ...createYesNoNaInput("Emergency procedures reviewed"),
    ],
  },
  {
    title: "During Work",
    inputs: [
      ...createYesNoNaInput(
        "Limit continuous use (breaks every 20–30 minutes)"
      ),
      ...createYesNoNaInput("Work carried out in ergonomic environment"),
      ...createYesNoNaInput("Report deviations from normal vibration levels"),
      ...createYesNoNaInput("Equipment inspected and maintained after use"),
      ...createYesNoNaInput(
        "Workers’ health checked for vibration-related injuries"
      ),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        "Hand-arm vibration syndrome – Medium/Serious → High",
        "HAVS"
      ),
      createPendingDoneInput(
        "Musculoskeletal injuries – Medium/Medium → Medium",
        "Musculoskeletal injuries"
      ),
      createPendingDoneInput(
        "Hearing damage – Medium/Serious → High",
        "Hearing damage"
      ),
      createPendingDoneInput(
        "Equipment malfunction – Low/Serious → Medium",
        "Equipment malfunction"
      ),
      createPendingDoneInput(
        "Slips/trips/falls – Low/Medium → Low",
        "Slips trips falls"
      ),
    ],
  },
];

export const vibratingEquipment: LinkType = {
  text: "Handling Vibrating Equipment",
  href: "/safety-tools/checklists/vibrating-equipment",
  addHref: "/safety-tools/checklists/vibrating-equipment/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Vibrating Equipment Checklist",
      desc: "Checklist for safe handling of vibrating equipment, covering PPE, breaks, and risk assessment.",
      href: "/safety-tools/checklists/vibrating-equipment/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/vibrating-equipment",
    },
  ],
};
