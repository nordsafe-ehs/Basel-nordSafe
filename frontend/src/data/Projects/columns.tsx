import { GridColDef } from "@mui/x-data-grid";
import UserProjectSelector from "../../components/UserProjectSelector";

export const projectsColumns: GridColDef[] = [
  {
    minWidth: 250,
    field: "users",
    renderCell: (params) => {
      return <UserProjectSelector row={params.row} />;
    },
  },
];
