import { GridColDef, GridRowId } from "@mui/x-data-grid";
import { JSX, MouseEvent, ReactNode } from "react";

export interface Option {
  value?: string;
  label: string;
}
export interface FetchedOption {
  endpoint: string;
  name: string;
}
export interface Input {
  label?: string | ReactNode;
  size?: "half" | "full";
  name?: string;
  optional?: boolean;
  type?:
    | "text"
    | "select"
    | "custom"
    | "textarea"
    | "file"
    | "radio"
    | "date"
    | "time"
    | "password"
    | "number"
    | "location"
    | "assign"
    | "hidden"
    | "checkbox"
    | "signature";
  options?: Option[] | FetchedOption;
  onValue?: {
    [key: string]: Input[];
  };
  subTitle?: string;
  inputs?: Input[];
  title?: string;
  multiple?: boolean;
  info?: ReactNode;
  infoType?: "text" | "component";
  hideColumn?: boolean;
  assignRepetitive?: boolean;
  deletable?: boolean;
  repeatNumber?: number;
  parent?: Input;
  height?: "small" | "medium";
  readonly?: boolean;
  component?: ReactNode;
}
export interface Form {
  inputs: Input[];
}
export interface Row {
  id: string | number;
  [key: string]: string | number;
}
type AlertType = "success" | "error";
export interface Action {
  icon: ReactNode;
  onClick: ({
    row,
    token,
    reloadData,
    showAlert,
    closeAlert,
    activeProject,
    event,
  }: {
    row: Row;
    token: string | null;
    reloadData: () => void;
    showAlert: (message: string, severity?: AlertType) => void;
    closeAlert: () => void;
    activeProject: ActiveProject | null;
    event: MouseEvent;
  }) => void;
  color?: string;
}
export interface LinkType {
  text: string | ((text: string) => string);
  href?: string;
  links?: LinkType[];
  desc?: string;
  features?: string[];
  onClick?: () => void;
  inputs?: Input[];
  type?:
    | "home"
    | "form"
    | "list"
    | "custom"
    | "view"
    | "edit"
    | "links"
    | "project";
  columns?: GridColDef[];
  component?: ReactNode;
  endpoint?: "users" | "projects" | "sds" | "checklists" | "entrance-log";
  actions?: Action[];
  permissions?: ("admin" | "user" | "super-admin" | "visitor")[];
  hideOnSidebar?: boolean;
  addHref?: string;
  listHref?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataGridCustomProps?: any;
  layout?: ({ children }: { children: ReactNode }) => JSX.Element;
  icon?: ReactNode;
  viewLink?: (id: GridRowId) => string;
  editLink?: (id: GridRowId) => string;
  customButton?: {
    text: string;
    href: string;
    icon: ReactNode;
  };



 
  showOnBottomList?: boolean;
  // keyValueColors?: {
  //   key: string;
  //   values: {
  //     [key: string]: string;
  //   };
  // };
  hasNoLayout?: boolean;

  api?: {
    get: string;
    post?: string;
    put?: (id: any) => string;
    delete?: (id: any) => string;
  };

  transform?: (data: any) => any;
}

export interface ActiveProject {
  name: string;
  id: string;
}
