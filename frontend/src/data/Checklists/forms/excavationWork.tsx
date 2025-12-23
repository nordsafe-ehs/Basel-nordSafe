// forms/excavationWork.ts
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
      ...createYesNoNaInput("Examine the site for underground infrastructure"),
      ...createYesNoNaInput("Obtain necessary permits from local authorities"),
      ...createYesNoNaInput("Mark excavation area clearly and set up barriers"),
      ...createYesNoNaInput("Conduct soil stability assessment"),
      ...createYesNoNaInput("Assess weather conditions"),
      ...createYesNoNaInput("Ensure workers wear helmets, vests, boots"),
      ...createYesNoNaInput("Wear gloves and dust mask if needed"),
      ...createYesNoNaInput("Ensure warning signal equipment is available"),
    ],
  },
  {
    title: "During Work",
    inputs: [
      ...createYesNoNaInput("Follow established boundaries of digging area"),
      ...createYesNoNaInput("Use safe excavation techniques to avoid collapse"),
      ...createYesNoNaInput("Continuously check excavation for hazards"),
      ...createYesNoNaInput("Ensure communication between operators and crew"),
      ...createYesNoNaInput("Confirm excavation area is secured"),
      ...createYesNoNaInput("Perform inspection to avoid accidental damage"),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        <>
          Risk Factor: Soil collapse / trench collapse
          <br />
          Probability: Medium
          <br />
          Consequence: Very High
          <br />
          Risk Level: High
          <br />
          Mitigation: Shoring, slope protection, daily checks
        </>,
        "Soil collapse"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Landslides
          <br />
          Probability: Medium
          <br />
          Consequence: High
          <br />
          Risk Level: High
          <br />
          Mitigation: Soil assessment, restrict work during heavy rain
        </>,
        "Landslides"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Contact with underground utilities
          <br />
          Probability: Low
          <br />
          Consequence: Very High
          <br />
          Risk Level: High
          <br />
          Mitigation: Pre-excavation surveys, safe digging
        </>,
        "Underground utilities"
      ),
      // ... باقي المخاطر بنفس النمط
    ],
  },
];

export const excavationWork: LinkType = {
  text: "Excavation on Construction Site",
  href: "/safety-tools/checklists/excavation-work",
  addHref: "/safety-tools/checklists/excavation-work/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Excavation on Construction Site",
      desc: "Checklist for excavation safety including soil stability, underground utilities, and risk assessment.",
      href: "/safety-tools/checklists/excavation-work/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/excavation-work",
    },
  ],
};
