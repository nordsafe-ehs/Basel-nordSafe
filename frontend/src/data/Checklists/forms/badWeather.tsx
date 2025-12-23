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
    title: "Checklist Before Starting Work",
    inputs: [
      ...createYesNoNaInput(
        "Weather forecast checked and updated for the entire working day"
      ),
      ...createYesNoNaInput(
        "Specific risks identified (flooding, falling materials)"
      ),
      ...createYesNoNaInput("Area inspected and secured against flooding"),
      ...createYesNoNaInput(
        "Tools and machinery secured and protected against water damage"
      ),
      ...createYesNoNaInput(
        "Temporary structures (scaffolding, cranes) rated for wind resistance"
      ),
      ...createYesNoNaInput(
        "Rainproof and windproof clothing available to all workers"
      ),
      ...createYesNoNaInput("Non-slip boots and gloves provided"),
      ...createYesNoNaInput(
        "Helmets with extra fasteners to prevent blowing off"
      ),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        "Slippery surfaces – High probability / Serious consequence → High risk. Mitigation: non-slip boots, anti-slip mats, grit on walkways",
        "Slippery surfaces"
      ),
      createPendingDoneInput(
        "Falling objects – Medium probability / Critical consequence → High risk. Mitigation: secure loose materials, tools, equipment",
        "Falling objects"
      ),
      createPendingDoneInput(
        "Reduced visibility – Medium probability / Serious consequence → Medium risk. Mitigation: reflective vests, weatherproof lighting, signalers",
        "Reduced visibility"
      ),
      createPendingDoneInput(
        "Electrical hazards – Low probability / Critical consequence → Medium risk. Mitigation: protect electrical tools and cables from water ingress",
        "Electrical hazards"
      ),
      createPendingDoneInput(
        "Wind damage to structures – Low probability / Serious consequence → Low risk. Mitigation: inspect scaffolding/cranes for wind rating",
        "Wind damage to structures"
      ),
    ],
  },
];

export const badWeather: LinkType = {
  text: "Working in Bad Weather (Rain/Wind)",
  href: "/safety-tools/checklists/bad-weather",
  addHref: "/safety-tools/checklists/bad-weather/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Bad Weather Checklist",
      desc: "Checklist for construction safety in bad weather conditions including rain, wind, and risk assessment.",
      href: "/safety-tools/checklists/bad-weather/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/bad-weather",
    },
  ],
};
