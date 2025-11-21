import RiskLevel from "../../components/RiskLevel";
import { Input } from "../../types/Sidebar";

export const hazardInputs: Input[] = [
  {
    title: "Deviation Details",
    inputs: [
      {
        label: "Date Observed",
        size: "half",
        name: "date_observed",
        type: "date",
      },
      {
        label: "Time Observed",
        size: "half",
        name: "time_observed",
        type: "time",
      },
      {
        label: "Description of the Deviation",
        size: "full",
        name: "description_of_deviation",
        type: "textarea",
        info: <>What was observed? Be specific.</>,
      },
      {
        label: "Type of Deviation",
        size: "full",
        name: "type_of_deviation",
        type: "select",
        options: [
          {
            label: "Safety",
            value: "safety",
          },
          {
            label: "Health",
            value: "health",
          },
          {
            label: "Environment",
            value: "environment",
          },
          {
            label: "Security",
            value: "security",
          },
        ],
        onValue: {
          safety: [
            {
              label: "Deviation Subtype",
              size: "full",
              name: "subtype",
              type: "select",
              options: [
                {
                  label: "Work at Height",
                },
                {
                  label: "Machinery and Equipment",
                },
                {
                  label: "Electrical Deviations",
                },
                {
                  label: "Traffic and Vehicle Safety",
                },
                {
                  label: "Fire and Explosion",
                },
                {
                  label: "Slips, Trips, and Falls",
                },
                {
                  label: "Confined Spaces",
                },
                {
                  label: "Deviationous Materials",
                },
                {
                  label: "Structural Collapse",
                },
                {
                  label: "Emergency Preparedness",
                },
                {
                  label: "Excavation and Groundwork Safety",
                },
                {
                  label: "Manual Handling and Ergonomics",
                },
                {
                  label: "Noise and Hearing Safety",
                },
                {
                  label: "Vibration Deviations",
                },
                {
                  label: "Road and Traffic Safety",
                },
                {
                  label: "PPE (Personal Protective Equipment) Deficiencies",
                },
                {
                  label: "Installing and Testing HV equipment",
                },
              ],
              onValue: {
                "Work at Height": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Falls: From scaffolds, ladders, roofs, or open edges.",
                      },
                      {
                        label:
                          "Falling Objects: Tools, materials, or debris from higher levels.",
                      },
                      {
                        label:
                          "Scaffolding Safety: Improper installation, load limits exceeded.",
                      },
                      {
                        label:
                          "Ladders: Improper use, broken or unstable ladders.",
                      },
                    ],
                  },
                ],
                "Machinery and Equipment": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Moving Machinery: Excavators, cranes, forklifts.",
                      },
                      {
                        label:
                          "Entanglement: Clothing or body parts caught in moving parts.",
                      },
                      {
                        label:
                          "Machine Guarding: Missing or broken safety guards.",
                      },
                      {
                        label: "Power Tools: Improper use or faulty tools.",
                      },
                    ],
                  },
                ],
                "Electrical Deviations": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "High Voltage Lines: Contact with overhead or underground cables.",
                      },
                      {
                        label: "Live Wires: Exposed or damaged wiring.",
                      },
                      {
                        label:
                          "Wet Conditions: Increased risk of electrocution in wet areas.",
                      },
                      {
                        label:
                          "Improper Lockout/Tagout: Failure to isolate power before maintenance.",
                      },
                    ],
                  },
                ],
                "Traffic and Vehicle Safety": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "On-Site Traffic: Collisions with vehicles or heavy machinery.",
                      },
                      {
                        label:
                          "Reversing Accidents: Lack of visibility or spotters.",
                      },
                      {
                        label: "Vehicle Maintenance: Faulty brakes or tires.",
                      },
                      {
                        label:
                          "Pedestrian Safety: Lack of clear walkways or barriers.",
                      },
                    ],
                  },
                ],
                "Fire and Explosion": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Hot Work: Welding, grinding, or cutting near flammable materials.",
                      },
                      {
                        label:
                          "Storage of Flammable Materials: Improper storage of fuels or gas cylinders.",
                      },
                      {
                        label:
                          "Ignition Sources: Faulty electrical equipment, open flames.",
                      },
                      {
                        label:
                          "Emergency Exits: Blocked or poorly marked escape routes.",
                      },
                    ],
                  },
                ],
                "Slips, Trips, and Falls": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Wet or Slippery Surfaces: From rain, spills, or cleaning.",
                      },
                      {
                        label:
                          "Uneven Terrain: Trenches, holes, or poorly leveled ground.",
                      },
                      {
                        label:
                          "Obstructions: Tools or materials left in walkways.",
                      },
                      {
                        label:
                          "Improper Footwear: Lack of slip-resistant boots.",
                      },
                    ],
                  },
                ],
                "Confined Spaces": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Deviationous Atmospheres: Lack of oxygen, toxic gases, or flammable vapors.",
                      },
                      {
                        label:
                          "Entrapment Risks: Limited access or egress points.",
                      },
                      {
                        label:
                          "Falling Deviations: Unsecured entry points or vertical shafts.",
                      },
                      {
                        label:
                          "Untrained Personnel: Entering without proper training or permits.",
                      },
                    ],
                  },
                ],
                "Deviationous Materials": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Cement Dust: Skin irritation or respiratory issues.",
                      },
                      {
                        label: "Silica Exposure: Cutting or drilling concrete.",
                      },
                      {
                        label: "Asbestos: During demolition or renovation.",
                      },
                      {
                        label:
                          "Chemical Storage: Improper handling or spillage of deviationous chemicals.",
                      },
                    ],
                  },
                ],
                "Structural Collapse": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Temporary Structures: Weak scaffolding or shoring systems.",
                      },
                      {
                        label:
                          "Excavation Collapse: Trenches or pits caving in.",
                      },
                      {
                        label:
                          "Overloading: Floors, beams, or supports unable to bear loads.",
                      },
                    ],
                  },
                ],
                "Emergency Preparedness": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Poorly Maintained Equipment: Fire extinguishers, alarms, or first aid kits.",
                      },
                      {
                        label:
                          "Lack of Emergency Drills: Unpreparedness for evacuation or rescue.",
                      },
                      {
                        label:
                          "Blocked Emergency Exits: Obstructions in escape routes.",
                      },
                      {
                        label:
                          "Untrained Response Teams: Lack of skills for handling emergencies.",
                      },
                    ],
                  },
                ],
                "Excavation and Groundwork Safety": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Trench Collapse: Unstable soil or lack of proper shoring.",
                      },
                      {
                        label:
                          "Underground Utilities: Contact with gas, water, or electrical lines.",
                      },
                      {
                        label:
                          "Heavy Equipment Operation: Collisions or tipping near excavations.",
                      },
                      {
                        label:
                          "Flooding: Accumulation of water in trenches or pits.",
                      },
                    ],
                  },
                ],
                "Manual Handling and Ergonomics": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Lifting Heavy Loads: Overexertion leading to injuries.",
                      },
                      {
                        label:
                          "Repetitive Movements: Tasks causing strain or musculoskeletal disorders.",
                      },
                      {
                        label:
                          "Awkward Postures: Working in tight or constrained areas.",
                      },
                      {
                        label:
                          "Improper Tools: Use of unsuitable or unsafe lifting equipment.",
                      },
                    ],
                  },
                ],
                "Noise and Hearing Safety": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Prolonged Exposure: Working near noisy machinery like jackhammers or compressors.",
                      },
                      {
                        label:
                          "Acute Noise Risks: Sudden loud blasts or equipment malfunctions.",
                      },
                      {
                        label:
                          "Hearing Protection: Inadequate or improper use of earplugs or earmuffs.",
                      },
                    ],
                  },
                ],
                "Vibration Deviations": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Hand-Arm Vibration Syndrome (HAVS): From prolonged use of vibrating tools.",
                      },
                      {
                        label:
                          "Whole-Body Vibration: Operating vehicles like excavators or loaders.",
                      },
                      {
                        label:
                          "Inadequate Tool Maintenance: Increased vibrations from worn-out equipment.",
                      },
                    ],
                  },
                ],
                "Road and Traffic Safety": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Roadside Work Zones: Collisions with passing vehicles.",
                      },
                      {
                        label:
                          "Traffic Management: Lack of proper signage or barriers.",
                      },
                      {
                        label:
                          "Vehicle Rollovers: On uneven or unstable terrain.",
                      },
                      {
                        label:
                          "Night Work: Visibility challenges and reduced reaction times.",
                      },
                    ],
                  },
                ],
                "PPE (Personal Protective Equipment) Deficiencies": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Improper Use: Workers not wearing PPE correctly.",
                      },
                      {
                        label:
                          "Lack of Availability: Insufficient supply of helmets, gloves, goggles, or boots.",
                      },
                      {
                        label:
                          "Damaged PPE: Using worn-out or non-compliant safety equipment.",
                      },
                    ],
                  },
                ],
                "Installing and Testing HV equipment": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label: "Arc Flash: Exposure to intense light and heat.",
                      },
                      {
                        label:
                          "Fires and Burns: Sparks igniting flammable materials.",
                      },
                      {
                        label:
                          "Toxic Fumes: Inhalation of gases from welding or cutting.",
                      },
                      {
                        label:
                          "PPE for Hot Work: Missing fire-resistant clothing or gloves.",
                      },
                    ],
                  },
                ],
              },
            },
          ],
          environment: [
            {
              label: "Deviation Subtype",
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
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Machinery Noise: From drills, jackhammers, or heavy vehicles.",
                      },
                      {
                        label:
                          "Explosions: Blasting for excavation or demolition.",
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
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Water Use: Over-extraction for construction processes.",
                      },
                      {
                        label:
                          "Energy Use: High fuel consumption by machinery.",
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
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Carbon Emissions: From construction machinery and transportation",
                      },
                      {
                        label:
                          "Urban Heat Island Effect: Lack of green spaces in urban construction",
                      },
                      {
                        label:
                          "Fossil Fuel Usage: Increased greenhouse gas emissions",
                      },
                      {
                        label:
                          "Decreased Carbon Sequestration: Removal of vegetation and trees",
                      },
                    ],
                  },
                ],
                "Deviationous Materials": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Asbestos: Release during demolition or renovation.",
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
                        label:
                          "Improper Disposal: Contaminating soil and water.",
                      },
                    ],
                  },
                ],
                "Stormwater Management": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Flooding: Poor drainage systems causing waterlogging.",
                      },
                      {
                        label:
                          "Erosion Control: Insufficient sediment barriers.",
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
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
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
                        label:
                          "Impact on Wildlife: Disrupting sensitive species.",
                      },
                    ],
                  },
                ],
                "Heat and Thermal Pollution": [
                  {
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
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
                        label:
                          "Loss of Green Space: Reduction in vegetation cover.",
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
                    label: "Deviation Subcategory",
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
                        label:
                          "Leakage Risks: From poorly maintained storage tanks.",
                      },
                    ],
                  },
                ],
              },
            },
          ],
          health: [
            {
              label: "Deviation Subtype",
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
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
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
                        label:
                          "Fatigue: From extended shifts or insufficient breaks",
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
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
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
                        label:
                          "Dust or Debris: Irritation from windblown particles",
                        value: "dust_or_debris",
                      },
                    ],
                  },
                ],
                "Hearing Deviations": [
                  {
                    label: "Deviation Subcategory",
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
                // "Fatigue and Overexertion": [
                //   {
                //     label: "Deviation Subcategory",
                //     size: "full",
                //     name: "subcategory",
                //     type: "select",
                //     options: [
                //       {
                //         label:
                //           "Long Shifts: Insufficient rest between workdays",
                //         value: "long_shifts",
                //       },
                //       {
                //         label:
                //           "Intense Physical Labor: Continuous lifting, carrying, or climbing",
                //         value: "intense_physical_labor",
                //       },
                //       {
                //         label:
                //           "Insufficient Hydration: Dehydration from high-energy tasks",
                //         value: "insufficient_hydration",
                //       },
                //       {
                //         label:
                //           "Sleep Deprivation: Impacting focus and reaction time",
                //         value: "sleep_deprivation",
                //       },
                //     ],
                //   },
                // ],
                // "Infectious Disease Deviations": [
                //   {
                //     label: "Deviation Subcategory",
                //     size: "full",
                //     name: "subcategory",
                //     type: "select",
                //     options: [
                //       {
                //         label:
                //           "Poor Hygiene Facilities: Lack of handwashing stations",
                //         value: "poor_hygiene_facilities",
                //       },
                //       {
                //         label:
                //           "Crowded Conditions: Shared spaces leading to the spread of illnesses",
                //         value: "crowded_conditions",
                //       },
                //       {
                //         label:
                //           "Exposure to Contaminated Surfaces: Lack of cleaning or sanitization",
                //         value: "exposure_to_contaminated_surfaces",
                //       },
                //       {
                //         label:
                //           "Airborne Pathogens: Inhalation of infectious agents",
                //         value: "airborne_pathogens",
                //       },
                //     ],
                //   },
                // ],
                // "Workplace Violence": [
                //   {
                //     label: "Deviation Subcategory",
                //     size: "full",
                //     name: "subcategory",
                //     type: "select",
                //     options: [
                //       {
                //         label: "Physical Altercations: Disputes among workers",
                //         value: "physical_altercations",
                //       },
                //       {
                //         label:
                //           "Verbal Abuse: Aggressive communication in high-stress situations",
                //         value: "verbal_abuse",
                //       },
                //       {
                //         label:
                //           "Security Breaches: Intruders or unauthorized personnel",
                //         value: "security_breaches",
                //       },
                //     ],
                //   },
                // ],
                // "Chronic Health Conditions": [
                //   {
                //     label: "Deviation Subcategory",
                //     size: "full",
                //     name: "subcategory",
                //     type: "select",
                //     options: [
                //       {
                //         label:
                //           "Cumulative Exposure: Long-term effects of dust, chemicals, or noise",
                //         value: "cumulative_exposure",
                //       },
                //       {
                //         label:
                //           "Cardiovascular Strain: From excessive physical demands",
                //         value: "cardiovascular_strain",
                //       },
                //       {
                //         label:
                //           "Chronic Respiratory Issues: Asthma or bronchitis from prolonged inhalation of irritants",
                //         value: "chronic_respiratory_issues",
                //       },
                //     ],
                //   },
                // ],
                "Confined Space Deviations": [
                  {
                    label: "Deviation Subcategory",
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
                    label: "Deviation Subcategory",
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
          ],
          security: [
            {
              label: "Deviation Subtype",
              size: "full",
              name: "subtype",
              type: "select",
              options: [
                {
                  label: "Unauthorized Access",
                },
                // {
                //   label: "Asset Security",
                // },
                {
                  label: "Cybersecurity",
                },
                // {
                //   label: "Workplace Violence",
                // },
                {
                  label: "Fire and Arson",
                },
                {
                  label: "Emergency Preparedness",
                },
                // {
                //   label: "Equipment Misuse",
                // },
                // {
                //   label: "Transportation Security",
                // },
                {
                  label: "Perimeter Breach",
                },
                // {
                //   label: "Public Safety and Security",
                // },
                {
                  label: "Document and Identity Security",
                },
                {
                  label: "Supply Chain Security",
                },
                // {
                //   label: "Personal Security",
                // },
                // {
                //   label: "Weather-Related Security Deviations",
                // },
                {
                  label: "Security Technology Failures",
                },
              ],
              onValue: {
                "Unauthorized Access": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Trespassing: Individuals entering the site without permission",
                      },
                      {
                        label:
                          "Theft of Equipment: Stealing tools, machinery, or materials",
                      },
                      // {
                      //   label:
                      //     "Vandalism: Damage to construction sites or facilities",
                      // },
                      // {
                      //   label:
                      //     "Site Intrusion: Breach by untrained or unauthorized personnel",
                      // },
                    ],
                  },
                ],
                // "Asset Security": [
                //   {
                //     label: "Deviation Subcategory",
                //     size: "full",
                //     name: "subcategory",
                //     type: "select",
                //     options: [
                //       {
                //         label:
                //           "Loss of Materials: Theft or misplacement of critical construction supplies",
                //       },
                //       {
                //         label:
                //           "Tampering with Equipment: Leading to malfunction or accidents",
                //       },
                //       {
                //         label:
                //           "Damage to Stored Assets: Weather, improper storage, or sabotage",
                //       },
                //     ],
                //   },
                // ],
                Cybersecurity: [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      // {
                      //   label:
                      //     "Hacking of Site Systems: Manipulation of automated or digital systems like cranes or lifts",
                      // },
                      {
                        label:
                          "Data Theft: Breach of sensitive project plans or client information",
                      },
                      {
                        label:
                          "Phishing Attacks: Fraudulent communication targeting site employees",
                      },
                      {
                        label:
                          "Unsecured Networks: Allowing unauthorized digital access",
                      },
                    ],
                  },
                ],
                // "Workplace Violence": [
                //   {
                //     label: "Deviation Subcategory",
                //     size: "full",
                //     name: "subcategory",
                //     type: "select",
                //     options: [
                //       {
                //         label:
                //           "Physical Altercations: Fights or assaults among workers",
                //       },
                //       {
                //         label:
                //           "Verbal Threats: Aggressive communication or bullying",
                //       },
                //       {
                //         label:
                //           "Armed Threats: Intruders with weapons or intent to harm",
                //       },
                //       {
                //         label:
                //           "Disputes with External Parties: Neighbors, passersby, or disgruntled vendors",
                //       },
                //     ],
                //   },
                // ],
                "Fire and Arson": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      // {
                      //   label:
                      //     "Intentional Fires: Sabotage or arson causing damage to property",
                      // },
                      {
                        label:
                          "Poor Security Measures: Allowing access to flammable materials",
                      },
                      {
                        label:
                          "Lack of Fire Watch Personnel: Failing to detect and respond to risks promptly",
                      },
                    ],
                  },
                ],
                "Emergency Preparedness": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Insufficient Evacuation Plans: For incidents like fires, floods, or security breaches",
                      },
                      {
                        label:
                          "Inadequate Emergency Communication: Delayed response to security risks",
                      },
                      {
                        label:
                          "Untrained Staff: Lack of knowledge on emergency response protocols",
                      },
                    ],
                  },
                ],
                // "Equipment Misuse": [
                //   {
                //     label: "Deviation Subcategory",
                //     size: "full",
                //     name: "subcategory",
                //     type: "select",
                //     options: [
                //       {
                //         label:
                //           "Unauthorized Operation: Untrained personnel using heavy machinery",
                //       },
                //       {
                //         label:
                //           "Sabotage of Equipment: Malicious damage to cranes, vehicles, or tools",
                //       },
                //       {
                //         label:
                //           "Neglecting Lockout/Tagout: Leading to unauthorized startup of machinery",
                //       },
                //     ],
                //   },
                // ],
                // "Transportation Security": [
                //   {
                //     label: "Deviation Subcategory",
                //     size: "full",
                //     name: "subcategory",
                //     type: "select",
                //     options: [
                //       {
                //         label:
                //           "Vehicle Theft: Stolen trucks, loaders, or other vehicles",
                //       },
                //       {
                //         label:
                //           "Hijacking of Deliveries: Materials or equipment taken during transit",
                //       },
                //       {
                //         label:
                //           "Unauthorized Drivers: Unregistered personnel operating site vehicles",
                //       },
                //     ],
                //   },
                // ],
                "Perimeter Breach": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Weak Fencing or Barriers: Allowing easy access to restricted zones",
                      },
                      {
                        label:
                          "Unsecured Access Points: Open gates or unmonitored entries",
                      },
                      {
                        label:
                          "Lack of Surveillance Systems: No cameras or sensors to detect breaches",
                      },
                    ],
                  },
                ],
                // "Public Safety and Security": [
                //   {
                //     label: "Deviation Subcategory",
                //     size: "full",
                //     name: "subcategory",
                //     type: "select",
                //     options: [
                //       {
                //         label:
                //           "Injury to Passersby: Deviations from falling objects or unsecured areas",
                //       },
                //       {
                //         label:
                //           "Interactions with Civilians: Conflicts or safety breaches involving the public",
                //       },
                //       {
                //         label:
                //           "Protests or Demonstrations: Disrupting construction activities",
                //       },
                //     ],
                //   },
                // ],
                "Document and Identity Security": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Fake IDs or Credentials: Unauthorized workers gaining access",
                      },
                      {
                        label:
                          "Loss of Sensitive Documents: Blueprints, permits, or contracts stolen",
                      },
                      {
                        label:
                          "Forgery: Manipulating official project documents or employee records",
                      },
                    ],
                  },
                ],
                "Supply Chain Security": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Theft in Transit: Materials stolen before reaching the site",
                      },
                      {
                        label:
                          "Supply Delays Due to Breach: Sabotage in the supply chain",
                      },
                      {
                        label:
                          "Counterfeit Products: Inferior materials substituted for authentic ones",
                      },
                    ],
                  },
                ],
                // "Personal Security": [
                //   {
                //     label: "Deviation Subcategory",
                //     size: "full",
                //     name: "subcategory",
                //     type: "select",
                //     options: [
                //       {
                //         label:
                //           "Worker Abductions: Targeting high-profile or vulnerable workers",
                //       },
                //       {
                //         label: "Harassment: Threats or intimidation on-site",
                //       },
                //       {
                //         label:
                //           "Lone Worker Risks: Security threats for individuals working in isolated areas",
                //       },
                //     ],
                //   },
                // ],
                // "Weather-Related Security Deviations": [
                //   {
                //     label: "Deviation Subcategory",
                //     size: "full",
                //     name: "subcategory",
                //     type: "select",
                //     options: [
                //       {
                //         label:
                //           "Storm Damage to Perimeters: Breached fences or damaged barriers",
                //       },
                //       {
                //         label:
                //           "Flood-Exposed Equipment: Unsecured machinery during adverse weather",
                //       },
                //       {
                //         label:
                //           "Site Power Loss: Increased vulnerability to theft or intrusion",
                //       },
                //     ],
                //   },
                // ],
                "Security Technology Failures": [
                  {
                    label: "Deviation Subcategory",
                    size: "full",
                    name: "subcategory",
                    type: "select",
                    options: [
                      {
                        label:
                          "Alarm System Malfunction: Failing to alert to breaches or risks",
                      },
                      {
                        label:
                          "Camera Failures: Blind spots or inoperative surveillance systems",
                      },
                      {
                        label:
                          "Unauthorized Deactivation: Intentional disabling of security measures",
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
  {
    title: "Safety Risk Assessment",
    inputs: [
      {
        label: "Likelihood",
        size: "full",
        name: "risk_likelihood",
        type: "radio",
        options: [
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ],
      },
      {
        label: "Severity",
        size: "full",
        name: "risk_severity",
        type: "radio",
        options: [
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ],
        infoType: "component",
        info: <RiskLevel />,
      },
    ],
  },
  {
    title: "Immediate Actions Taken",
    inputs: [
      {
        label: "Immediate Actions",
        size: "full",
        name: "immediate_actions",
        type: "select",
        options: [
          { label: "Area isolated" },
          { label: "Supervisor notified" },
          { label: "Temporary fix applied" },
          { label: "Equipment shut down" },
          { value: "other", label: "Other" },
        ],
        onValue: {
          other: [
            {
              label: "Specify Other",
              size: "full",
              name: "immediate_actions_other",
            },
          ],
        },
      },
    ],
  },
  {
    title: "Suggested Improvements / Preventive Measures",
    inputs: [
      {
        label: "Suggestions",
        size: "full",
        name: "suggested_improvements",
        type: "textarea",
        info: <>What can be done to prevent recurrence?</>,
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
