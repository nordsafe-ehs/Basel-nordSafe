import { Input } from "../../types/Sidebar";

export const projectsInputs: Input[] = [
  {
    label: "Name",
    size: "half",
    name: "name",
    type: "text",
  },
  // {
  //   label: "Responsible Person",
  //   size: "half",
  //   name: "name",
  //   type: "text",
  // },
  {
    label: "Location",
    size: "full",
    name: "location",
    type: "location",
  },
];
