import { Input } from "../../../types/Sidebar";

export const occupationalInputs: Input[] = [
  {
    title: "Incident Details",
    inputs: [
      {
        label: "Type of Incident",
        size: "full",
        name: "type_of_incident",
        type: "select",
        options: [
          {
            value: "injury",
            label: "Injury",
          },
          {
            value: "illness",
            label: "Illness",
          },
          {
            value: "near_miss",
            label: "Near Miss",
          },
          {
            value: "other",
            label: "Other",
          },
        ],
        onValue: {
          other: [
            {
              label: "Other Incident Type",
              size: "full",
              name: "other_incident_type",
            },
          ],
        },
      },
      {
        label: "Incident Subtype",
        size: "full",
        name: "subtype",
        type: "select",
        options: [
          {
            label: "Physical Health Deviations",
          },
          {
            label: "Respiratory Deviations",
          },
          {
            label: "Chemical Deviations",
          },
          {
            label: "Musculoskeletal Disorders (MSDs)",
          },
          {
            label: "Biological Deviations",
          },
          {
            label: "Mental Health Deviations",
          },
          {
            label: "Skin Deviations",
          },
          {
            label: "Eye and Vision Deviations",
          },
          {
            label: "Hearing Deviations",
          },
          {
            label: "Fatigue and Overexertion",
          },
          {
            label: "Infectious Disease Deviations",
          },
          {
            label: "Workplace Violence",
          },
          {
            label: "Chronic Health Conditions",
          },
          {
            label: "Confined Space Deviations",
          },
          {
            label: "Emergency-Related Deviations",
          },
        ],
        onValue: {
          "Physical Health Deviations": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Noise Exposure: Prolonged exposure to high-decibel machinery",
                  value: "noise_exposure",
                },
                {
                  label:
                    "Vibration Exposure: From tools like jackhammers or drills, causing Hand-Arm Vibration Syndrome (HAVS)",
                  value: "vibration_exposure",
                },
                {
                  label:
                    "Extreme Temperatures: Heat stress or cold stress from working in harsh weather",
                  value: "extreme_temperatures",
                },
                {
                  label:
                    "Radiation Exposure: UV radiation from sunlight or infrared from welding activities",
                  value: "radiation_exposure",
                },
                {
                  label:
                    "Ergonomic Strains: Improper lifting, repetitive motions, or awkward postures",
                  value: "ergonomic_strains",
                },
              ],
            },
          ],
          "Respiratory Deviations": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Dust Inhalation: Silica, cement dust, or wood dust leading to respiratory diseases",
                  value: "dust_inhalation",
                },
                {
                  label:
                    "Fumes and Vapors: From welding, cutting, or painting operations",
                  value: "fumes_and_vapors",
                },
                {
                  label:
                    "Chemical Exposure: Inhalation of toxic substances like solvents or adhesives",
                  value: "chemical_exposure",
                },
                {
                  label:
                    "Asbestos Exposure: During renovation or demolition work",
                  value: "asbestos_exposure",
                },
              ],
            },
          ],
          "Chemical Deviations": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Toxic Substances: Exposure to deviationous chemicals like lead, arsenic, or benzene",
                  value: "toxic_substances",
                },
                {
                  label:
                    "Corrosive Chemicals: Acids or alkalis causing skin burns or eye damage",
                  value: "corrosive_chemicals",
                },
                {
                  label:
                    "Skin Irritants: Cement, adhesives, or sealants causing dermatitis",
                  value: "skin_irritants",
                },
                {
                  label:
                    "Allergic Reactions: Sensitization to certain chemicals or materials",
                  value: "allergic_reactions",
                },
              ],
            },
          ],
          "Musculoskeletal Disorders (MSDs)": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Back Injuries: From improper lifting techniques or overexertion",
                  value: "back_injuries",
                },
                {
                  label:
                    "Repetitive Strain Injuries (RSIs): From repeated movements like hammering or drilling",
                  value: "repetitive_strain_injuries",
                },
                {
                  label:
                    "Joint Disorders: Kneeling for extended periods or improper support",
                  value: "joint_disorders",
                },
                {
                  label:
                    "Fatigue-Related Injuries: Long hours of physically demanding tasks",
                  value: "fatigue_related_injuries",
                },
              ],
            },
          ],
          "Biological Deviations": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Mold and Fungi: Exposure in damp or poorly ventilated areas",
                  value: "mold_and_fungi",
                },
                {
                  label:
                    "Pest-Related Diseases: Infections from rodents or insect bites",
                  value: "pest_related_diseases",
                },
                {
                  label:
                    "Waterborne Pathogens: Contaminated water at the worksite",
                  value: "waterborne_pathogens",
                },
                {
                  label:
                    "Infectious Diseases: Spread of illnesses in crowded work environments",
                  value: "infectious_diseases",
                },
              ],
            },
          ],
          "Mental Health Deviations": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Stress: High-pressure deadlines or challenging work conditions",
                  value: "stress",
                },
                {
                  label: "Fatigue: From extended shifts or insufficient breaks",
                  value: "fatigue",
                },
                {
                  label: "Isolation: Working in remote or confined areas",
                  value: "isolation",
                },
                {
                  label:
                    "Workplace Harassment: Bullying or discriminatory behavior",
                  value: "workplace_harassment",
                },
              ],
            },
          ],
          "Skin Deviations": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Sunburn and UV Damage: Working outdoors without proper protection",
                  value: "sunburn_and_uv_damage",
                },
                {
                  label:
                    "Chemical Burns: From contact with deviationous substances",
                  value: "chemical_burns",
                },
                {
                  label:
                    "Irritation and Allergies: Reactions to gloves, protective gear, or materials",
                  value: "irritation_and_allergies",
                },
                {
                  label:
                    "Abrasions and Cuts: Handling rough or sharp materials",
                  value: "abrasions_and_cuts",
                },
              ],
            },
          ],
          "Eye and Vision Deviations": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Flying Particles: From grinding, cutting, or drilling",
                  value: "flying_particles",
                },
                {
                  label:
                    "Chemical Splashes: Contact with deviationous liquids or gases",
                  value: "chemical_splashes",
                },
                {
                  label:
                    "Bright Light Exposure: From welding or strong lighting",
                  value: "bright_light_exposure",
                },
                {
                  label: "Dust or Debris: Irritation from windblown particles",
                  value: "dust_or_debris",
                },
              ],
            },
          ],
          "Hearing Deviations": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Prolonged Noise Exposure: From machinery or construction activity",
                  value: "prolonged_noise_exposure",
                },
                {
                  label:
                    "Sudden Loud Noises: Explosions, sirens, or alarms causing hearing loss",
                  value: "sudden_loud_noises",
                },
                {
                  label:
                    "Inadequate Hearing Protection: Lack of proper earplugs or earmuffs",
                  value: "inadequate_hearing_protection",
                },
              ],
            },
          ],
          "Fatigue and Overexertion": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label: "Long Shifts: Insufficient rest between workdays",
                  value: "long_shifts",
                },
                {
                  label:
                    "Intense Physical Labor: Continuous lifting, carrying, or climbing",
                  value: "intense_physical_labor",
                },
                {
                  label:
                    "Insufficient Hydration: Dehydration from high-energy tasks",
                  value: "insufficient_hydration",
                },
                {
                  label: "Sleep Deprivation: Impacting focus and reaction time",
                  value: "sleep_deprivation",
                },
              ],
            },
          ],
          "Infectious Disease Deviations": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Poor Hygiene Facilities: Lack of handwashing stations",
                  value: "poor_hygiene_facilities",
                },
                {
                  label:
                    "Crowded Conditions: Shared spaces leading to the spread of illnesses",
                  value: "crowded_conditions",
                },
                {
                  label:
                    "Exposure to Contaminated Surfaces: Lack of cleaning or sanitization",
                  value: "exposure_to_contaminated_surfaces",
                },
                {
                  label: "Airborne Pathogens: Inhalation of infectious agents",
                  value: "airborne_pathogens",
                },
              ],
            },
          ],
          "Workplace Violence": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label: "Physical Altercations: Disputes among workers",
                  value: "physical_altercations",
                },
                {
                  label:
                    "Verbal Abuse: Aggressive communication in high-stress situations",
                  value: "verbal_abuse",
                },
                {
                  label:
                    "Security Breaches: Intruders or unauthorized personnel",
                  value: "security_breaches",
                },
              ],
            },
          ],
          "Chronic Health Conditions": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Cumulative Exposure: Long-term effects of dust, chemicals, or noise",
                  value: "cumulative_exposure",
                },
                {
                  label:
                    "Cardiovascular Strain: From excessive physical demands",
                  value: "cardiovascular_strain",
                },
                {
                  label:
                    "Chronic Respiratory Issues: Asthma or bronchitis from prolonged inhalation of irritants",
                  value: "chronic_respiratory_issues",
                },
              ],
            },
          ],
          "Confined Space Deviations": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label: "Oxygen Deficiency: In poorly ventilated spaces",
                  value: "oxygen_deficiency",
                },
                {
                  label:
                    "Toxic Gas Accumulation: Carbon monoxide, methane, or hydrogen sulfide",
                  value: "toxic_gas_accumulation",
                },
                {
                  label:
                    "Restricted Movement: Increasing physical strain or risk of entrapment",
                  value: "restricted_movement",
                },
              ],
            },
          ],
          "Emergency-Related Deviations": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Fire and Burns: During hot work or electrical activities",
                  value: "fire_and_burns",
                },
                {
                  label:
                    "Chemical Exposure During Spills: Acute health impacts",
                  value: "chemical_exposure_during_spills",
                },
                {
                  label:
                    "Slips, Trips, and Falls: Leading to sprains, fractures, or head injuries",
                  value: "slips_trips_and_falls",
                },
              ],
            },
          ],
        },
      },
      {
        label: "Description of Incident",
        size: "full",
        name: "incident_description",
        type: "textarea",
        info: (
          <>
            Provide a detailed description of the incident, including events
            leading to it.
          </>
        ),
      },
    ],
  },
  {
    title: "Immediate Actions Taken",
    inputs: [
      {
        label: "Immediate Actions Taken",
        size: "full",
        name: "immediate_actions",
        type: "textarea",
      },
    ],
  },

  {
    title: "People Involved",
    inputs: [
      {
        label: "Role",
        size: "full",
        name: "injured_role",
      },
      {
        label: "Employee type",
        size: "full",
        name: "injured_employee_type",
        type: "radio",
        options: [
          {
            label: "Employee",
            value: "employee",
          },
          {
            label: "Contractor",
            value: "contractor",
          },
        ],
      },
    ],
  },
  {
    title: "Root Cause Analysis",
    inputs: [
      {
        label: "Immediate Causes",
        size: "full",
        name: "immediate_causes",
        type: "textarea",
      },
    ],
  },
  {
    title: "Lessons Learned",
    inputs: [
      {
        label: "Key Takeaways",
        size: "full",
        name: "key_takeaways",
        type: "textarea",
      },
    ],
  },
  {
    title: "Occupational Health Impact Assessment",
    inputs: [
      {
        label: "Type of Impact",
        size: "full",
        name: "impact_type",
        info: <>(e.g., physical injury, psychological stress, illness)</>,
      },
      {
        label: "Severity of Impact",
        size: "full",
        name: "severity_of_impact",
        info: <>Describe the level of harm or potential risk.</>,
      },
    ],
  },
  {
    title: "Final Report Approval",
    inputs: [
      {
        label: "Investigator Name",
        size: "full",
        name: "investigator_name",
      },
      {
        label: "Date",
        size: "full",
        name: "investigation_date",
        type: "date",
      },
    ],
  },
  {
    title: "Documentation and Evidence",
    inputs: [
      {
        label: "Photographs / Other Supporting Documents",
        size: "full",
        name: "attachments",
        type: "file",
        multiple: true,
        optional: true,
        info: (
          <>
            Attach relevant images.
            <br />
            List or attach additional documentation (e.g., medical reports,
            permits).
          </>
        ),
      },
    ],
  },
];
