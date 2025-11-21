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
        label: "Participants / Team members",
        name: "participants_team_members",
        type: "textarea",
        size: "full",
      },
    ],
  },
  {
    title: "Checklist Before Starting Work",
    inputs: [
      ...createYesNoNaInput("All necessary permits and approvals obtained"),
      ...createYesNoNaInput(
        "Emergency numbers and emergency procedures available at the workplace"
      ),
      ...createYesNoNaInput(
        "All workers are trained in safety routines and protocols for urban work"
      ),
      ...createYesNoNaInput(
        "Toolbox meeting conducted to assign roles and responsibilities"
      ),
      ...createYesNoNaInput(
        "Workers have complete PPE, including helmet, reflective vest, gloves, safety glasses, and safety boots"
      ),
      ...createYesNoNaInput(
        "All equipment inspected for safety and compliance"
      ),
      ...createYesNoNaInput(
        "Barriers, fences, and signs are set up to separate pedestrians from the work area"
      ),
      ...createYesNoNaInput(
        "Lighting is in place for working in dark conditions"
      ),
    ],
  },
  {
    title: "Site-Specific Risk Assessment",
    inputs: [
      ...createYesNoNaInput(
        "Pedestrian crossings and construction areas are clearly marked"
      ),
      ...createYesNoNaInput(
        "Traffic control measures have been implemented for both vehicles and pedestrians"
      ),
      ...createYesNoNaInput(
        "Availability for emergency services is maintained"
      ),
      ...createYesNoNaInput(
        "Noise and dust levels are monitored and minimized"
      ),
      ...createYesNoNaInput("Weather conditions are assessed and considered"),
      ...createYesNoNaInput(
        "Any impact on nearby businesses or homes are assessed"
      ),
      ...createYesNoNaInput(
        "Machines and pedestrians are kept at a safe distance from each other"
      ),
      ...createYesNoNaInput(
        "The risk of falling objects is reduced by protective netting or overhanging protection"
      ),
      ...createYesNoNaInput(
        "Procedures for working near underground installations are in place"
      ),
    ],
  },
  {
    title: "Execution of Work",
    inputs: [
      ...createYesNoNaInput(
        "The manager responsible is present during all high-risk operations"
      ),
      ...createYesNoNaInput(
        "Work equipment is only used within the designated zones"
      ),
      ...createYesNoNaInput(
        "Pedestrian traffic near the work area is continuously monitored"
      ),
      ...createYesNoNaInput(
        "Spotters deployed to guide pedestrians if necessary"
      ),
      ...createYesNoNaInput(
        "Public notices (e.g., signs, audible alarms) are active and functional"
      ),
      ...createYesNoNaInput(
        "Regular safety checks are conducted during the working day"
      ),
      ...createYesNoNaInput(
        "Workplace cleared, and barriers checked before departure"
      ),
      ...createYesNoNaInput(
        "Tools and materials are secured to prevent access by unauthorized persons"
      ),
      ...createYesNoNaInput(
        "Areas inspected to ensure it is safe for public use"
      ),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        <>
          Risk Factor: Pedestrian interference <br />
          Probability: Medium <br />
          Consequence: High <br />
          Risk Level: High <br />
          Mitigation Measures: Use barriers, spotters, clear signage, controlled
          pedestrian paths
        </>,
        "Pedestrian interference"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Falling objects <br />
          Probability: Medium <br />
          Consequence: High <br />
          Risk Level: High <br />
          Mitigation Measures: Protective netting, overhanging protection,
          secure tools, and materials
        </>,
        "Falling objects"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Vehicle accidents <br />
          Probability: Medium <br />
          Consequence: High <br />
          Risk Level: High <br />
          Mitigation Measures: Traffic control, reduce speed, separate
          pedestrians, and vehicle zones
        </>,
        "Vehicle accidents"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Noise and dust <br />
          Probability: Medium <br />
          Consequence: Medium <br />
          Risk Level: Medium <br />
          Mitigation Measures: Noise barriers, dust suppression, schedule noisy
          work at off-peak times
        </>,
        "Noise and dust"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Equipment misuse <br />
          Probability: Low <br />
          Consequence: High <br />
          Risk Level: Medium <br />
          Mitigation Measures: Equipment inspection, worker training, use only
          in designated zones
        </>,
        "Equipment misuse"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Weather impact <br />
          Probability: Medium <br />
          Consequence: Medium <br />
          Risk Level: Medium <br />
          Mitigation Measures: Monitor conditions, adjust work schedule, provide
          PPE for rain/cold
        </>,
        "Weather impact"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Trips and slips on site <br />
          Probability: Medium <br />
          Consequence: Medium <br />
          Risk Level: Medium <br />
          Mitigation Measures: Maintain clear walkways, non-slip footwear,
          regular housekeeping
        </>,
        "Trips and slips on site"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Underground hazards / utilities <br />
          Probability: Low <br />
          Consequence: High <br />
          Risk Level: Medium <br />
          Mitigation Measures: Mark underground installations, follow safe
          digging procedures
        </>,
        "Underground hazards utilities"
      ),
    ],
  },
];

export const constructionNearPedestrians: LinkType = {
  text: "Construction Near Pedestrians – Urban Environments",
  href: "/safety-tools/checklists/construction-near-pedestrians",
  addHref: "/safety-tools/checklists/construction-near-pedestrians/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Construction Near Pedestrians – Urban Environments",
      desc: "This checklist ensures safety and compliance for construction work in urban environments near pedestrians, covering preparation, execution, and risk management.",
      href: "/safety-tools/checklists/construction-near-pedestrians/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/construction-near-pedestrians",
    },
  ],
};
