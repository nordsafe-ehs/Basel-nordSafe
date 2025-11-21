import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const filesMap = {
  five_whys: "NordSafe – Five Whys Analysis Template.docx",
  fault_tree: "NordSafe – Fault Tree Analysis Template.docx",
  fishbone: "NordSafe – Fishbone Diagram (Ishikawa) Template.docx",
};

const ToolsUsedForAnalysis = ({
  type,
}: {
  type: "fishbone" | "five_whys" | "fault_tree";
}) => {
  const { t } = useTranslation();
  return (
    <Typography
      component={Link}
      target="_blank"
      color="primary"
      fontSize={12}
      to={"/" + filesMap[type]}
      download={filesMap[type]}
    >
      {t("Download the template")}
    </Typography>
  );
};

export default ToolsUsedForAnalysis;
