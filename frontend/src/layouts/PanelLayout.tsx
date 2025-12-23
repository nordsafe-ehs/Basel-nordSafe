import { Box, Stack, Typography } from "@mui/material";
import { ReactNode, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Title from "../components/Title";
import { useGetLink } from "../hooks/useGetLink";
import { useTranslation } from "react-i18next";

const PanelLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const link = useGetLink();
  const {t} = useTranslation()

  if (!link) return <Typography>{t("Something went wrong")}</Typography>;

  return (
    <Stack
      direction="row"
      height="100vh"
      sx={{
        position: "relative",
      }}
    >
      <Box
        ml={{ xs: 0, lg: 35 }}
        mt={10}
        width={1}
        // boxShadow={{
        //   xs: "inset 0px 2px 2px #3a765944",
        //   lg: "inset 2px 2px 2px #3a765944",
        // }}
        p={2}
        className="scroll"
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          borderStartStartRadius: { xs: 0, lg: 10 },
        }}
      >
        <Title
          text={link.text}
          desc={link.desc}
          listHref={link.listHref}
          addHref={link.addHref}
          features={link.features}
          customButton={link.customButton}
        />
        {children}
      </Box>
      <Header setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
    </Stack>
  );
};

export default PanelLayout;
