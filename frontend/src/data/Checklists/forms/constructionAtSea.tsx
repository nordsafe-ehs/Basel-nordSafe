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
    title: "Pre-Work Checklist",
    inputs: [
      ...createYesNoNaInput("Check rescue equipment (life jackets, buoys)"),
      ...createYesNoNaInput("Check weather forecasts"),
      ...createYesNoNaInput("Ensure corrosion-resistant equipment/tools"),
      ...createYesNoNaInput("Establish emergency water rescue procedures"),
      ...createYesNoNaInput("Ensure workers wear life jackets near water"),
      ...createYesNoNaInput("Provide waterproof/windproof clothing"),
      ...createYesNoNaInput("Wear helmets and non-slip shoes"),
      ...createYesNoNaInput(
        "Establish communication network with emergency channels"
      ),
    ],
  },
  {
    title: "During Work",
    inputs: [
      ...createYesNoNaInput("Create barriers to prevent falls into water"),
      ...createYesNoNaInput("Ensure lifeboat available nearby"),
      ...createYesNoNaInput("Inspect ladders, railings regularly"),
      ...createYesNoNaInput("Avoid overloading floating platforms"),
      ...createYesNoNaInput("Secure tools to prevent falling into water"),
      ...createYesNoNaInput("Use adapted lifting devices"),
      ...createYesNoNaInput("Minimize waste/spills in water"),
      ...createYesNoNaInput("Monitor marine ecosystem impact"),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        <>
          Risk Factor: Fall into water
          <br />
          Probability: High
          <br />
          Consequence: Serious
          <br />
          Risk Level: High
          <br />
          Mitigation: Life jackets, buoys, barriers, rescue plan
        </>,
        "Fall into water"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Bad weather
          <br />
          Probability: Medium
          <br />
          Consequence: Serious
          <br />
          Risk Level: High
          <br />
          Mitigation: Monitor forecasts, provide protective clothing
        </>,
        "Bad weather"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Corrosion
          <br />
          Probability: Low
          <br />
          Consequence: Medium
          <br />
          Risk Level: Low
          <br />
          Mitigation: Use corrosion-resistant tools, inspections
        </>,
        "Corrosion"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Boat accidents
          <br />
          Probability: Low
          <br />
          Consequence: Serious
          <br />
          Risk Level: Medium
          <br />
          Mitigation: Safe boat operation training, maintain lifeboats
        </>,
        "Boat accidents"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Environmental pollution
          <br />
          Probability: Medium
          <br />
          Consequence: Serious
          <br />
          Risk Level: High
          <br />
          Mitigation: Eco-friendly products, prevent spills
        </>,
        "Environmental pollution"
      ),
    ],
  },
];

export const constructionAtSea: LinkType = {
  text: "Construction at Sea",
  href: "/safety-tools/checklists/construction-at-sea",
  addHref: "/safety-tools/checklists/construction-at-sea/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Construction at Sea",
      desc: "Checklist for maritime construction safety including rescue equipment, weather, and risk assessment.",
      href: "/safety-tools/checklists/construction-at-sea/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/construction-at-sea",
    },
  ],
};
