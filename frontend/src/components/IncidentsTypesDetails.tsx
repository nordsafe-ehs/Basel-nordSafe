import { Box, Collapse, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const list = [
  <>
    <b>{i18n.t("Near Miss")}</b>
    {i18n.t("Near Miss Description")}
  </>,
  <>
    <b>{i18n.t("First Aid")}</b>
    {i18n.t("First Aid Description")}
  </>,
  <>
    <b>{i18n.t("Lost Time Injury (LTI)")}</b>
    {i18n.t("Lost Time Injury Description")}
  </>,
  <>
    <b>{i18n.t("Equipment Damage")}</b>
    {i18n.t("Equipment Damage Description")}
  </>,
  <>
    <b>{i18n.t("Environmental Spill")}</b>
    {i18n.t("Environmental Spill Description")}
  </>,
  <>
    <b>{i18n.t("Property Damage")}</b>
    {i18n.t("Property Damage Description")}
  </>,
];

const IncidentsTypesDetails = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        onClick={() => setOpen(!open)}
        color="primary"
        fontSize={12}
        sx={{
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        {open ? "Hide" : "Show"} more details
      </Typography>
      <Collapse
        in={open}
        component="ul"
        sx={{
          pl: 2,
        }}
      >
        {list.map((item) => (
          <Typography
            key={`${item}`}
            component="li"
            fontSize={12}
            sx={{
              color: "secondary.main",
              b: {
                fontSize: 14,
                color: "primary.main",
              },
            }}
          >
            {item}
          </Typography>
        ))}
      </Collapse>
    </Box>
  );
};

export default IncidentsTypesDetails;
