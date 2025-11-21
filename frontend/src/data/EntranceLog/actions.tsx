import { DeleteRounded } from "@mui/icons-material";
import { API_URL } from "../../API_URL";
import { Action } from "../../types/Sidebar";

export const usersActions: Action[] = [
  {
    icon: <DeleteRounded />,
    onClick: async ({ row, token, reloadData, closeAlert, showAlert }) => {
      closeAlert();
      const res = await fetch(API_URL + "/users?id=" + row.id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      showAlert(
        data.message || "User deleted successfully",
        res.ok ? "success" : "error"
      );
      if (!res.ok) return;

      reloadData();
    },
    color: "red",
  },
];
