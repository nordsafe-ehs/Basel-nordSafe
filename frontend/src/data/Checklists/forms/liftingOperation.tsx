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
    title: "Pre-Operation Checklist",
    inputs: [
      ...createYesNoNaInput("Lifting plan prepared and reviewed"),
      ...createYesNoNaInput("Required permits obtained"),
      ...createYesNoNaInput("Equipment certifications verified"),
      ...createYesNoNaInput("Operator and riggers certified"),
      ...createYesNoNaInput("Toolbox meeting conducted"),
      ...createYesNoNaInput("Emergency response plan reviewed"),
      ...createYesNoNaInput("Crane inspected for defects"),
      ...createYesNoNaInput("Slings/shackles inspected"),
      ...createYesNoNaInput("Load weight confirmed within crane ability"),
      ...createYesNoNaInput("Communication devices functional"),
    ],
  },
  {
    title: "Execution Checklist",
    inputs: [
      ...createYesNoNaInput("Lift supervisor present"),
      ...createYesNoNaInput("Load chart referred to every lift"),
      ...createYesNoNaInput("Spotters in place"),
      ...createYesNoNaInput("Communication signals followed"),
      ...createYesNoNaInput("Emergency stop procedures rehearsed"),
      ...createYesNoNaInput("PPE worn by all personnel"),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        <>
          Risk Factor: Equipment malfunction
          <br />
          Probability: Medium
          <br />
          Consequence: Critical
          <br />
          Risk Level: High
          <br />
          Mitigation: Thorough inspections, valid certifications
        </>,
        "Equipment malfunction"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Overloading crane
          <br />
          Probability: Low
          <br />
          Consequence: Critical
          <br />
          Risk Level: Medium
          <br />
          Mitigation: Confirm load weight, use load charts
        </>,
        "Overloading crane"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Poor ground conditions
          <br />
          Probability: Medium
          <br />
          Consequence: Serious
          <br />
          Risk Level: High
          <br />
          Mitigation: Verify ground stability, use mats/support
        </>,
        "Poor ground conditions"
      ),
    ],
  },
];

export const liftingOperation: LinkType = {
  text: "Lifting Operation",
  href: "/safety-tools/checklists/lifting-operation",
  addHref: "/safety-tools/checklists/lifting-operation/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Lifting Operation",
      desc: "Checklist for lifting safety including crane inspection, load charts, and risk assessment.",
      href: "/safety-tools/checklists/lifting-operation/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/lifting-operation",
    },
  ],
};
