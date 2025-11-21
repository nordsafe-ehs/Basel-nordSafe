import { Input } from "../../../types/Sidebar";
import { environmentalInputs } from "./environmental";
import { occupationalInputs } from "./occupational";
import { safetyInputs } from "./safty";
import { securityInputs } from "./security";

export const incidentsInputs: Input[] = [
  {
    title: "Date of Report",
    inputs: [
      {
        label: "Date of report",
        size: "half",
        name: "date",
        type: "date",
      },
      {
        label: "Time of report",
        size: "half",
        name: "time",
        type: "time",
      },
    ],
  },
  {
    label: "Report type",
    name: "type",
    size: "full",
    type: "select",
    options: [
      {
        label: "Safety investigation report",
        value: "safety",
      },
      {
        label: "Security investigation report",
        value: "security",
      },
      {
        label: "Environmental investigation report",
        value: "environmental",
      },
      {
        label: "Occupational health investigation report",
        value: "occupational",
      },
    ],
    onValue: {
      safety: safetyInputs,
      security: securityInputs,
      environmental: environmentalInputs,
      occupational: occupationalInputs,
    },
  },
  {
    title: "Follow-up and Case Closure",
    assignRepetitive: true,
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
      {
        label: "Deadline",
        size: "half",
        name: "date_completed",
        type: "date",
      },
      {
        label: "Action Taken",
        size: "full",
        name: "action_taken",
        type: "textarea",
      },
    ],
  },
];
