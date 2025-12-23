import { Input, LinkType } from "../../../types/Sidebar";

const inputs: Input[] = [
  {
    title: "Project Information",
    inputs: [
      {
        label: "Project  / site",
        name: "project_name",
        type: "text",
        size: "half",
      },
      {
        label: "Task / Activity",
        name: "Task_Activity",
        type: "text",
        size: "half",
      },
      {
        label: "Date",
        name: "date",
        type: "date",
        size: "half",
      },
      {
        label: "Permit-to-Work Reference (if founded):",
        name: "Permit-to-Work_number",
        type: "text",
        size: "half",
      },
      {
        label: "JSA Responsible (Name / Signature / Date):",
        name: "JSA Responsible_number",
        type: "text",
        size: "full",
      },
      {
        label:
          "Contributors (from the list of user and could to add more as visitor):",
        name: "Contributors_id",
        type: "text",
        size: "full",
      },
    ],
  },
  {
    title: "Client Information ",
    inputs: [
      {
        label: "Client Name",
        name: "client_Name:",
        type: "text",
        size: "full",
      },
      {
        label: "Client Location:",
        name: "client_Location:",
        type: "text",
        size: "full",
      },
      {
        label: "Contact Person:",
        name: "contact_person:",
        type: "text",
        size: "full",
      },
      {
        label: "Email Contact Person:",
        name: "Email_contact",
        type: "text",
        size: "full",
      },
    ],
  },

  {
    title: "Delivery Method",
    inputs: [
      {
        label: "Delivery Method",
        size: "half",
        name: "Additional",
        type: "radio",
        options: [
          {
            value: "email",
            label: "Email",
          },
          {
            value: "hard copy",
            label: "Hard Copy",
          },
          {
            value: "system upload",
            label: "System upload",
          },
        ],
      },
    ],
  },
];

export const sjaChecklist: LinkType = {
  text: "General Information",
  href: "/safety-tools/sja/list", // صفحة القائمة (list)
  addHref: "/safety-tools/sja/add", // رابط زر "Add New Item"
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add SJA Checklist",
      desc: "Sikker Jobbanalyse (SJA) form including project info, documentation, competence, communication, equipment, and site safety.",
      href: "/safety-tools/sja/add", // صفحة الفورم (form)
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/sja/list", // يرجع للقائمة بعد الإضافة
    },
  ],
};
