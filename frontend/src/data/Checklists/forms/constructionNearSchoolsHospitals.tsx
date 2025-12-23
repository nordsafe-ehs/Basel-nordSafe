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
      ...createYesNoNaInput("Identify and mark work area with barriers/signs"),
      ...createYesNoNaInput("Plan working hours to avoid critical periods"),
      ...createYesNoNaInput("Check equipment condition and certification"),
      ...createYesNoNaInput("Ensure emergency equipment available"),
      ...createYesNoNaInput("Wear PPE (helmet, shoes, reflective vests)"),
      ...createYesNoNaInput("Provide respiratory protection if dust/chemicals"),
      ...createYesNoNaInput("Wear hearing protection for noisy equipment"),
      ...createYesNoNaInput("Inform school/hospital management"),
      ...createYesNoNaInput("Designate contact person for communication"),
    ],
  },
  {
    title: "During Work",
    inputs: [
      ...createYesNoNaInput("Control pedestrian traffic with safe walkways"),
      ...createYesNoNaInput("Set traffic manager for heavy transport"),
      ...createYesNoNaInput("Reduce vehicle speed in area"),
      ...createYesNoNaInput("Use noise-reducing measures"),
      ...createYesNoNaInput("Schedule noisy work at least disruptive times"),
      ...createYesNoNaInput(
        "Monitor vibrations affecting hospital equipment/buildings"
      ),
      ...createYesNoNaInput(
        "Avoid hazardous chemicals near ventilation systems"
      ),
      ...createYesNoNaInput("Clean and secure tools/materials after use"),
      ...createYesNoNaInput(
        "Avoid storing heavy/unstable objects near public areas"
      ),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        <>
          Risk Factor: Pedestrian accidents
          <br />
          Probability: Medium
          <br />
          Consequence: High
          <br />
          Risk Level: High
          <br />
          Mitigation: Clear walkways, barriers, reflective vests, spotters
        </>,
        "Pedestrian accidents"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Noise disturbances
          <br />
          Probability: Medium
          <br />
          Consequence: Medium
          <br />
          Risk Level: Medium
          <br />
          Mitigation: Noise-reducing equipment, schedule noisy work at least
          disruptive hours
        </>,
        "Noise disturbances"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Material handling accidents
          <br />
          Probability: Low
          <br />
          Consequence: High
          <br />
          Risk Level: Medium
          <br />
          Mitigation: Store materials safely, secure tools, training for
          lifting/moving
        </>,
        "Material handling accidents"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Vibrations affecting hospital equipment
          <br />
          Probability: Low
          <br />
          Consequence: Medium
          <br />
          Risk Level: Low
          <br />
          Mitigation: Monitor vibrations, adjust work methods
        </>,
        "Vibrations"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Traffic accidents
          <br />
          Probability: Medium
          <br />
          Consequence: High
          <br />
          Risk Level: High
          <br />
          Mitigation: Traffic control measures, reduce speed, assign traffic
          managers
        </>,
        "Traffic accidents"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Unauthorized access
          <br />
          Probability: Low
          <br />
          Consequence: Medium
          <br />
          Risk Level: Medium
          <br />
          Mitigation: Barriers, signage, supervision
        </>,
        "Unauthorized access"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Chemical exposure/dust
          <br />
          Probability: Low
          <br />
          Consequence: Medium
          <br />
          Risk Level: Low
          <br />
          Mitigation: Respiratory protection, avoid chemicals near ventilation
        </>,
        "Chemical exposure"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Equipment malfunction
          <br />
          Probability: Low
          <br />
          Consequence: High
          <br />
          Risk Level: Medium
          <br />
          Mitigation: Regular inspection, maintenance, certified use
        </>,
        "Equipment malfunction"
      ),
    ],
  },
];

export const constructionNearSchoolsHospitals: LinkType = {
  text: "Construction near Schools/Hospitals",
  href: "/safety-tools/checklists/construction-near-schools-hospitals",
  addHref: "/safety-tools/checklists/construction-near-schools-hospitals/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Construction near Schools/Hospitals",
      desc: "Checklist for safe construction near schools or hospitals, covering noise, traffic, and risk assessment.",
      href: "/safety-tools/checklists/construction-near-schools-hospitals/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/construction-near-schools-hospitals",
    },
  ],
};
