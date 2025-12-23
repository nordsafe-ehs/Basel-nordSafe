import { Input } from "../../types/Sidebar";

export const formInputToolbox: Input[] = [
  {
    title: "Toolbox Meeting Checklist",
    inputs: [
      {
        subTitle: "Prosjektinformasjon",
        inputs: [
          {
            label: "Prosjektnavn",
            name: "project_name",
            type: "text",
            size: "half",
          },
          {
            label: "Adresse",
            name: "project_address",
            type: "text",
            size: "half",
          },
          {
            label: "Kommune",
            name: "project_commune",
            type: "text",
            size: "half",
          },
          {
            label: "Oppdragsgiver/kunde",
            name: "client",
            type: "text",
            size: "half",
          },
          {
            label: "Firma/Navn",
            name: "company_name",
            type: "text",
            size: "half",
          },
        ],
      },
      {
        subTitle: "PPE (Verneutstyr)",
        inputs: [
          {
            label: "Er hjelmer, hansker og vernesko i bruk og i god stand?",
            name: "ppe_ok",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Er refleksklær synlige og intakte?",
            name: "reflective_clothes_ok",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "Elektrisk sikkerhet",
        inputs: [
          {
            label:
              "Er kabler, kontakter og stikkontakter kontrollert for skader?",
            name: "electrical_ok",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Er Lockout/Tagout-prosedyrer fulgt?",
            name: "lockout_tagout_ok",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "Kjemikaliehåndtering",
        inputs: [
          {
            label: "Er kjemikalier korrekt merket og lagret?",
            name: "chemicals_labeled",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Er sikkerhetsdatablader (MSDS) tilgjengelige?",
            name: "msds_available",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "Huskeeping",
        inputs: [
          {
            label: "Er arbeidsområdet ryddig og fri for avfall?",
            name: "housekeeping_ok",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Er gangveier og rømningsveier fri og tilgjengelige?",
            name: "escape_routes_ok",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "Beredskap",
        inputs: [
          {
            label: "Er nødutganger og alarmer tilgjengelige og funksjonelle?",
            name: "emergency_exits_ok",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Er førstehjelpsutstyr tilgjengelig?",
            name: "first_aid_ok",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "Arbeid i høyden",
        inputs: [
          {
            label: "Er stiger, stillas og fallsikringsutstyr kontrollert?",
            name: "height_equipment_ok",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Er det tatt hensyn til fallende gjenstander?",
            name: "falling_objects_ok",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "Støy og vibrasjon",
        inputs: [
          {
            label: "Er hørselsvern tilgjengelig og brukt?",
            name: "hearing_protection_ok",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Er vibrasjonsdempende utstyr kontrollert?",
            name: "vibration_damping_ok",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "Belysning og sikt",
        inputs: [
          {
            label: "Er arbeidsområdet tilstrekkelig belyst?",
            name: "lighting_ok",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Er refleksklær synlige under forholdene?",
            name: "visibility_ok",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "Kjøretøy og trafikk",
        inputs: [
          {
            label: "Er kjøretøy på området kontrollert for sikkerhet?",
            name: "vehicles_ok",
            type: "checkbox",
            size: "full",
          },
          {
            label: "Er trafikkruter tydelig merket?",
            name: "traffic_routes_ok",
            type: "checkbox",
            size: "full",
          },
        ],
      },
      {
        subTitle: "Andre temaer",
        inputs: [
          {
            label: "Beskrivelse",
            name: "other_topics_description",
            type: "textarea",
            size: "full",
          },
        ],
      },
      {
        subTitle: "Signaturer",
        inputs: [
          {
            label: "Ansvarlig",
            name: "toolbox_responsible",
            type: "text",
            size: "half",
          },
          {
            label: "Signatur",
            name: "toolbox_signature",
            type: "signature",
            size: "half",
          },
          {
            label: "Deltakere",
            name: "participants_signatures",
            type: "textarea",
            size: "full",
          },
          {
            label: "Status",
            name: "toolbox_status",
            type: "select",
            options: [
              { label: "Completed", value: "completed" },
              { label: "Pending", value: "pending" },
              { label: "Overdue", value: "overdue" },
            ],
            size: "half",
          },
        ],
      },
    ],
  },
];
