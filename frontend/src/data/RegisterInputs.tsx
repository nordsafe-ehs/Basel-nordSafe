import { Input } from "../types/Sidebar";

export const registerInputs: Input[] = [
  {
    subTitle: "Company information:",
    inputs: [
      {
        label: "Company country",
        size: "half",
        name: "country",
        type: "select",
        optional:true,
        options: [
          {
            label: "Norway",
            value: "NO",
          },
          {
            label: "Denmark",
            value: "DK",
          },
          {
            label: "Finland",
            value: "FI",
          },
          {
            label: "Sweden",
            value: "SE",
          },
          {
            label: "United States",
            value: "US",
          },
          {
            label: "United Kingdom",
            value: "GB",
          },
          {
            label: "United Arab Emirates",
            value: "AE",
          },
        ],
        onValue: {
          NO: [
            {
              label: "Org number",
              size: "full",
              name: "orgNumber",
              type: "text",
            },
          ],
          DK: [
            {
              label: "CVR number",
              size: "full",
              name: "orgNumber",
              type: "text",
            },
          ],
          FI: [
            {
              label: "Business ID / Y-tunnus",
              size: "full",
              name: "orgNumber",
              type: "text",
            },
          ],
          SE: [
            {
              label: "Organizationsnummer",
              size: "full",
              name: "orgNumber",
              type: "text",
            },
          ],
          US: [
            {
              label: "EIN / Tax ID",
              size: "full",
              name: "orgNumber",
              type: "text",
            },
          ],
          GB: [
            {
              label: "Company number",
              size: "full",
              name: "orgNumber",
              type: "text",
            },
          ],
          AE: [
            {
              label: "TRN",
              size: "full",
              name: "orgNumber",
              type: "text",
            },
          ],
        },
      },
      {
        label: "Company name",
        size: "full",
        name: "name",
        type: "text",
        // readonly: true,
        // optional: true,
      },
      {
        label: "Company email",
        size: "full",
        name: "email",
        type: "text",
        // readonly: true,
        // optional: true,
      },
      {
        label: "Company phone number",
        size: "full",
        name: "phoneNumber",
        type: "text",
        // readonly: true,
        // optional: true,
      },
    ],
  },
  {
    subTitle: "Company address:",
    inputs: [
      {
        label: "Address 1",
        size: "half",
        name: "address1",
        type: "text",
      },
      {
        label: "Address 2 (optional)",
        size: "half",
        name: "address2",
        type: "text",
      },
      {
        label: "City",
        size: "half",
        name: "city",
        type: "text",
      },
      {
        label: "Zip code",
        size: "half",
        name: "zipCode",
        type: "text",
      },
    ],
  },
  {
    subTitle: "Admin information:",
    inputs: [
      {
        label: "Full name",
        size: "half",
        name: "fullname",
        type: "text",
      },
      {
        label: "Email",
        size: "half",
        name: "adminEmail",
        type: "text",
      },
      {
        label: "Job description",
        size: "half",
        name: "jobDesc",
      },
      {
        label: "Department",
        size: "half",
        name: "department",
      },
      {
        label: "Password",
        size: "half",
        name: "password",
        type: "password",
      },
      {
        label: "Confirm password",
        size: "half",
        name: "confirmPassword",
        type: "password",
      },
    ],
  },
  // {
  //   subTitle: "First project:",
  //   inputs: [
  //     {
  //       label: "Project name",
  //       size: "full",
  //       name: "projectName",
  //       type: "text",
  //     },
  //     {
  //       label: "Project location",
  //       size: "full",
  //       name: "projectLocation",
  //       type: "location",
  //     },
  //   ],
  // },
];
