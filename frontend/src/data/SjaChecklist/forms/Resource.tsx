import { Input, LinkType } from "../../../types/Sidebar";
import ReasonsForJsa from "../../../components/ReasonsForJsa";

export const inputsResource: Input[] = [
  // {
  //   title: "Reasons for JSA",
  //   inputs: [
  //     {
  //       label: "Reason",
  //       size: "half",
  //       name: "reason_type",
  //       type: "radio",
  //       options: [
  //         { value: "new unfamiliar task", label: "New / unfamiliar task" },
  //         { value: "mixed teams", label: "Mixed teams" },
  //         { value: "changed conditions", label: "Changed conditions" },
  //         { value: "previous incidents", label: "Previous incidents" },
  //         { value: "audit requirement", label: "Audit requirement" },
  //       ],
  //     },
  //     {
  //       type: "custom",
  //       name: "risk_reference",
  //     },
  //   ],
  // },
];

export const resourceChecklist: LinkType = {
  text: "Reasons for JSA",
  href: "/safety-tools/resource", // صفحة واحدة فقط
  inputs: inputsResource,
  type: "custom", // 👈 مباشرة فورم/صفحة واحدة
  endpoint: "checklists",
  component: <ReasonsForJsa />, // 👈 يعرض الرموز والتفسيرات
};
