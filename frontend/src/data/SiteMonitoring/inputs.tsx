import { Input } from "../../types/Sidebar";

export const siteMonitoringInputs: Input[] = [
  {
    title: "Visit Date",
    inputs: [
      {
        label: "Date of Visit",
        size: "half",
        name: "date_of_visit",
        type: "date",
      },
      {
        label: "Time of Visit",
        size: "half",
        name: "time_of_visit",
        type: "time",
      },
    ],
  },
  {
    title: "Purpose of the Visit",
    inputs: [
      {
        label: "Purpose",
        size: "full",
        name: "purpose_of_visit",
        type: "textarea",
        info: (
          <>
            Briefly describe the objective of the visit, e.g., safety
            inspection, progress monitoring, quality assessment, etc.
          </>
        ),
      },
    ],
  },
  {
    title: "Site Overview",
    inputs: [
      {
        label: "Current Phase of Construction",
        size: "full",
        name: "current_phase_of_construction",
      },
      {
        label: "Number of Workers on Site",
        size: "full",
        name: "number_of_workers_on_site",
        info: <>Approximate count</>,
      },
      {
        label: "Key Ongoing Activities",
        size: "full",
        name: "key_ongoing_activities",
        type: "textarea",
      },
    ],
  },
  {
    title: "Observations",
    inputs: [
      {
        subTitle: "Safety Compliance",
        inputs: [
          {
            label: "PPE Usage",
            size: "full",
            name: "ppe_usage",
            type: "radio",
            options: [
              {
                value: "yes",
                label: "Yes",
              },
              {
                value: "no",
                label: "No",
              },
            ],
            onValue: {
              no: [
                {
                  label: "Provide Observations",
                  size: "full",
                  name: "ppe_usage_observations",
                  type: "textarea",
                },
              ],
            },
          },
          {
            label: "Safety Signage and Barricades",
            size: "full",
            name: "safety_signage",
            type: "radio",
            options: [
              {
                value: "adequate",
                label: "Adequate",
              },
              {
                value: "inadequate",
                label: "Inadequate",
              },
            ],
          },
          {
            label:
              "Emergency Preparedness (fire extinguishers, first aid kits)",
            size: "full",
            name: "emergency_preparedness",
            type: "radio",
            options: [
              {
                value: "yes",
                label: "Yes",
              },
              {
                value: "no",
                label: "No",
              },
            ],
          },
          {
            label: "Housekeeping and Site Cleanliness",
            size: "full",
            name: "housekeeping",
            type: "radio",
            options: [
              {
                value: "good",
                label: "Good",
              },
              {
                value: "fair",
                label: "Fair",
              },
              {
                value: "poor",
                label: "Poor",
              },
            ],
          },
        ],
      },
      {
        subTitle: "Equipment & Machinery",
        inputs: [
          {
            label: "Materials Storage and Handling",
            size: "full",
            name: "materials_storage",
            type: "radio",
            options: [
              {
                value: "proper",
                label: "Proper",
              },
              {
                value: "improper",
                label: "Improper",
              },
            ],
          },
          {
            label: "Condition and Maintenance of Machinery",
            size: "full",
            name: "condition_of_machinery",
            type: "radio",
            options: [
              {
                value: "good",
                label: "Good",
              },
              {
                value: "fair",
                label: "Fair",
              },
              {
                value: "poor",
                label: "Poor",
              },
            ],
          },
          {
            label: "Proper Usage by Operators",
            size: "full",
            name: "proper_usage_by_operators",
            type: "radio",
            options: [
              {
                value: "yes",
                label: "Yes",
              },
              {
                value: "no",
                label: "No",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Recommendations & Action Plan",
    inputs: [
      {
        label: "Recommendations & Action Plan",
        size: "full",
        name: "recommendations_and_action_plan",
        type: "textarea",
        info: (
          <>Suggest corrective actions, improvements, or follow-ups required</>
        ),
      },
    ],
  },
  {
    title: "Photos & Attachments",
    inputs: [
      {
        label: "Photos/Sketches/Documents",
        size: "full",
        name: "photos_and_attachments",
        type: "file",
        multiple: true,
        optional: true,
        info: <>Attach relevant photos, sketches, or documents for reference</>,
      },
    ],
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
