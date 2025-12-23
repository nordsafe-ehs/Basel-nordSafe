import {
  KeyboardArrowDownRounded,
  KeyboardArrowRightRounded,
  MenuRounded,
  QrCodeScannerRounded,
  SettingsRounded,
} from "@mui/icons-material";
import {
  Box,
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
    // {
    //   text: "Logout",
    //   to: "/auth/login",
    //   onClick: () => {
    //     setToken(null);
    //     setActiveProject(null);
    //   },
    //   //icon: <LogoutRounded />,
    // },
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
        <Typography
          display={{ xs: "none", lg: "block" }}
          mx="auto"
          fontSize={20}
          textTransform="capitalize"
          sx={{
            backgroundColor: "#F0FFF8",
            color: "#172E4E",
            fontWeight: "bold",
            padding: "8px",
            paddingX: "60px",
            borderRadius: "10px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          {t("Where Innovation Meets")}{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg, #0064FF, #36D399)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
            }}
          >
            {t("Sustainability")}
          </Box>
        </Typography>
        <Stack direction="row" sx={{ margin: 2 }} gap={0.5}>
          <Typography variant="h6" sx={{background:'#F0FFF8' , fontSize:'18px' ,p:'5px '}}>STR Company</Typography>
          <Button
          
            variant="outlined"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ width: 150, justifyContent: "space-between"  }}
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
              sx={{ color: "#172E4E", backgroundColor: "#F0FFF8" }}
              component={Link}
              to="/qr-reader"
            >
              <QrCodeScannerRounded />
            </IconButton>

            <Button
              variant="outlined"
              onClick={(e) => setLanguageAnchorEl(e.currentTarget)}
              sx={{
                width: 80,
                color: "black",
                backgroundColor: "#F0FFF8",
                justifyContent: "space-between",
              }}
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
        
      </Stack>

      
    </>
  );
};

export default Header;


// #0064FF
// #36D399   #172E4E  #0CB283 

//  <Box width="100%" display="flex" justifyContent="flex-end" mt={2}>
        //   <Stack
        //     direction={{ xs: "column", sm: "row" }} // عمودي في الموبايل، أفقي في الشاشات الأكبر
        //     spacing={{ xs: 1, sm: 2, md: 3 }} // مسافات أصغر في الموبايل وأكبر في الديسكتوب
        //     mb={2}
        //   >
        //     <Button
        //       variant="outlined"
        //       component={Link}
        //       to="/company-settings/projects"
        //       endIcon={<ApartmentRounded />}
        //       sx={{
        //         background: "#F0FFF8",
        //         color: "#172E4E",
        //         minWidth: { xs: 100, sm: 120, md: 140 }, // ← يتغير حسب حجم الشاشة
        //         fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
        //         p: { xs: 0.5, sm: 1 },
        //         borderRadius: 3,
        //       }}
        //     >
        //       Project
        //     </Button>

        //     <Button
        //       variant="outlined"
        //       component={Link}
        //       to="/company-settings/users"
        //       endIcon={<GroupRounded />}
        //       sx={{
        //         background: "#F0FFF8",
        //         color: "#172E4E",
        //         minWidth: { xs: 100, sm: 120, md: 140 },
        //         fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
        //         p: { xs: 0.5, sm: 1 },
        //         borderRadius: 3,
        //       }}
        //     >
        //       Users
        //     </Button>

        //     <Button
        //       variant="outlined"
        //       component={Link}
        //       to="/company-settings/subscription"
        //       endIcon={<ReceiptLongRounded />}
        //       sx={{
        //         background: "#F0FFF8",
        //         color: "#172E4E",
        //         minWidth: { xs: 100, sm: 120, md: 140 },
        //         fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
        //         p: { xs: 0.5, sm: 1 },
        //         borderRadius: 3,
        //       }}
        //     >
        //       Subscription
        //     </Button>

        //     <Button
        //       variant="contained"
        //       component={Link}
        //       to="/company-settings/projects"
        //       endIcon={<AddRounded />}
        //       sx={{
        //         background: "#172E4E",
        //         color: "#FFFFFF",
        //         minWidth: { xs: 100, sm: 120, md: 140 },
        //         fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
        //         p: { xs: 0.5, sm: 1 },
        //         borderRadius: 3,
        //       }}
        //     >
        //       Add New Project
        //     </Button>
        //   </Stack>
        // </Box>
