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
    title: "Checklist Before Starting Work",
    inputs: [
      ...createYesNoNaInput("Identified heavy objects to be managed"),
      ...createYesNoNaInput(
        "Assessed necessary lifting aids (cranes, trolleys, etc.)"
      ),
      ...createYesNoNaInput("Planned workflow to reduce unnecessary lifting"),
      ...createYesNoNaInput("Good lighting and tidy work area"),
      ...createYesNoNaInput("Heavy lifting equipment evaluated and ready"),
      ...createYesNoNaInput("Workers wearing PPE (gloves, safety shoes)"),
      ...createYesNoNaInput(
        "Customized ergonomic equipment available (support belts)"
      ),
    ],
  },
  {
    title: "Site-Specific Risk Assessment",
    inputs: [
      ...createYesNoNaInput("Workstations adjusted to ergonomic height"),
      ...createYesNoNaInput("Breaks planned to reduce muscle fatigue"),
      ...createYesNoNaInput("Risk of dropping heavy objects minimized"),
      ...createYesNoNaInput("Stable floor conditions ensured"),
      ...createYesNoNaInput(
        "Training in ergonomic lifting techniques completed"
      ),
      ...createYesNoNaInput("Workers informed about emergency procedures"),
    ],
  },
  {
    title: "Execution of Work",
    inputs: [
      ...createYesNoNaInput(
        "Lifting performed by sufficient number of workers"
      ),
      ...createYesNoNaInput("Assistive devices used where possible"),
      ...createYesNoNaInput(
        "Continuous monitoring to avoid dangerous situations"
      ),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        "Incorrect lifting technique – Medium/High → High",
        "Incorrect lifting technique"
      ),
      createPendingDoneInput(
        "Muscle strain – Medium/High → High",
        "Muscle strain"
      ),
      createPendingDoneInput(
        "Heavy objects slip/fall – Low/High → Medium",
        "Heavy objects slip"
      ),
      createPendingDoneInput(
        "Lack of lifting equipment – Medium/Medium → Medium",
        "Lack of lifting equipment"
      ),
      createPendingDoneInput(
        "Overexertion/fatigue – Medium/Medium → Medium",
        "Overexertion fatigue"
      ),
      createPendingDoneInput(
        "Unsafe workstation height/layout – Low/Medium → Low",
        "Unsafe workstation"
      ),
      createPendingDoneInput(
        "Slips/trips/falls – Medium/Medium → Medium",
        "Slips trips falls"
      ),
    ],
  },
];

export const ergonomicsHeavyObjects: LinkType = {
  text: "Ergonomics – Heavy Objects",
  href: "/safety-tools/checklists/ergonomics-heavy-objects",
  addHref: "/safety-tools/checklists/ergonomics-heavy-objects/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Ergonomics Heavy Objects Checklist",
      desc: "Checklist for ergonomics and safe handling of heavy objects, covering lifting aids, PPE, and risk assessment.",
      href: "/safety-tools/checklists/ergonomics-heavy-objects/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/ergonomics-heavy-objects",
    },
  ],
};
