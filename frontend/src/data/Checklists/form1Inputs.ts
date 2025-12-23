import { Input } from "../../types/Sidebar";

export const form1Inputs: Input[] = [
  {
    title: "General Information",
    inputs: [
      {
        label: "Project Name",
        name: "project_name",
        type: "text",
        size: "half",
      },
      {
        label: "Date of operation",
        name: "date_of_operation",
        type: "date",
        size: "half",
      },
      {
        label: "Responsible person",
        name: "responsible_person",
        type: "text",
        size: "half",
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
    title: "Checklist Before Starting Work",
    inputs: [
      {
        subTitle: "A. Documentation",
        inputs: [
          {
            label: "Risk assessment completed and uploaded to NordSafe",
            name: "doc_risk_assessment",
            type: "checkbox",
            size: "full",
          },
          {
            label: "All necessary permits and approvals obtained",
            name: "doc_permits_obtained",
            type: "checkbox",
            size: "full",
          },
          {
            label:
              "Emergency numbers and emergency procedures available at the workplace",
            name: "doc_emergency_procedures",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "B. Personnel",
        inputs: [
          {
            label:
              "All workers are trained in safety routines and protocols for urban work",
            name: "personnel_training",
            type: "checkbox",
            size: "full",
          },
          {
            label:
              "Toolbox meeting conducted to assign roles and responsibilities",
            name: "personnel_toolbox_meeting",
            type: "checkbox",
            size: "full",
          },
          {
            label:
              "Workers have complete PPE (helmet, vest, gloves, glasses, boots)",
            name: "personnel_ppe_complete",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "C. Equipment and Setup",
        inputs: [
          {
            label: "All equipment inspected for safety and compliance",
            name: "equipment_inspected",
            type: "checkbox",
            size: "full",
          },
          {
            label:
              "Barriers, fences and signs are set up to separate pedestrians from the work area",
            name: "equipment_barriers_setup",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Lighting is in place for working in dark conditions",
            name: "equipment_lighting",
            type: "checkbox",
            size: "full",
          },
        ],
      },
    ],
  },
  {
    title: "Site-Specific Risk Assessment",
    inputs: [
      {
        subTitle: "A. Area Conditions",
        inputs: [
          {
            label:
              "Pedestrian crossings and construction areas are clearly marked",
            name: "area_pedestrian_marked",
            type: "checkbox",
            size: "full",
          },
          {
            label:
              "Traffic control measures have been implemented for both vehicles and pedestrians",
            name: "area_traffic_control",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Availability for emergency services is maintained",
            name: "area_emergency_services",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "B. Environmental Hazards",
        inputs: [
          {
            label: "Noise and dust levels are monitored and minimized",
            name: "env_noise_dust",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Weather conditions are assessed and taken into account",
            name: "env_weather_conditions",
            type: "checkbox",
            size: "full",
          },
          {
            label:
              "Any impacts on nearby businesses or homes are being assessed",
            name: "env_nearby_impact",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "C. Operational Hazards",
        inputs: [
          {
            label:
              "Machines and pedestrians are kept at a safe distance from each other",
            name: "op_safe_distance",
            type: "checkbox",
            size: "full",
          },
          {
            label:
              "The risk of falling objects is reduced by protective netting or overhanging protection",
            name: "op_falling_objects",
            type: "checkbox",
            size: "full",
          },
          {
            label:
              "Procedures for working near underground installations are in place",
            name: "op_underground_procedures",
            type: "checkbox",
            size: "full",
          },
        ],
      },
    ],
  },
  {
    title: "Execution of Work",
    inputs: [
      {
        subTitle: "A. Work execution",
        inputs: [
          {
            label:
              "The responsible manager is present during all high-risk operations",
            name: "exec_manager_present",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Work equipment is only used within the designated zones",
            name: "exec_equipment_zone",
            type: "checkbox",
            size: "full",
          },
          {
            label:
              "Pedestrian traffic near the work area is continuously monitored",
            name: "exec_pedestrian_monitored",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "B. Security measures",
        inputs: [
          {
            label: "Spotters deployed to guide pedestrians if necessary",
            name: "security_spotters",
            type: "checkbox",
            size: "full",
          },
          {
            label:
              "Public notices (e.g. signs, audible alarms) are active and functional",
            name: "security_notices_active",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Regular safety checks are carried out during the day",
            name: "security_safety_checks",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "C. Post-processing",
        inputs: [
          {
            label: "Workplace cleared, and barriers checked before departure",
            name: "post_cleared_barriers",
            type: "checkbox",
            size: "full",
          },
          {
            label:
              "Tools and materials are secured to prevent unauthorized access",
            name: "post_tools_secured",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Area inspected to ensure it is safe for public use",
            name: "post_area_safe",
            type: "checkbox",
            size: "full",
          },
        ],
      },
    ],
  },
  {
    title: "NordSafe Integration",
    inputs: [
      {
        label:
          "Risk assessments, work plans and documentation uploaded to NordSafe",
        name: "nordsafe_docs_uploaded",
        type: "checkbox",
        size: "full",
      },
      {
        label: "Incidents or near misses reported via NordSafe",
        name: "nordsafe_incidents_reported",
        type: "checkbox",
        size: "full",
      },
      {
        label:
          "Feedback meeting held with the team, and insights uploaded to NordSafe",
        name: "nordsafe_feedback_meeting",
        type: "checkbox",
        size: "full",
      },
      {
        label: "Regular NordSafe updates and safety training completed",
        name: "nordsafe_training_completed",
        type: "checkbox",
        size: "full",
      },
    ],
  },
  {
    title: "Risk Assessment Table",
    inputs: [
      {
        label: "Risk factor",
        name: "risk_factor",
        type: "text",
        size: "full",
      },
      {
        label: "Probability",
        name: "risk_probability",
        type: "select",
        options: [
          { label: "Low", value: "low" },
          { label: "Medium", value: "medium" },
          { label: "High", value: "high" },
        ],
        size: "half",
      },
      {
        label: "Consequence",
        name: "risk_consequence",
        type: "select",
        options: [
          { label: "Low", value: "low" },
          { label: "Medium", value: "medium" },
          { label: "High", value: "high" },
        ],
        size: "half",
      },
      {
        label: "Measures",
        name: "risk_measures",
        type: "text",
        size: "full",
      },
      {
        label: "Status",
        name: "risk_status",
        type: "text",
        size: "full",
      },
    ],
  },
];
