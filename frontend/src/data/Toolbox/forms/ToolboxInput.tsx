import { Input, LinkType } from "../../../types/Sidebar";
import { createRiskLevelInput, createYesNoNaInput } from "../../../utils/functions";

const inputs: Input[] = [
  {
    title: "About the Meeting",
    inputs: [
      {
        label: "Project Name",
        name: "project_name",
        type: "text",
        size: "half",
      },
      {
        label: "Metting Number",
        name: "meeting_location",
        type: "text",
        size: "half",
      },
      { label: "Date", name: "meeting_date", type: "date", size: "full" },
      {
        label: "Key Discussion Points",
        name: "discussion_points",
        type: "text",
        size: "full",
      },
      createRiskLevelInput("What is the current risk level?"),
    ],
  },
  {
    title: "Follow-up and Action Taken",
    assignRepetitive: true,

    name: "follow_up_tasks",
    inputs: [
      {
        label: "Assigned to",
        size: "half",
        name: "assign_to",
        type: "select",
        options: {
          endpoint: "users",
          name: "fullname",
        },
      },
      { label: "Date", name: "meeting_date", type: "date", size: "half" },

      {
        label: "Action Taken",
        name: "action_taken",
        type: "textarea",
        size: "full",
      },
      {
        label: "Assigned to",
        size: "half",
        name: "assign_to",
        type: "select",
        options: {
          endpoint: "users",
          name: "fullname",
        },
      },
      {
        label: "Completion Date",
        name: "completion_date",
        type: "date",
        size: "half",
      },
    ],
  },
  {
    label: "Key Discussion Points",
    name: "discussion_points",
    type: "text",
    size: "full",
  },
  createRiskLevelInput("What is the current risk level?"),

  {
    title: "Follow-up and Action Taken",
    assignRepetitive: true,

    name: "follow_up_tasks",
    inputs: [
      {
        label: "Assigned to",
        size: "half",
        name: "assign_to",
        type: "select",
        options: {
          endpoint: "users",
          name: "fullname",
        },
      },
      { label: "Date", name: "meeting_date", type: "date", size: "half" },

      {
        label: "Action Taken",
        name: "action_taken",
        type: "textarea",
        size: "full",
      },
      {
        label: "Assigned to",
        size: "half",
        name: "assign_to",
        type: "select",
        options: {
          endpoint: "users",
          name: "fullname",
        },
      },
      {
        label: "Completion Date",
        name: "completion_date",
        type: "date",
        size: "half",
      },
    ],
  },

  {
    title: "Additional Safety Tools",
    inputs: [
      {
        label: "Additional Safety Tools",
        size: "half",
        name: "Additional",
        type: "radio",
        options: [
          {
            value: "good",
            label: "SJA",
          },
          {
            value: "fSafety Checklistsair",
            label: "Safety Checklists",
          },
          {
            value: "Special Risk Assessments",
            label: "Special Risk Assessments",
          },
          {
            value: "PPE and Spescial Safety Equipment",
            label: "PPE and Spescial Safety Equipment ",
          },
        ],
      },
    ],
  },
  {
    title: "Pre-Work Checklist",
    inputs: [
      ...createYesNoNaInput("Are all workers wearing proper PPE?"),
      ...createYesNoNaInput("Is the workplace prepared and safe for work??"),
      ...createYesNoNaInput(
        "Have potenstial hazards been identified and addressed?"
      ),
      ...createYesNoNaInput(
        "Is the team aware of today’s tasks and safety protocol’s?"
      ),
    ],
  },
  {
    //title: "Signatures",
    inputs: [
      {
        title: "Attendees",
        label: "Attendees",
        name: "attendee_count",
        type: "signature",
        size: "half",
      },
      {
        title: "Site Manager",
        label: "Site Manager",
        name: "site_manager",
        type: "signature",
        size: "half",
      },
      {
        title: "Site Manager's Signature",
        label: "Site Manager's Signature",
        name: "site_manager_signature",
        type: "signature",
        size: "half",
      },
      {
        title: "Attendee Signatures",
        label: "Attendee Signatures",
        name: "attendee_signatures",
        type: "signature",
        size: "half",
      },
    ],
  },
];

export const toolboxChecklist: LinkType = {
  text: "Toolbox Meeting Checklist",
  href: "/safety-tools/toolbox/list", // صفحة القائمة (list)
  addHref: "/safety-tools/toolbox/add", // رابط زر "Add New Item"
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Toolbox Meeting Checklist",
      desc: "Toolbox Meeting form including PPE, electrical safety, chemicals, housekeeping, emergency preparedness, and site safety.",
      href: "/safety-tools/toolbox/add", // صفحة الفورم (form)
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/toolbox/list", // يرجع للقائمة بعد الإضافة
    },
  ],
};
