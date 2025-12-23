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
      ...createYesNoNaInput("Hot work permit issued and signed"),
      ...createYesNoNaInput(
        "HSE plan updated with specific measures for hot work"
      ),
      ...createYesNoNaInput(
        "Fire extinguishing equipment available and functional"
      ),
      ...createYesNoNaInput(
        "PPE available (fire-resistant clothing, gloves, safety glasses)"
      ),
      ...createYesNoNaInput(
        "Emergency equipment (first aid kits) placed strategically"
      ),
      ...createYesNoNaInput("Combustible materials removed or shielded"),
      ...createYesNoNaInput("Emergency exits marked and free from obstacles"),
      ...createYesNoNaInput("Adequate ventilation provided"),
      ...createYesNoNaInput(
        "Assessment of nearby combustible structures completed"
      ),
      ...createYesNoNaInput("Potential ignition sources controlled"),
      ...createYesNoNaInput("Area checked for explosive atmosphere"),
      ...createYesNoNaInput(
        "Employees informed about emergency procedures and escape routes"
      ),
    ],
  },
  {
    title: "Execution of Work",
    inputs: [
      ...createYesNoNaInput("Fire watch present during entire operation"),
      ...createYesNoNaInput(
        "Continuous monitoring of temperature in work area"
      ),
      ...createYesNoNaInput("Minimization of sparks using shielding"),
      ...createYesNoNaInput(
        "Fire watch kept for at least 30 minutes after completion"
      ),
      ...createYesNoNaInput(
        "Work area inspected and approved safe before leaving"
      ),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        "Fire in nearby area – Medium/Critical → High",
        "Fire in nearby area"
      ),
      createPendingDoneInput(
        "Explosion due to flammable gases/vapors – Low/Critical → Medium",
        "Explosion hazard"
      ),
      createPendingDoneInput(
        "Burns to workers – Medium/Serious → High",
        "Burns to workers"
      ),
      createPendingDoneInput(
        "Inhalation of fumes – Medium/Serious → High",
        "Inhalation of fumes"
      ),
      createPendingDoneInput(
        "Damage to nearby equipment – Low/Serious → Medium",
        "Damage to equipment"
      ),
    ],
  },
];

export const hotWork: LinkType = {
  text: "Hot Work – Industrial Environments",
  href: "/safety-tools/checklists/hot-work",
  addHref: "/safety-tools/checklists/hot-work/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Hot Work Checklist",
      desc: "Checklist for hot work in industrial environments, covering permits, PPE, fire watch, and risk assessment.",
      href: "/safety-tools/checklists/hot-work/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/hot-work",
    },
  ],
};
