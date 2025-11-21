import ToolsUsedForAnalysis from "../../../components/ToolsUsedForAnalysis";
import { Input } from "../../../types/Sidebar";

export const environmentalInputs: Input[] = [
  {
    title: "Incident Description",
    inputs: [
      {
        label: "Type of Environmental Incident",
        size: "full",
        name: "type_of_incident",
        type: "select",
        options: [
          {
            value: "spill_release",
            label: "Spill/Release",
          },
          {
            value: "air_emission",
            label: "Air Emission",
          },
          {
            value: "water_contamination",
            label: "Water Contamination",
          },
          {
            value: "soil_contamination",
            label: "Soil Contamination",
          },
          {
            value: "other",
            label: "Other",
          },
        ],
        onValue: {
          other: [
            {
              label: "Other Environmental Impact",
              size: "full",
              name: "other_environmental_impact",
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
            label: "Air Pollution",
          },
          {
            label: "Water Pollution",
          },
          {
            label: "Soil Contamination",
          },
          {
            label: "Noise Pollution",
          },
          {
            label: "Waste Management",
          },
          {
            label: "Biodiversity Impact",
          },
          {
            label: "Resource Consumption",
          },
          {
            label: "Climate Impact",
          },
          {
            label: "Deviationous Materials",
          },
          {
            label: "Stormwater Management",
          },
          {
            label: "Light Pollution",
          },
          {
            label: "Vibration Impact",
          },
          {
            label: "Heat and Thermal Pollution",
          },
          {
            label: "Land Use and Aesthetic Impact",
          },
          {
            label: "Emergency and Spill Response",
          },
        ],
        onValue: {
          "Air Pollution": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Dust Emissions: From construction activities like excavation or demolition.",
                },
                {
                  label:
                    "Vehicle Emissions: Exhaust from construction machinery and vehicles.",
                },
                {
                  label:
                    "Toxic Fumes: Release from paints, solvents, or other chemicals.",
                },
                {
                  label:
                    "Particulate Matter: Fine particles from cement mixing or grinding.",
                },
              ],
            },
          ],
          "Water Pollution": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Runoff Contamination: From concrete, oils, or chemicals entering water bodies.",
                },
                {
                  label:
                    "Sedimentation: Erosion from exposed soil washing into rivers or lakes.",
                },
                {
                  label:
                    "Spills: Accidental leakage of fuel, oils, or deviationous substances.",
                },
                {
                  label:
                    "Improper Waste Disposal: Dumping of waste materials into water sources.",
                },
              ],
            },
          ],
          "Soil Contamination": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Chemical Spills: Oil, fuel, or deviationous substances leaking into the ground.",
                },
                {
                  label:
                    "Improper Material Storage: Chemicals stored without protective barriers.",
                },
                {
                  label:
                    "Erosion: Loss of topsoil due to inadequate site management.",
                },
                {
                  label:
                    "Heavy Metal Contamination: From construction or demolition waste.",
                },
              ],
            },
          ],
          "Noise Pollution": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Machinery Noise: From drills, jackhammers, or heavy vehicles.",
                },
                {
                  label: "Explosions: Blasting for excavation or demolition.",
                },
                {
                  label:
                    "Prolonged Activity: Continuous noise in residential or sensitive areas.",
                },
                {
                  label:
                    "Lack of Noise Mitigation: Absence of sound barriers or mufflers.",
                },
              ],
            },
          ],
          "Waste Management": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Construction Debris: Improper disposal of concrete, bricks, or wood.",
                },
                {
                  label:
                    "Deviationous Waste: Asbestos, lead-based paints, or chemicals.",
                },
                {
                  label:
                    "Non-Segregated Waste: Mixing recyclable and non-recyclable materials.",
                },
                {
                  label:
                    "Illegal Dumping: Disposal of materials in unauthorized areas.",
                },
              ],
            },
          ],
          "Biodiversity Impact": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Habitat Destruction: Clearing land in ecologically sensitive areas.",
                },
                {
                  label:
                    "Wildlife Displacement: Disrupting animals or birds during construction.",
                },
                {
                  label:
                    "Vegetation Loss: Cutting trees without replanting or conservation plans.",
                },
                {
                  label:
                    "Introduction of Invasive Species: From unregulated material movement.",
                },
              ],
            },
          ],
          "Resource Consumption": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Water Use: Over-extraction for construction processes.",
                },
                {
                  label: "Energy Use: High fuel consumption by machinery.",
                },
                {
                  label:
                    "Material Waste: Inefficient use of raw materials like wood or steel.",
                },
                {
                  label:
                    "Non-Renewable Resources: Excessive reliance on fossil fuels.",
                },
              ],
            },
          ],
          "Climate Impact": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Carbon Emissions: From construction machinery and transportation.",
                },
                {
                  label:
                    "Urban Heat Island Effect: Lack of green spaces in urban construction.",
                },
                {
                  label:
                    "Fossil Fuel Usage: Increased greenhouse gas emissions.",
                },
                {
                  label:
                    "Decreased Carbon Sequestration: Removal of vegetation and trees.",
                },
              ],
            },
          ],
          "Deviationous Materials": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label: "Asbestos: Release during demolition or renovation.",
                },
                {
                  label:
                    "Paints and Solvents: Containing volatile organic compounds (VOCs).",
                },
                {
                  label:
                    "Pesticides: Used for land preparation or maintenance.",
                },
                {
                  label: "Improper Disposal: Contaminating soil and water.",
                },
              ],
            },
          ],
          "Stormwater Management": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Flooding: Poor drainage systems causing waterlogging.",
                },
                {
                  label: "Erosion Control: Insufficient sediment barriers.",
                },
                {
                  label:
                    "Polluted Discharges: Release of untreated water into the environment.",
                },
                {
                  label:
                    "Clogged Waterways: Construction debris obstructing water flow.",
                },
              ],
            },
          ],
          "Light Pollution": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Excessive Lighting: From night-time construction activities.",
                },
                {
                  label:
                    "Impact on Wildlife: Disturbing nocturnal animals or migratory birds.",
                },
                {
                  label: "Energy Wastage: Inefficient lighting systems.",
                },
              ],
            },
          ],
          "Vibration Impact": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Soil Displacement: Vibrations causing ground instability.",
                },
                {
                  label:
                    "Damage to Nearby Structures: Cracks or weakening of foundations.",
                },
                {
                  label: "Impact on Wildlife: Disrupting sensitive species.",
                },
              ],
            },
          ],
          "Heat and Thermal Pollution": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Hot Work: Welding or cutting activities emitting heat.",
                },
                {
                  label:
                    "Water Temperature Changes: From discharge into nearby water bodies.",
                },
                {
                  label:
                    "Energy Wastage: Lack of thermal efficiency in equipment.",
                },
              ],
            },
          ],
          "Land Use and Aesthetic Impact": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Visual Pollution: Unsightly construction sites or debris piles.",
                },
                {
                  label:
                    "Improper Land Use: Building in protected or restricted zones.",
                },
                {
                  label: "Loss of Green Space: Reduction in vegetation cover.",
                },
                {
                  label:
                    "Long-Term Scarring: Abandoned or incomplete projects.",
                },
              ],
            },
          ],
          "Emergency and Spill Response": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Lack of Containment: No barriers for chemical or oil spills.",
                },
                {
                  label:
                    "Delayed Cleanup: Slow response to environmental accidents.",
                },
                {
                  label:
                    "Untrained Personnel: Inadequate handling of deviationous incidents.",
                },
                {
                  label: "Leakage Risks: From poorly maintained storage tanks.",
                },
              ],
            },
          ],
        },
      },
      {
        subTitle: "Materials/Substances Involved",
        inputs: [
          {
            label: "Type",
            size: "half",
            name: "material_type",
          },
          {
            label: "Quantity",
            size: "half",
            name: "material_quantity",
          },
        ],
      },
      {
        label: "Description of the Incident",
        size: "full",
        name: "incident_description",
        type: "textarea",
        info: <>Provide a detailed narrative of the incident.</>,
      },
      {
        subTitle: "Immediate Area Affected",
        inputs: [
          {
            label: "Size/Extent",
            size: "half",
            name: "area_size_extent",
          },
          {
            label: "Description",
            size: "half",
            name: "area_description",
          },
        ],
      },
    ],
  },
  {
    title: "Incident Response",
    inputs: [
      {
        label: "Immediate Action Taken",
        size: "full",
        name: "containment_actions",
        type: "textarea",
        info: (
          <>
            Describe steps taken to contain and control the environmental
            impact.
          </>
        ),
      },
    ],
  },
  {
    title: "Impact Assessment",
    inputs: [
      {
        label: "Environmental Impact",
        size: "full",
        name: "environmental_impact",
        type: "select",
        options: [
          {
            value: "short_term",
            label: "Short-Term",
          },
          {
            value: "long_term",
            label: "Long-Term",
          },
        ],
      },
      {
        label: "Environmental Impact Description",
        size: "full",
        name: "impact_description",
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
        info: <>Identify direct causes of the incident.</>,
      },
      {
        label: "Tools Used for Analysis",
        size: "full",
        name: "analysis_tools",
        type: "select",
        options: [
          {
            value: "fishbone",
            label: "Fishbone Diagram (Ishikawa)",
          },
          {
            value: "five_whys",
            label: "Five Whys",
          },
          {
            value: "fault_tree",
            label: "Fault Tree Analysis",
          },
        ],
        onValue: {
          fishbone: [
            {
              label: "Upload the analysis",
              size: "full",
              name: "analysis_file",
              type: "file",
              info: <ToolsUsedForAnalysis type="fishbone" />,
              infoType: "component",
            },
          ],
          five_whys: [
            {
              label: "Upload the analysis",
              size: "full",
              name: "analysis_file",
              type: "file",
              info: <ToolsUsedForAnalysis type="five_whys" />,
              infoType: "component",
            },
          ],
          fault_tree: [
            {
              label: "Upload the analysis",
              size: "full",
              name: "analysis_file",
              type: "file",
              infoType: "component",
              info: <ToolsUsedForAnalysis type="fault_tree" />,
            },
          ],
        },
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
        info: (
          <>Insights and improvements for future environmental management.</>
        ),
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
    title: "Attachments",
    inputs: [
      {
        label:
          "Photos / Diagrams / Witness Statements / Environmental Permits / Documentation",
        size: "full",
        name: "attachments",
        type: "file",
        multiple: true,
        optional: true,
        info: (
          <>
            Attach visual evidence of the incident scene.
            <br />
            Include accounts from witnesses.
            <br />
            Reference or attach relevant environmental permits or records.
          </>
        ),
      },
    ],
  },
];
