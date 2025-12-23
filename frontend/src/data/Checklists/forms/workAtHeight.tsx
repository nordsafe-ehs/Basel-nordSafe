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
    title: "Pre-Work Requirements",
    inputs: [
      ...createYesNoNaInput("Perform detailed risk assessment"),
      ...createYesNoNaInput("Ensure necessary permits in place"),
      ...createYesNoNaInput("Plan work considering weather conditions"),
      ...createYesNoNaInput("Check ladders, scaffolding, lifting equipment"),
      ...createYesNoNaInput("Ensure scaffolding/platforms certified"),
      ...createYesNoNaInput("Check fall prevention systems"),
      ...createYesNoNaInput("Mark areas where work at height occurs"),
      ...createYesNoNaInput("Ensure safe access routes"),
      ...createYesNoNaInput("Communicate safety zones to personnel"),
    ],
  },
  {
    title: "During Work",
    inputs: [
      ...createYesNoNaInput("Wear PPE (helmet, harness, safety shoes)"),
      ...createYesNoNaInput("Secure tools to avoid falling objects"),
      ...createYesNoNaInput("Maintain three-point contact on ladders"),
      ...createYesNoNaInput("Maintain communication between workers"),
      ...createYesNoNaInput("Ensure rescue plans and equipment available"),
      ...createYesNoNaInput("Have trained rescue personnel on site"),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        <>
          Risk Factor: Fall from height
          <br />
          Probability: High
          <br />
          Consequence: Critical
          <br />
          Risk Level: Very High
          <br />
          Mitigation: Full fall protection, secure scaffolding
        </>,
        "Fall from height"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Falling objects
          <br />
          Probability: Medium
          <br />
          Consequence: Serious
          <br />
          Risk Level: High
          <br />
          Mitigation: Tool lanyards, helmets, debris nets
        </>,
        "Falling objects"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Bad weather
          <br />
          Probability: Low
          <br />
          Consequence: Moderate
          <br />
          Risk Level: Low
          <br />
          Mitigation: Postpone work during unsafe conditions
        </>,
        "Bad weather"
      ),
    ],
  },
];

export const workAtHeight: LinkType = {
  text: "Work at Height",
  href: "/safety-tools/checklists/work-at-height",
  addHref: "/safety-tools/checklists/work-at-height/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Work at Height",
      desc: "Checklist for safe work at height including fall prevention and rescue plans.",
      href: "/safety-tools/checklists/work-at-height/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/work-at-height",
    },
  ],
};
