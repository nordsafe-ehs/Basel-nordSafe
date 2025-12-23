import { Input, LinkType } from "../../../types/Sidebar";

const inputs: Input[] = [
  {
    title: "Equipment Control ",
    inputs: [
      // {
      //   subTitle: "Fall protection",
      //   inputs: [
      //     // Inspection Details
      //     ...createYesNoNaInput(
      //       "Inspect straps, locks, and fasteners for wear or tears before use"
      //     ),
      //     // Responsible Person
      //     {
      //       label: "Responsible Person",
      //       name: "fall_protection_responsible",
      //       type: "text",
      //       size: "half",
      //     },
      //     // Deliverable
      //     {
      //       label: "Deliverable",
      //       name: "fall_protection_deliverable",
      //       type: "text",
      //       size: "half",
      //     },
      //     // Current Control Date
      //     {
      //       label: "Current Control Date",
      //       name: "fall_protection_current_date",
      //       type: "date",
      //       size: "half",
      //     },
      //     // Next Control Date
      //     {
      //       label: "Next Control Date",
      //       name: "fall_protection_next_date",
      //       type: "date",
      //       size: "half",
      //     },
      //   ],
      // },
      // {
      //   subTitle: "Scaffolding",
      //   inputs: [
      //     ...createYesNoNaInput(
      //       "Ensure CE marking, proper assembly, and stable mounting with secure position"
      //     ),
      //     {
      //       label: "Responsible Person",
      //       name: "scaffolding_responsible",
      //       type: "text",
      //       size: "half",
      //     },
      //     {
      //       label: "Deliverable",
      //       name: "scaffolding_deliverable",
      //       type: "text",
      //       size: "half",
      //     },
      //     {
      //       label: "Current Control Date",
      //       name: "scaffolding_current_date",
      //       type: "date",
      //       size: "half",
      //     },
      //     {
      //       label: "Next Control Date",
      //       name: "scaffolding_next_date",
      //       type: "date",
      //       size: "half",
      //     },
      //   ],
      // },
      // {
      //   subTitle: "Workwear with reflectors",
      //   inputs: [
      //     ...createYesNoNaInput(
      //       "Confirm reflectors are visible, intact, and fixed in good condition"
      //     ),
      //     {
      //       label: "Responsible Person",
      //       name: "workwear_responsible",
      //       type: "text",
      //       size: "half",
      //     },
      //     {
      //       label: "Deliverable",
      //       name: "workwear_deliverable",
      //       type: "text",
      //       size: "half",
      //     },
      //     {
      //       label: "Current Control Date",
      //       name: "workwear_current_date",
      //       type: "date",
      //       size: "half",
      //     },
      //     {
      //       label: "Next Control Date",
      //       name: "workwear_next_date",
      //       type: "date",
      //       size: "half",
      //     },
      //   ],
      // },
      // {
      //   subTitle: "Gas meters",
      //   inputs: [
      //     ...createYesNoNaInput(
      //       "Verify sensor function, battery level, and ensure regular calibration"
      //     ),
      //     {
      //       label: "Responsible Person",
      //       name: "gas_meters_responsible",
      //       type: "text",
      //       size: "half",
      //     },
      //     {
      //       label: "Deliverable",
      //       name: "gas_meters_deliverable",
      //       type: "text",
      //       size: "half",
      //     },
      //     {
      //       label: "Current Control Date",
      //       name: "gas_meters_current_date",
      //       type: "date",
      //       size: "half",
      //     },
      //     {
      //       label: "Next Control Date",
      //       name: "gas_meters_next_date",
      //       type: "date",
      //       size: "half",
      //     },
      //   ],
      // },
      // {
      //   subTitle: "Fire extinguisher",
      //   inputs: [
      //     ...createYesNoNaInput(
      //       "Confirm pressure, safety valve, and service date; keep accessible and unobstructed"
      //     ),
      //     {
      //       label: "Responsible Person",
      //       name: "fire_extinguisher_responsible",
      //       type: "text",
      //       size: "half",
      //     },
      //     {
      //       label: "Deliverable",
      //       name: "fire_extinguisher_deliverable",
      //       type: "text",
      //       size: "half",
      //     },
      //     {
      //       label: "Current Control Date",
      //       name: "fire_extinguisher_current_date",
      //       type: "date",
      //       size: "half",
      //     },
      //     {
      //       label: "Next Control Date",
      //       name: "fire_extinguisher_next_date",
      //       type: "date",
      //       size: "half",
      //     },
      //   ],
      // },
      // {
      //   subTitle: "Fall protection net",
      //   inputs: [
      //     ...createYesNoNaInput(
      //       "Confirm expiry date and proper sizing for area"
      //     ),
      //     {
      //       label: "Responsible Person",
      //       name: "fall_net_responsible",
      //       type: "text",
      //       size: "half",
      //     },
      //     {
      //       label: "Deliverable",
      //       name: "fall_net_deliverable",
      //       type: "text",
      //       size: "half",
      //     },
      //     {
      //       label: "Current Control Date",
      //       name: "fall_net_current_date",
      //       type: "date",
      //       size: "half",
      //     },
      //     {
      //       label: "Next Control Date",
      //       name: "fall_net_next_date",
      //       type: "date",
      //       size: "half",
      //     },
      //   ],
      // },
      // {
      //   subTitle: "Vibration damping",
      //   inputs: [
      //     ...createYesNoNaInput(
      //       "Inspect material integrity and bonding to ensure effective protection"
      //     ),
      //     {
      //       label: "Responsible Person",
      //       name: "vibration_damping_responsible",
      //       type: "text",
      //       size: "half",
      //     },
      //     {
      //       label: "Deliverable",
      //       name: "vibration_damping_deliverable",
      //       type: "text",
      //       size: "half",
      //     },
      //     {
      //       label: "Current Control Date",
      //       name: "vibration_damping_current_date",
      //       type: "date",
      //       size: "half",
      //     },
      //     {
      //       label: "Next Control Date",
      //       name: "vibration_damping_next_date",
      //       type: "date",
      //       size: "half",
      //     },
      //   ],
      // },
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
            name: "Equepment-Inspection Details",
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
            name: "equipment_Upload file",
            type: "file",
            size: "full",
          },
        ],
      },
    ],
  },
];

export const equipmentControl: LinkType = {
  text: "Equipment Controler",
  href: "/safety-tools/equipment-control/equipment", // صفحة القائمة (list)
  addHref: "/safety-tools/equipment-control/add", // رابط زر "Add New Item"
  inputs,
  type: "list",
  endpoint: "checklists",
  links: [
    {
      text: "Add Equipment Control Checklist",
      desc: "Checklist for equipment safety inspections including fall protection, scaffolding, gas meters, fire extinguishers, and more.",
      href: "/safety-tools/equipment-control/add", // صفحة الفورم (form)
      inputs,
      type: "form",
      endpoint: "checklists",
      listHref: "/safety-tools/equipment-control", // يرجع للقائمة بعد الإضافة
    },
  ],
};



