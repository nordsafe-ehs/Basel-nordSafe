import IncidentsTypesDetails from "../../../components/IncidentsTypesDetails";
import ToolsUsedForAnalysis from "../../../components/ToolsUsedForAnalysis";
import { Input } from "../../../types/Sidebar";

export const safetyInputs: Input[] = [
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
            value: "near_miss",
            label: "Near Miss",
          },
          {
            value: "first_aid",
            label: "First Aid",
          },
          {
            value: "lost_time_injury",
            label: "Lost Time Injury",
          },
          {
            value: "equipment_damage",
            label: "Equipment Damage",
          },
          {
            value: "environmental_spill",
            label: "Environmental Spill",
          },
          {
            value: "property_damage",
            label: "Property Damage",
          },
        ],
        info: <IncidentsTypesDetails />,
        infoType: "component",
      },
      {
        label: "Incident Subtype",
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
              label: "Incident Subcategory",
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
                  label: "Ladders: Improper use, broken or unstable ladders.",
                },
              ],
            },
          ],
          "Machinery and Equipment": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label: "Moving Machinery: Excavators, cranes, forklifts.",
                },
                {
                  label:
                    "Entanglement: Clothing or body parts caught in moving parts.",
                },
                {
                  label: "Machine Guarding: Missing or broken safety guards.",
                },
                {
                  label: "Power Tools: Improper use or faulty tools.",
                },
              ],
            },
          ],
          "Electrical Deviations": [
            {
              label: "Incident Subcategory",
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
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "On-Site Traffic: Collisions with vehicles or heavy machinery.",
                },
                {
                  label: "Reversing Accidents: Lack of visibility or spotters.",
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
              label: "Incident Subcategory",
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
              label: "Incident Subcategory",
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
                  label: "Obstructions: Tools or materials left in walkways.",
                },
                {
                  label: "Improper Footwear: Lack of slip-resistant boots.",
                },
              ],
            },
          ],
          "Confined Spaces": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Deviationous Atmospheres: Lack of oxygen, toxic gases, or flammable vapors.",
                },
                {
                  label: "Entrapment Risks: Limited access or egress points.",
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
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label: "Cement Dust: Skin irritation or respiratory issues.",
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
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Temporary Structures: Weak scaffolding or shoring systems.",
                },
                {
                  label: "Excavation Collapse: Trenches or pits caving in.",
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
              label: "Incident Subcategory",
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
              label: "Incident Subcategory",
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
                  label: "Flooding: Accumulation of water in trenches or pits.",
                },
              ],
            },
          ],
          "Manual Handling and Ergonomics": [
            {
              label: "Incident Subcategory",
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
              label: "Incident Subcategory",
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
              label: "Incident Subcategory",
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
              label: "Incident Subcategory",
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
                  label: "Vehicle Rollovers: On uneven or unstable terrain.",
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
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label: "Improper Use: Workers not wearing PPE correctly.",
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
              label: "Incident Subcategory",
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
      {
        label: "Description of the Incident",
        size: "full",
        name: "incident_description",
        type: "textarea",
        info: <>Provide a detailed narrative of the incident here.</>,
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
    title: "Incident Analysis",
    inputs: [
      {
        label: "Timeline of Events",
        size: "full",
        name: "timeline_of_events",
        type: "textarea",
        info: (
          <>
            Provide a sequential breakdown of events leading up to the incident.
          </>
        ),
      },
      {
        subTitle: "Root Cause Analysis",
        inputs: [
          {
            label: "Immediate Causes",
            size: "full",
            name: "immediate_causes",
          },
        ],
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
    title: "Conclusion",
    inputs: [
      {
        subTitle: "Incident Classification",
        inputs: [
          {
            label: "Severity",
            size: "full",
            name: "severity",
          },
        ],
      },
      {
        label: "Lessons Learned",
        size: "full",
        name: "lessons_learned",
        type: "textarea",
        info: <>Key takeaways for improving safety processes.</>,
      },
      {
        subTitle: "Final Report Approval",
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
    ],
  },
  {
    title: "Attachments",
    inputs: [
      {
        label:
          "Documents (Risk Assessments, Checklists, Permits) / Photos / Diagrams / Witness Statements",
        size: "full",
        name: "attachments",
        type: "file",
        multiple: true,
        optional: true,
        info: (
          <>
            Attach risk assessments, safety checklists, and permits.
            <br />
            Attach visual evidence of the incident scene.
            <br />
            Include signed accounts from witnesses.
          </>
        ),
      },
    ],
  },
];
