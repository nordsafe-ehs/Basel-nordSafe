import { Box, Collapse, Stack, Typography } from "@mui/material";
import { useState } from "react";
import assessmentMatrix from "../assets/Annotation 2025-12-18 205957.png";
import { useTranslation } from "react-i18next";

const RiskLevel = () => {
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
        {open ? "Hide" : "Show"} {t(" risk assessment matrix")}
      </Typography>
      <Collapse in={open}>
        <Stack
          direction="column-reverse"
          alignItems="start"
          gap={2}
          sx={{
            pt: 1,
            img: {
              width: 0.5,
              // borderLeft: "1px solid",
              
            },
          }}
        >
          <img src={assessmentMatrix} alt="" />
          <Typography
            width={0.5}
            fontSize={12}
            sx={{
              color: "secondary.main",
              b: {
                fontSize: 14,
                color: "primary.main",
              },
            }}
          >
            <b>{t("Risk Rating Score Explained")}</b>
            <br />
            {t(
              "The Risk Rating Score is determined by evaluating two key elements:"
            )}
            <br />• {t("Severity")}:{" "}
            {t(
              "How serious the outcome would be if the hazard occurs (e.g., injuries, damage, or harm)."
            )}
            <br />• {t("Likelihood")}:{" "}
            {t("The probability or chance of the hazard actually happening.")}
            <br />
            {t("The formula used to calculate the risk is:")}
            <br />
            {t("Risk Rating = Severity × Likelihood")}
            <br />
            {t("Important")}:{" "}
            {t(
              "Each task or activity must be individually analyzed to assign an appropriate risk level."
            )}
          </Typography>
        </Stack>
      </Collapse>
    </Box>
  );
};

export default RiskLevel;
