import { Input } from "../../../types/Sidebar";

export const securityInputs: Input[] = [
  {
    title: "Incident Description",
    inputs: [
      {
        label: "Type of Security Incident",
        size: "full",
        name: "type_of_incident",
        type: "select",
        options: [
          { value: "theft", label: "Theft" },
          {
            value: "unauthorized_access",
            label: "Unauthorized Access",
          },
          { value: "cyber_breach", label: "Cybersecurity Breach" },
          { value: "other", label: "Other" },
        ],
        onValue: {
          other: [
            {
              label: "Other Security Incident",
              size: "full",
              name: "other_incident",
              type: "text",
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
            label: "Unauthorized Access",
          },
          {
            label: "Asset Security",
          },
          {
            label: "Cybersecurity",
          },
          {
            label: "Workplace Violence",
          },
          {
            label: "Fire and Arson",
          },
          {
            label: "Emergency Preparedness",
          },
          {
            label: "Equipment Misuse",
          },
          {
            label: "Transportation Security",
          },
          {
            label: "Perimeter Breach",
          },
          {
            label: "Public Safety and Security",
          },
          {
            label: "Document and Identity Security",
          },
          {
            label: "Supply Chain Security",
          },
          {
            label: "Personal Security",
          },
          {
            label: "Weather-Related Security Deviations",
          },
          {
            label: "Security Technology Failures",
          },
        ],
        onValue: {
          "Unauthorized Access": [
            {
              label: "Incident Subcategory",
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
                {
                  label:
                    "Vandalism: Damage to construction sites or facilities",
                },
                {
                  label:
                    "Site Intrusion: Breach by untrained or unauthorized personnel",
                },
              ],
            },
          ],
          "Asset Security": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Loss of Materials: Theft or misplacement of critical construction supplies",
                },
                {
                  label:
                    "Tampering with Equipment: Leading to malfunction or accidents",
                },
                {
                  label:
                    "Damage to Stored Assets: Weather, improper storage, or sabotage",
                },
              ],
            },
          ],
          Cybersecurity: [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Hacking of Site Systems: Manipulation of automated or digital systems like cranes or lifts",
                },
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
          "Workplace Violence": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Physical Altercations: Fights or assaults among workers",
                },
                {
                  label: "Verbal Threats: Aggressive communication or bullying",
                },
                {
                  label:
                    "Armed Threats: Intruders with weapons or intent to harm",
                },
                {
                  label:
                    "Disputes with External Parties: Neighbors, passersby, or disgruntled vendors",
                },
              ],
            },
          ],
          "Fire and Arson": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Intentional Fires: Sabotage or arson causing damage to property",
                },
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
              label: "Incident Subcategory",
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
          "Equipment Misuse": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Unauthorized Operation: Untrained personnel using heavy machinery",
                },
                {
                  label:
                    "Sabotage of Equipment: Malicious damage to cranes, vehicles, or tools",
                },
                {
                  label:
                    "Neglecting Lockout/Tagout: Leading to unauthorized startup of machinery",
                },
              ],
            },
          ],
          "Transportation Security": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Vehicle Theft: Stolen trucks, loaders, or other vehicles",
                },
                {
                  label:
                    "Hijacking of Deliveries: Materials or equipment taken during transit",
                },
                {
                  label:
                    "Unauthorized Drivers: Unregistered personnel operating site vehicles",
                },
              ],
            },
          ],
          "Perimeter Breach": [
            {
              label: "Incident Subcategory",
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
          "Public Safety and Security": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Injury to Passersby: Deviations from falling objects or unsecured areas",
                },
                {
                  label:
                    "Interactions with Civilians: Conflicts or safety breaches involving the public",
                },
                {
                  label:
                    "Protests or Demonstrations: Disrupting construction activities",
                },
              ],
            },
          ],
          "Document and Identity Security": [
            {
              label: "Incident Subcategory",
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
              label: "Incident Subcategory",
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
          "Personal Security": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Worker Abductions: Targeting high-profile or vulnerable workers",
                },
                {
                  label: "Harassment: Threats or intimidation on-site",
                },
                {
                  label:
                    "Lone Worker Risks: Security threats for individuals working in isolated areas",
                },
              ],
            },
          ],
          "Weather-Related Security Deviations": [
            {
              label: "Incident Subcategory",
              size: "full",
              name: "subcategory",
              type: "select",
              options: [
                {
                  label:
                    "Storm Damage to Perimeters: Breached fences or damaged barriers",
                },
                {
                  label:
                    "Flood-Exposed Equipment: Unsecured machinery during adverse weather",
                },
                {
                  label:
                    "Site Power Loss: Increased vulnerability to theft or intrusion",
                },
              ],
            },
          ],
          "Security Technology Failures": [
            {
              label: "Incident Subcategory",
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
      {
        label: "Description of the Incident",
        size: "full",
        name: "incident_description",
        type: "textarea",
      },
    ],
  },
  {
    title: "Incident Response",
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
        label: "Photos/Diagrams/Witness Statements/Security Logs or Reports",
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
            Reference or attach relevant documentation.
          </>
        ),
      },
    ],
  },
];
