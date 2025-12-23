import { Input, LinkType } from "../../../types/Sidebar";
import {
  createYesNoNaInput,
  createPendingDoneInput,
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
        label: "Date of Blasting",
        name: "date_of_blasting",
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
    title: "Before Work",
    inputs: [
      ...createYesNoNaInput("Confirm necessary permits obtained"),
      ...createYesNoNaInput("Examine area for nearby installations"),
      ...createYesNoNaInput("Establish safety zones and signage"),
      ...createYesNoNaInput("Assess weather conditions"),
      ...createYesNoNaInput("Check blasting equipment condition"),
      ...createYesNoNaInput("Store explosives safely"),
      ...createYesNoNaInput("Ensure first aid and firefighting equipment"),
      ...createYesNoNaInput(
        "Use PPE (helmet, hearing protection, glasses, mask)"
      ),
    ],
  },
  {
    title: "During Work",
    inputs: [
      ...createYesNoNaInput("Keep unauthorized personnel out of zone"),
      ...createYesNoNaInput("Communicate blasting times to neighbors"),
      ...createYesNoNaInput("Follow manufacturer instructions"),
      ...createYesNoNaInput("Ensure correct drilling and loading"),
      ...createYesNoNaInput("Perform final check before blasting"),
      ...createYesNoNaInput("Monitor vibrations and noise"),
      ...createYesNoNaInput("Inspect area after blasting"),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        <>
          Risk Factor: Ignition failure
          <br />
          Probability: Medium
          <br />
          Consequence: Critical
          <br />
          Risk Level: High
          <br />
          Mitigation: Authorized personnel, strict ignition procedures
        </>,
        "Ignition failure"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Noise exposure
          <br />
          Probability: High
          <br />
          Consequence: Serious
          <br />
          Risk Level: High
          <br />
          Mitigation: Certified hearing protection
        </>,
        "Noise exposure"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Flying debris
          <br />
          Probability: Medium
          <br />
          Consequence: Critical
          <br />
          Risk Level: High
          <br />
          Mitigation: Safety zones, protective barriers
        </>,
        "Flying debris"
      ),
    ],
  },
];

export const rockBlasting: LinkType = {
  text: "Rock Blasting in Construction",
  href: "/safety-tools/checklists/rock-blasting",
  addHref: "/safety-tools/checklists/rock-blasting/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Rock Blasting in Construction",
      desc: "Checklist for blasting safety including permits, equipment, and risk assessment.",
      href: "/safety-tools/checklists/rock-blasting/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/rock-blasting",
    },
  ],
};
