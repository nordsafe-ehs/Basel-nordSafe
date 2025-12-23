import { ReactNode } from "react";
import { Input, LinkType } from "../types/Sidebar";

export const checkIsActive = ({
  links,
  href,
  pathname,
}: {
  links?: LinkType[];
  href?: string;
  pathname: string;
}) => {
  if (href == pathname) return true;
  if (!links) return false;
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (checkIsActive({ href: link.href, pathname, links: link.links }))
      return true;
  }
  return false;
};

export function flattenInputs(
  inputs: Input[],
  removeRepetitive: boolean = false
): Input[] {
  const result: Input[] = [];
  const seenNames = new Set<string | undefined>(); // Track unique names

  function traverse(inputs: Input[], parent: Input) {
    if (removeRepetitive)
      inputs = inputs.filter((input) => !input.assignRepetitive);
    for (const input of inputs) {
      const name = input.name;

      if (!name || !seenNames.has(name)) {
        result.push({ ...input, parent });
        if (name) seenNames.add(name);
      }

      if (Array.isArray(input.inputs)) {
        traverse(input.inputs, input);
      }

      if (input.onValue) {
        for (const key in input.onValue) {
          const branchInputs = input.onValue[key];
          if (Array.isArray(branchInputs)) {
            traverse(branchInputs, input);
          }
        }
      }
    }
  }

  traverse(inputs, {});

  return result.filter((input) => input.label && !input.hideColumn);
}

export const findRepetitiveGroup = (
  inputs: Input[],
  title: string
): Input | undefined => {
  for (const input of inputs) {
    if (input.title === title) return input;

    if (input.inputs) {
      const found = findRepetitiveGroup(input.inputs, title);
      if (found) return found;
    }
  }
  return undefined;
};

export const findLastRepeatedGroupsRepeatNumber = (
  inputs: Input[],
  title: string,
  repeatNumber: number = 1
): number => {
  for (const input of inputs) {
    if (input.title == title && input.repeatNumber)
      repeatNumber = input.repeatNumber + 1;

    if (input.inputs) {
      repeatNumber = findLastRepeatedGroupsRepeatNumber(
        input.inputs,
        title,
        repeatNumber
      );
    }
  }
  return repeatNumber;
};

const makeName = (label: string): string =>
  label.toLowerCase().replace(/\s+/g, "_");

export const createYesNoNaInput = (label: string): Input[] => {
  const name = makeName(label);
  return [
    {
      label,
      name: `${name}_choice`,
      type: "radio",
      size: "full",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
        { label: "N/A", value: "na" },
      ],
    },
    {
      label: "Comments",
      name: `${name}_comments`,
      type: "textarea",
      optional: true,
    },
  ];
};

export const createPendingDoneInput = (
  label: ReactNode,
  rawLabel: string
): Input => {
  const name = makeName(rawLabel);
  return {
    label,
    name,
    type: "radio",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Done", value: "done" },
    ],
  };
};

//new
export const createRiskLevelInput = (label: string): Input => {
  const name = makeName(label);
  return {
    label,
    name: `${name}_risk_level`,
    type: "radio",
    size: "full",
    options: [
      { label: "High", value: "high", color: "error" }, 
      { label: "Medium", value: "medium", color: "warning" }, 
      { label: "Low", value: "low", color: "success" }, 
    ],
  };
};
