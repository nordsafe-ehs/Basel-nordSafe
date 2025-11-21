import { DownloadRounded } from "@mui/icons-material";
import { SDS_FILE_BASE_URL } from "../../API_URL";
import { Action } from "../../types/Sidebar";

export const SDSActions: Action[] = [
  {
    icon: <DownloadRounded />,
    onClick: async ({ row: { fileName } }) => {
      const a = document.createElement("a");
      a.href = `${SDS_FILE_BASE_URL}/${fileName}`;
      a.download = fileName as string;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
  },
];
