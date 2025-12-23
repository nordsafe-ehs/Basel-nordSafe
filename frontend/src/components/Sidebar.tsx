import { CloseRounded, LogoutRounded } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import { links } from "../data/Sidebar";
import LinkButton from "./LinkButton";
import { useTranslation } from "react-i18next";
import { useToken } from "../hooks/useToken";

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { t } = useTranslation();
  const { setToken, setActiveProject } = useToken();
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken(null);
    setActiveProject(null);
    navigate("/auth/login");
  };
  return (
    <>
      <Stack
        position="fixed"
        width={{ xs: "90%", sm: 300 }}
        height={"100vh"}
        px={2}
        m={3}
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
        bgcolor="#F0FFF8"
        pb={1}
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
          py={3}
          direction={"row"}
          mx="auto"
          sx={{
            textDecoration: "none",
            color: "primary.main",
            img: {
              maxWidth: 50,
              height: "unset",
              width: 1,
            },
          }}
        >
          <img
            src="/Nordsafe ehs logo.png"
            style={{ maxWidth: 200 }}
            width={"auto"}
            height={"auto"}
            alt="logo"
          />
          {/* <Typography fontWeight={700} fontSize={20} color="#172E4E">
            NordSafe EHS
          </Typography> */}
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
        <Stack spacing={1} mb={5}>
          {links.map((link) => (
            <LinkButton setOpen={setOpen} key={`${link.text}`} link={link} />
          ))}
        </Stack>

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

          <MenuItem
            onClick={handleLogout}
            sx={{
              gap: 1,
              paddingX: "8px",
              paddingY: "16px",
              alignItems: "center",
              marginBottom: 2,
              borderRadius: 1,
              color: "white",
              background: "#172E4E",
              fontWeight: "bold",
              svg: { fontSize: 20, color: "#0CB283" },
            }}
          >
            <LogoutRounded />
            {t("Logout")}
          </MenuItem>
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
