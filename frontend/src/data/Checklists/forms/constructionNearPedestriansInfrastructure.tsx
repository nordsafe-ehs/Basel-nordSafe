import { Input, LinkType } from "../../../types/Sidebar";
import { createYesNoNaInput, createPendingDoneInput } from "../../../utils/functions";

const inputs: Input[] = [
  {
    title: "General Information",
    inputs: [
      { label: "Project Name", name: "project_name", type: "text", size: "full" },
      { label: " Location", name: "location", type: "text", size: "full" },
      { label: " Date", name: "date", type: "date", size: "half" },
      { label: "Person Responsible", name: "responsible_person", type: "text", size: "half" },
      { label: "Team Members", name: "team_members", type: "textarea", size: "full" },
    ],
  },
  {
    title: "Pre-Task Checklist – Documentation",
    inputs: [
      ...createYesNoNaInput("Necessary permits and approvals obtained"),
      ...createYesNoNaInput("Emergency contact details/procedures available"),
      ...createYesNoNaInput("Workers trained in public safety protocols"),
      ...createYesNoNaInput("Toolbox meeting conducted"),
      ...createYesNoNaInput("Emergency response roles assigned"),
      ...createYesNoNaInput("Equipment inspected for compliance"),
      ...createYesNoNaInput("Barriers/fences/signage installed"),
      ...createYesNoNaInput("Adequate lighting provided for night work"),
    ],
  },
  {
    title: "Site-Specific Risk Assessment",
    inputs: [
      ...createYesNoNaInput("Pedestrian walkways and construction zones identified"),
      ...createYesNoNaInput("Traffic control measures in place"),
      ...createYesNoNaInput("Accessibility for emergency services maintained"),
      ...createYesNoNaInput("Noise and dust monitored/minimized"),
      ...createYesNoNaInput("Weather conditions assessed"),
      ...createYesNoNaInput("Impact on nearby businesses/residences evaluated"),
      ...createYesNoNaInput("Heavy machinery proximity considered"),
      ...createYesNoNaInput("Risk of falling objects mitigated"),
      ...createYesNoNaInput("Procedures for underground utilities in place"),
    ],
  },
  {
    title: "Task Execution Checklist",
    inputs: [
      ...createYesNoNaInput("Supervisor present during high-risk operations"),
      ...createYesNoNaInput("Equipment used only in designated zones"),
      ...createYesNoNaInput("Continuous monitoring of pedestrian traffic"),
      ...createYesNoNaInput("Spotters deployed to guide pedestrians"),
      ...createYesNoNaInput("Public alerts operational"),
      ...createYesNoNaInput("Regular safety checks conducted"),
      ...createYesNoNaInput("Tools/materials secured"),
      ...createYesNoNaInput("Site inspected for public safety"),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        <>Risk Factor: Pedestrian interference<br/>Probability: Medium<br/>Consequence: High<br/>Risk Level: High<br/>Mitigation: Barriers, spotters, detours, signage</>,
        "Pedestrian interference"
      ),
      createPendingDoneInput(
        <>Risk Factor: Falling objects<br/>Probability: Medium<br/>Consequence: High<br/>Risk Level: High<br/>Mitigation: Nets, overhead protection, secure tools</>,
        "Falling objects"
      ),
      createPendingDoneInput(
        <>Risk Factor: Traffic accidents<br/>Probability: Medium<br/>Consequence: High<br/>Risk Level: High<br/>Mitigation: Traffic control, barriers, coordination with authorities</>,
        "Traffic accidents"
      ),
      createPendingDoneInput(
        <>Risk Factor: Unauthorized access<br/>Probability: Low<br/>Consequence: Medium<br/>Risk Level: Medium<br/>Mitigation: Fencing, locks, signage</>,
        "Unauthorized access"
      ),
      createPendingDoneInput(
        <>Risk Factor: Noise/dust<br/>Probability: Medium<br/>Consequence: Medium<br/>Risk Level: Medium<br/>Mitigation: Noise-reducing equipment, dust suppression</>,
        "Noise/dust"
      ),
      createPendingDoneInput(
        <>Risk Factor: Heavy machinery proximity<br/>Probability: Medium<br/>Consequence: High<br/>Risk Level: High<br/>Mitigation: Clear zones, spotters, safe distances</>,
        "Heavy machinery proximity"
      ),
      createPendingDoneInput(
        <>Risk Factor: Adverse weather<br/>Probability: Low<br/>Consequence: Medium<br/>Risk Level: Low<br/>Mitigation: Monitor forecasts, suspend unsafe work</>,
        "Adverse weather"
      ),
      createPendingDoneInput(
        <>Risk Factor: Underground utilities damage<br/>Probability: Low<br/>Consequence: High<br/>Risk Level: Medium<br/>Mitigation: Pre-work checks, safe excavation methods</>,
        "Underground utilities damage"
      ),
    ],
  },
];

export const constructionNearPedestriansInfrastructure: LinkType = {
  text: "Construction near Pedestrians – Infrastructure",
  href: "/safety-tools/checklists/construction-near-pedestrians-infrastructure",
  addHref:
    "/safety-tools/checklists/construction-near-pedestrians-infrastructure/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Construction near Pedestrians – Infrastructure",
      desc: "Checklist for safe construction near pedestrians with a focus on infrastructure, covering documentation, site-specific risks, execution, and risk assessment.",
      href: "/safety-tools/checklists/construction-near-pedestrians-infrastructure/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref:
        "/safety-tools/checklists/construction-near-pedestrians-infrastructure",
    },
  ],
};
