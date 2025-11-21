import { DeleteRounded, QrCodeRounded } from "@mui/icons-material";
import QRCode from "qrcode";
import { API_URL } from "../../API_URL";
import { Action } from "../../types/Sidebar";

export const projectsActions: Action[] = [
  {
    icon: <DeleteRounded />,
    onClick: async ({
      row,
      token,
      reloadData,
      closeAlert,
      showAlert,
      activeProject,
    }) => {
      if (activeProject?.id == row.id)
        return showAlert("You can't delete the active project", "error");

      closeAlert();
      const res = await fetch(API_URL + "/projects?id=" + row.id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      showAlert(
        data.message || "Project deleted successfully",
        res.ok ? "success" : "error"
      );
      if (!res.ok) return;

      reloadData();
    },
    color: "red",
  },
  {
    icon: <QrCodeRounded />,
    onClick: async ({ row }) => {
      // @ts-expect-error 123
      const qrCodeUrl = await QRCode.toDataURL(row.id, {
        color: { dark: "#000000", light: "#ffffff" },
      });
      const link = document.createElement("a");
      // @ts-expect-error 123
      link.href = qrCodeUrl;
      link.download = "project-qr-code.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    color: "blue",
  },
];
