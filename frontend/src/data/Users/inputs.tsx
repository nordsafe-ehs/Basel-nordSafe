import { Input } from "../../types/Sidebar";

export const usersInputs: Input[] = [
  {
    label: "Full name",
    size: "full",
    name: "fullname",
    type: "text",
  },
  {
    label: "Email",
    size: "full",
    name: "email",
    type: "text",
  },
  {
    label: "Password",
    size: "full",
    name: "password",
    type: "password",
    hideColumn: true,
  },
  {
    label: "Job description",
    size: "full",
    name: "jobDesc",
  },
  {
    label: "Department",
    size: "full",
    name: "department",
  },
  {
    label: "Role",
    size: "full",
    name: "role",
    type: "select",
    options: [
      {
        label: "Admin",
        value: "admin",
      },
      {
        label: "User",
        value: "user",
      },
      // {
      //   label: "Visitor",
      // },
    ],
  },
  {
    label: "User project",
    name: "userProject",
    type: "select",
    size: "full",
    hideColumn: true,
    options: [
      {
        label: "New Project",
        value: "new",
      },
      {
        label: "Existing Project",
        value: "existing",
      },
    ],
    onValue: {
      existing: [
        {
          hideColumn: true,
          label: "Project",
          type: "select",
          size: "full",
          name: "project",
          options: {
            endpoint: "projects",
            name: "name",
          },
        },
      ],
      new: [
        {
          label: "Name",
          hideColumn: true,
          size: "full",
          name: "projectName",
          type: "text",
        },
        {
          label: "Location",
          hideColumn: true,
          size: "full",
          name: "projectLocation",
          type: "location",
        },
      ],
    },
  },
];
