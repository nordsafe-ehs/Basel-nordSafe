import { CloseRounded } from "@mui/icons-material";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { links } from "../data/Sidebar";
import LinkButton from "./LinkButton";
import { useTranslation } from "react-i18next";

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Stack
        position="fixed"
        width={{ xs: 1, sm: 350 }}
        height={1}
        px={2}
        className="no-scroll"
        sx={{
          overflowY: "scroll",
          overflowX: "hidden",
          zIndex: 100,
          transition: "0.25s",
          transform: {
            xs: open ? "" : "translateX(-100%)",
            lg: "translateX(0)",
          },
        }}
        bgcolor="white"
        pb={2}
      >
        <IconButton
          sx={{
            position: "absolute",
            top: 30,
            right: 20,
            display: { lg: "none" },
          }}
          onClick={() => setOpen(false)}
        >
          <CloseRounded />
        </IconButton>
        <Stack
          component={Link}
          to="/"
          gap={1}
          alignItems="center"
          py={2}
          mx="auto"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            img: {
              maxWidth: 100,
              height: "unset",
              width: 1,
            },
          }}
        >
          <img src="/logo.jpg" width={363} height={67} alt="logo" />
          <Typography fontWeight={700} fontSize={20}>
            NordSafe EHS
          </Typography>
        </Stack>
        <Typography
          mb={2}
          display={{ lg: "none" }}
          textAlign="center"
          fontSize={20}
          color="secondary.main"
          textTransform="capitalize"
        >
          {t("Where Innovation Meets Sustainability")}{" "}
        </Typography>
        {links.map((link) => {
          return (
            <LinkButton setOpen={setOpen} key={`${link.text}`} link={link} />
          );
        })}
        <Stack mt="auto">
          <Divider sx={{ mb: 1 }} />
          {links
            .filter((link) => link.showOnBottomList)
            .map((link) => {
              return (
                <LinkButton
                  setOpen={setOpen}
                  key={`${link.text}`}
                  link={{ ...link, hideOnSidebar: false }}
                />
              );
            })}
        </Stack>
      </Stack>
      <Stack
        sx={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          position: "fixed",
          inset: 0,
          bgcolor: "#0002",
          zIndex: 99,
          transition: "0.25s",
          cursor: "pointer",
        }}
        onClick={() => setOpen(false)}
      ></Stack>
    </>
  );
};

export default Sidebar;
