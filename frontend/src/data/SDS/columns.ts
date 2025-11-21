import { GridColDef } from "@mui/x-data-grid";

export const SDSColumns: GridColDef[] = [
  { headerName: "Product Name", field: "product_name" },
  { headerName: "Product Code", field: "product_code" },
  {
    headerName: "Manufacturer Detail",
    field: "mfg_detail",
    valueFormatter: (v) => (v ? JSON.parse(v) : "-"),
  },
  { headerName: "Issue Date", field: "issue_date" },
  { headerName: "Country", field: "country" },
  { headerName: "Language", field: "lang" },
];
