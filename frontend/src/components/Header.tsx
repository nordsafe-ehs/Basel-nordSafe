import {
  KeyboardArrowDownRounded,
  KeyboardArrowRightRounded,
  LogoutRounded,
  MenuRounded,
  QrCodeScannerRounded,
  SettingsRounded,
} from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../API_URL";
import { useToken } from "../hooks/useToken";
import { Token } from "../types/Token";
import { useTranslation } from "react-i18next";

const Header = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { setToken, setActiveProject, decodedToken, activeProject, token } =
    useToken();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [projects, setProjects] = useState<{ id: string; name: string }[]>([]);
  const [projectsAnchorEl, setProjectsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const projectsMenuOpen = Boolean(projectsAnchorEl);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const languageMenuOpen = Boolean(languageAnchorEl);

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguageAnchorEl(null);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API_URL}/projects`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) setProjects(data);
    })();
  }, [token, pathname]);

  const links: {
    text: string;
    to: string;
    onClick?: () => void;
    icon: ReactNode;
    permissions?: Token["role"][];
  }[] = [
    {
      text: "Company settings",
      to: "/company-settings/projects",
      icon: <SettingsRounded />,
      permissions: ["admin", "super-admin"],
    },
    {
      text: "Logout",
      to: "/auth/login",
      onClick: () => {
        setToken(null);
        setActiveProject(null);
      },
      icon: <LogoutRounded />,
    },
  ];

  return (
    <>
      <Stack
        position="fixed"
        height={100}
        width={{ xs: 1, lg: "calc(100vw - 350px)" }}
        direction="row"
        alignItems="center"
        px={{ xs: 2, lg: 0 }}
        bgcolor="white"
        sx={{ right: 0 }}
        justifyContent="space-between"
      >
        <Stack direction="row" gap={0.5}>
          <Button
            variant="outlined"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ width: 150, justifyContent: "space-between" }}
          >
            {decodedToken.fullname}
            <KeyboardArrowDownRounded
              sx={{
                transform: menuOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s",
              }}
            />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
            slotProps={{
              paper: {
                sx: {
                  maxWidth: 300,
                  width: 1,
                },
              },
            }}
          >
            <MenuItem
              sx={{
                color: "primary.main",
                justifyContent: "space-between",
              }}
              onClick={(e) => setProjectsAnchorEl(e.currentTarget)}
            >
              Active Project: {activeProject?.name}{" "}
              <KeyboardArrowRightRounded />
            </MenuItem>
            <Divider />
            {links.map(({ text, to, onClick, icon, permissions }) =>
              permissions && !permissions.includes(decodedToken.role) ? (
                ""
              ) : (
                <MenuItem
                  key={text}
                  component={Link}
                  to={to}
                  onClick={() => {
                    setAnchorEl(null);
                    onClick?.();
                  }}
                  sx={{
                    gap: 1,
                    alignItems: "center",
                    color: "primary.main",
                    svg: {
                      fontSize: 17,
                      color: "primary.main",
                    },
                  }}
                >
                  {icon}
                  {text}
                </MenuItem>
              )
            )}
          </Menu>
          <Menu
            anchorEl={projectsAnchorEl}
            open={projectsMenuOpen}
            onClose={() => setProjectsAnchorEl(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                sx: {
                  minWidth: 180,
                },
              },
            }}
          >
            {projects.map((project) => (
              <MenuItem
                selected={activeProject?.id === project.id}
                key={project.id}
                onClick={() => {
                  setProjectsAnchorEl(null);
                  setAnchorEl(null);
                  setActiveProject({ name: project.name, id: project.id });
                  navigate(0);
                }}
                sx={{ textTransform: "capitalize" }}
              >
                {project.name}
              </MenuItem>
            ))}
          </Menu>
          <Tooltip title="Record a sign in/out">
            <IconButton
              sx={{ color: "primary.main" }}
              component={Link}
              to="/qr-reader"
            >
              <QrCodeScannerRounded />
            </IconButton>

            <Button
              variant="outlined"
              onClick={(e) => setLanguageAnchorEl(e.currentTarget)}
              sx={{ width: 120,color:"white" , background:"black" ,  justifyContent: "space-between" }}
            >
              {i18n.language.toUpperCase()}
              <KeyboardArrowDownRounded />
            </Button>
            <Menu
              anchorEl={languageAnchorEl}
              open={languageMenuOpen}
              onClose={() => setLanguageAnchorEl(null)}
              slotProps={{
                paper: {
                  sx: {
                    maxWidth: 200,
                    width: 1,
                  },
                },
              }}
            >
              <MenuItem onClick={() => handleLanguageChange("en")}>
                English
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("da")}>
                Denimark
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("fi")}>
                Finnish
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("lt")}>
                Italy
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("no")}>
                Norwije
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("pl")}>
                polanda
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange("sv")}>
                swedien
              </MenuItem>
            </Menu>
          </Tooltip>
        </Stack>
        <IconButton
          sx={{
            display: { lg: "none" },
          }}
          onClick={() => setOpen(true)}
        >
          <MenuRounded />
        </IconButton>
        <Typography
          display={{ xs: "none", lg: "block" }}
          mx="auto"
          fontSize={20}
          color="secondary.main"
          textTransform="capitalize"
        >
          {t("Where Innovation Meets Sustainability")}
        </Typography>
      </Stack>
    </>
  );
};

export default Header;
