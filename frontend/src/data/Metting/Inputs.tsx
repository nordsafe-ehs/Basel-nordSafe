export const meetingInputs: Input[] = [
  {
    title: "Meeting Information",
    inputs: [
      {
        label: "Title",
        name: "title",
        type: "text",
        size: "half",
        editable: true,
        required: true,
      },
      {
        label: "Description",
        name: "description",
        type: "textarea",
        size: "full",
        editable: true,
      },
      {
        label: "Company",
        name: "company",
        type: "text",
        size: "half",
        editable: true,
      },
      {
        label: "Project",
        name: "project",
        type: "text",
        size: "half",
        editable: true,
      },
      {
        label: "Duration (minutes)",
        name: "duration",
        type: "number",
        size: "half",
        editable: true,
      },
      {
        label: "Classification",
        name: "classification",
        type: "select",
        size: "half",
        editable: true,
        options: ["Safety", "Planning", "Construction", "General"],
      },
    ],
  },
  {
    title: "Schedule",
    inputs: [
      {
        label: "Meeting Date",
        name: "meetingDate",
        type: "datetime",
        size: "half",
        editable: true,
        required: true,
      },
      {
        label: "Status",
        name: "status",
        type: "select",
        size: "half",
        editable: true,
        options: ["draft", "scheduled", "in_progress", "closed"],
      },
      {
        label: "Attenders",
        name: "attenders",
        type: "text",
        size: "half",
        editable: true,
      },
    ],
  },
];
