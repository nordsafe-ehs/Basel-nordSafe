import { Box, Stack, Typography } from "@mui/material";
import { ReactNode, useMemo } from "react";
import LinkButton from "../components/LinkButton";
import { links } from "../data/Sidebar";
import { useTranslation } from "react-i18next";

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  const link = useMemo(() => {
    return links.filter(({ href }) => href == "/company-settings")[0];
  }, []);

  const {t}= useTranslation()

  if (!link) return <Typography>{t("Something went wrong")}</Typography>;

  return (
    <>
      <Stack direction={{ xs: "column", md: "row" }} alignItems="start" gap={2}>
        <Stack
          p={1}
          borderRadius={1}
          boxShadow="inset 0px 0px 5px #3a765999"
          width={{ xs: 1, md: 250 }}
        >
          {link?.links?.map((link) => {
            return <LinkButton key={link.text as string} link={link} />;
          })}
        </Stack>
        <Box width={{ xs: 1, md: "calc(100% - 250px - 20px)" }}>{children}</Box>
      </Stack>
    </>
  );
};

export default SettingsLayout;
