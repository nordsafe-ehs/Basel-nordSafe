import { GridColDef } from "@mui/x-data-grid";
import EntranceTimeInput from "../../components/EntranceTimeInput";

export const entranceLogColumns: GridColDef[] = [
  {
    field: "fullname",
  },
  {
    field: "inTime",
    headerName: "In time",
    valueGetter: (value) => (value ? new Date(value) : "-"),
  },
  {
    field: "outTime",
    headerName: "Out time",
    renderCell: (params) =>
      params.value == "-" ? (
        <EntranceTimeInput type="out" id={params.id} />
      ) : (
        <>{`${new Date(params.value)}`}</>
      ),
  },
  {
    field: "extraTime",
    headerName: "Extra time",
    renderCell: (params) => (
      <EntranceTimeInput
        type="extra"
        id={params.id}
        value={params.value == "-" ? "" : params.value}
      />
    ),
  },
];
