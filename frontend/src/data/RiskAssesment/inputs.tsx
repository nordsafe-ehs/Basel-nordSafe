import { Input } from "../../types/Sidebar";

export const riskInputs: Input[] = [
  {
    title: "Risk Evaluation (Base)",
    inputs: [
      {
        label: "Likelihood (L)",
        name: "likelihood", // 👈 مطابق للجدول
        size: "half",
        editable: true,
        options: ["Low", "Medium", "High"],
      },
      {
        label: "Severity (S)",
        name: "severity", // 👈 مطابق للجدول
        size: "half",
        editable: true,
        options: ["Minor", "Moderate", "Severe", "Fatal"],
      },
      {
        label: "Risk Score",
        name: "riskScore", // 👈 مطابق للجدول
        type: "number",
        size: "half",
        disabled: true,
      },
      {
        label: "Risk Level",
        name: "riskRating", // 👈 مطابق للجدول
        type: "text",
        size: "half",
        disabled: true,
      },
    ],
  },
  {
    title: "Risk Evaluation (Residual)",
    inputs: [
      {
        label: "Likelihood (L)",
        name: "residualLikelihood", // 👈 مطابق للجدول
        size: "half",
        editable: true,
        options: ["Low", "Medium", "High"],
      },
      {
        label: "Severity (S)",
        name: "residualSeverity", // 👈 مطابق للجدول
        size: "half",
        editable: true,
        options: ["Minor", "Moderate", "Severe", "Fatal"],
      },
      {
        label: "Risk Score",
        name: "residualRiskScore", // 👈 مطابق للجدول
        type: "number",
        size: "half",
        disabled: true,
      },
      {
        label: "Risk Level",
        name: "residualRiskRating", // 👈 مطابق للجدول
        type: "text",
        size: "half",
        disabled: true,
      },
    ],
  },
];
