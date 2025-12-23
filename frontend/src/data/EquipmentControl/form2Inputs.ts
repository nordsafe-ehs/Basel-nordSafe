import { Input } from "../../types/Sidebar";

export const formInput2: Input[] = [
  {
    title: "Equipment Control Checklist",
    inputs: [
      {
        subTitle: "New equipment",
        inputs: [
          {
            label: "Equipment",
            name: "equipment",
            type: "text",
            size: "full",
          },
          {
            label: "Responsible Person",
            name: "equipment_responsible",
            type: "text",
            size: "full",
          },
          {
            label: "Inspection Details",
            name: "equipment_inspection_details",
            type: "text",
            size: "full",
          },
          {
            label: "Current Control Date",
            name: "equipment_current_date",
            type: "date",
            size: "half",
          },
          {
            label: "Next Control Date",
            name: "equipment_next_date",
            type: "date",
            size: "half",
          },
          {
            label: "Upload file",
            name: "equipment_upload_file",
            type: "file",
            size: "full",
          },
        ],
      },
    ],
  },
];
