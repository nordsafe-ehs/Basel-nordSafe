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
        "Ventilation equipment and dust collectors installed and functioning"
      ),
      ...createYesNoNaInput("Air quality evaluated for particle levels"),
      ...createYesNoNaInput("Work area delimited to reduce dust spread"),
      ...createYesNoNaInput("Respiratory protection (P3 filter) in use"),
      ...createYesNoNaInput("Safety glasses or face shield available"),
      ...createYesNoNaInput("Gloves and covering clothing used"),
      ...createYesNoNaInput("Workers trained in dust exposure risks"),
    ],
  },
  {
    title: "During Work",
    inputs: [
      ...createYesNoNaInput(
        "Minimize dust-generating activities (wet methods)"
      ),
      ...createYesNoNaInput("Ensure continuous ventilation"),
      ...createYesNoNaInput("Restrict access to dusty areas"),
      ...createYesNoNaInput("Regular monitoring of dust levels"),
      ...createYesNoNaInput("Remove dust using industrial vacuum cleaners"),
      ...createYesNoNaInput("Thoroughly clean work area"),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        "Exposure to fine dust – High/Serious → High",
        "Exposure to fine dust"
      ),
      createPendingDoneInput(
        "Reduced visibility – Medium/Serious → High",
        "Reduced visibility"
      ),
      createPendingDoneInput(
        "Explosion hazard – Low/Critical → Medium",
        "Explosion hazard"
      ),
      createPendingDoneInput(
        "Health risks from prolonged exposure – Medium/Serious → Medium",
        "Health risks"
      ),
    ],
  },
];

export const dustHandling: LinkType = {
  text: "Managing Dust in Industrial/Construction Sites",
  href: "/safety-tools/checklists/dust-handling",
  addHref: "/safety-tools/checklists/dust-handling/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Dust Handling Checklist",
      desc: "Checklist for managing dust in industrial or construction sites, covering PPE, ventilation, and risk assessment.",
      href: "/safety-tools/checklists/dust-handling/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/dust-handling",
    },
  ],
};
