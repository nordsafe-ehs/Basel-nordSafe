import { Input } from "../../types/Sidebar";

export const formInputSja: Input[] = [
  {
    title: "SJA Checklist",
    inputs: [
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
    ],
  },
];
