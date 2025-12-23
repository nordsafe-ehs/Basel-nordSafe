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
        label: "Project name",
        name: "project name",
        type: "text",
        size: "full",
      },
      {
        label: "Date",
        name: "date",
        type: "date",
        size: "full",
      },
      {
        label: "Responsible Person",
        name: "responsible person",
        type: "text",
        size: "full",
      },
      {
        label: "Participants / Team members",
        name: "participants",
        type: "textarea",
        size: "full",
      },
    ],
  },
  {
    title: "Pre-Work Checklist",
    inputs: [
      ...createYesNoNaInput(
        "Verify that all equipment has been inspected and approved for use"
      ),
      ...createYesNoNaInput(
        "Ensure that the work area is cleared and prepared for concrete work"
      ),
      ...createYesNoNaInput(
        "Ensure that formwork is correctly installed and stabilized"
      ),
      ...createYesNoNaInput(
        "Confirm availability of emergency equipment, including eyewash and first aid kit"
      ),
      ...createYesNoNaInput("Use of helmet and safety shoes"),
      ...createYesNoNaInput(
        "Use of gloves that protect against the alkaline properties of concrete"
      ),
      ...createYesNoNaInput(
        "Safety glasses or face shield to protect eyes from splashes"
      ),
      ...createYesNoNaInput(
        "Approved respiratory protection when working with cement dust"
      ),
      ...createYesNoNaInput(
        "All workers have undergone training in safe concrete handling"
      ),
      ...createYesNoNaInput(
        "Clear roles and responsibilities are defined for each worker"
      ),
    ],
  },
  {
    title: "During Work",
    inputs: [
      ...createYesNoNaInput(
        "Use proper technique when lifting heavy bags of concrete or other equipment"
      ),
      ...createYesNoNaInput(
        "Avoid working in the same position for long periods of time – take regular breaks"
      ),
      ...createYesNoNaInput(
        "Keep the work area clean and free of obstacles to reduce the risk of falls"
      ),
      ...createYesNoNaInput("Avoid direct skin contact with fresh concrete"),
      ...createYesNoNaInput(
        "Immediately rinse concrete from skin or eyes in case of accidental contact"
      ),
      ...createYesNoNaInput(
        "Wear chemical-resistant gloves when cleaning equipment"
      ),
      ...createYesNoNaInput(
        "Use of vibration-damping gloves when handling concrete vibrators"
      ),
      ...createYesNoNaInput(
        "Keep away from moving machine parts during operation"
      ),
      ...createYesNoNaInput(
        "Regularly check that all equipment is working properly"
      ),
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      createPendingDoneInput(
        <>
          Risk Factor: Skin contact with concrete <br />
          Probability: Medium <br />
          Consequence: High <br />
          Risk Level: High <br />
          Mitigation Measures: Use chemical-resistant gloves, rinse immediately
          if contact occurs
        </>,
        "Skin contact with concrete"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Falls in the workplace <br />
          Probability: Low <br />
          Consequence: Medium <br />
          Risk Level: Low <br />
          Mitigation Measures: Maintain clean work area, use safety shoes,
          remove obstacles
        </>,
        "Falls in the workplace"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Stress injuries / ergonomic strain <br />
          Probability: Medium <br />
          Consequence: Medium <br />
          Risk Level: Medium <br />
          Mitigation Measures: Proper lifting techniques, take regular breaks,
          rotate tasks
        </>,
        "Stress injuries ergonomic strain"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Exposure to cement dust <br />
          Probability: Medium <br />
          Consequence: High <br />
          Risk Level: High <br />
          Mitigation Measures: Use approved respiratory protection, minimize
          dust generation, follow safe handling
        </>,
        "Exposure to cement dust"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Equipment-related injuries <br />
          Probability: Low <br />
          Consequence: High <br />
          Risk Level: Medium <br />
          Mitigation Measures: Inspect equipment regularly, train workers,
          maintain safe distance from moving parts
        </>,
        "Equipment-related injuries"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Eye contact with concrete <br />
          Probability: Low <br />
          Consequence: High <br />
          Risk Level: Medium <br />
          Mitigation Measures: Wear safety glasses or face shield, immediate
          rinsing if contact occurs
        </>,
        "Eye contact with concrete"
      ),
      createPendingDoneInput(
        <>
          Risk Factor: Chemical exposure during cleaning <br />
          Probability: Medium <br />
          Consequence: Medium <br />
          Risk Level: Medium <br />
          Mitigation Measures: Wear chemical-resistant gloves, follow safe
          cleaning procedures
        </>,
        "Chemical exposure during cleaning"
      ),
    ],
  },
];

export const concreteWork: LinkType = {
  text: "Concrete Work on Construction Site",
  href: "/safety-tools/checklists/concrete-work",
  addHref: "/safety-tools/checklists/concrete-work/add",
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Concrete Work on Construction Site",
      desc: "This checklist ensures safety and compliance during concrete work operations, including preparation, execution, and risk assessment. It covers personal protective equipment, safe handling, and emergency procedures.",
      href: "/safety-tools/checklists/concrete-work/add",
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/checklists/concrete-work",
    },
  ],
};
