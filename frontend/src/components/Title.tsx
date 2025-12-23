import { AddRounded, ListRounded, SettingsRounded } from "@mui/icons-material";
import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LinkType } from "../types/Sidebar";
import { API_URL } from "../API_URL";
import { useToken } from "../hooks/useToken";
import { useTranslation } from "react-i18next";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useLocation } from "react-router-dom";

const Title = ({
  text,
  desc,
  features,
  addHref,
  listHref,
  customButton,
}: {
  text: LinkType["text"];
  desc?: string;
  features?: string[];
  addHref?: string;
  listHref?: string;
  customButton?: LinkType["customButton"];
}) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { token } = useToken();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const [projects, setProjects] = useState([]);
  const [showNoProjectsAlert, setShowNoProjectsAlert] = useState(false);

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL + "/projects", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProjects(data);

      setShowNoProjectsAlert(data.length === 0);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!token) return;
    fetchProjects();
  }, [token]);

  return (
    <Box mb={2}>
      <Stack
        direction="column"
        spacing={1}
        justifyContent="space-between"
        alignItems="start"
        mb={0.5}
      >
        {/* {showNoProjectsAlert && (
          <Alert
            severity="error"
            action={
              <Button
                component={Link}
                to="/company-settings/projects/add"
                size="small"
                sx={{
                  background: "red",
                  "&:hover": { background: "#2e5f47" },
                  color: "white",
                  textTransform: "none",
                }}
                startIcon={<AddRounded />}
              >
                {t("Create New Project")}
              </Button>
            }
          >
            {t("No projects found. You can create one now!")}
          </Alert>
        )} */}

        <Typography
          variant="h4"
          fontWeight={700}
          color="secondary"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
          }}
        >
          {typeof text == "function" ? text(id as string) : text}{" "}
        </Typography>

        {desc && (
          <Typography
            variant="body2"
            color="primary"
            sx={{
              width: { xs: "100%", md: "70%" },
              fontSize: { xs: "0.8rem", md: "1rem" },
            }}
          >
            {desc}
          </Typography>
        )}
        {/* {(addHref || listHref || customButton || projects.length === 0) && (
          <Stack
            direction="row"
            justifyContent={"flex-end"}
            width={"100%"}
            spacing={1}
          >
            {(addHref || listHref || customButton) && (
              <Button
                variant="contained"
                component={Link}
                to={addHref || listHref || customButton?.href || "/"}
                sx={{ flexShrink: 0, gap: 1, background: "#172E4E" }}
              >
                {addHref ? (
                  <>
                    {t(`Add New ${text}`)}
                    <AddRounded />
                  </>
                ) : listHref ? (
                  <>
                    {t("View Items List")}
                    <ListRounded />
                  </>
                ) : (
                  <>
                    {customButton?.text}
                    {customButton?.icon}
                  </>
                )}
              </Button>
            )}
          </Stack>
        )}
        {features && (
          <>
            <Button
              onClick={() => setOpen(!open)}
              variant="text"
              color="#172E4E"
              size="small"
              sx={{
                mt: 1,
                width: "70%",
                display: "flex",
                justifyContent: "space-between", // يخلي النص يسار والأيقونة يمين
                alignItems: "center",
                background: "#F0FFF8",
              }}
            >
              <Typography variant="body2">{t("Key features")}</Typography>
              {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </Button>

            <Collapse in={open}>
              <Typography variant="body2" color="primary" mt={1}>
                {t("Key features ")}
              </Typography>
              <Box component="ul">
                {features.map((feature) => (
                  <Typography
                    key={feature}
                    component="li"
                    variant="body2"
                    color="primary"
                    ml={2}
                  >
                    {feature}
                  </Typography>
                ))}
              </Box>
            </Collapse>
          </>
        )} */}

        {/* {pathname !== "/company-settings/projects" && (
          <Box width="100%" textAlign="right">
            <Button
              component={Link}
              to="/company-settings/projects"
              endIcon={<AddRounded />}
              sx={{
                mb: 3,
                borderRadius: 2,
                background: "#172E4E",
                color: "#FFFFFF",
                width: { xs: "100%", sm: "auto" }, // 👈 في الموبايل ياخد كل العرض
                minWidth: 150,
                px: { xs: 1, md: 3 },
                fontSize: { xs: "0.8rem", md: "1rem" },
              }}
            >
              Add New Project
            </Button>
          </Box>
        )} */}

        {(features || addHref || listHref || customButton) && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            justifyContent="flex-end" // يخليهم جنب بعض من البداية
            width="100%"
            mt={1}
          >
            {/* زر Key Features */}
            {features && (
              <Button
                onClick={() => setOpen(!open)}
                variant="text"
                size="small"
                sx={{
                  flexShrink: 0,
                  gap: 1,
                  background: "#F0FFF8",
                  color: "#172E4E",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: { xs: "100%", sm: "70%" },
                }}
              >
                <Typography
                  sx={{
                    width: { xs: "100%", md: "70%" },
                    fontSize: { xs: "0.8rem", md: "1rem" },
                  }}
                  variant="body2"
                >
                  {t("Key features")}
                </Typography>
                <Box sx={{ ml: "auto" }}>
                  {open ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowRightIcon />
                  )}
                </Box>
              </Button>
            )}
            {/* زر Search For SDS (من customButton) */}
            {customButton && (
              <Button
                variant="contained"
                component={Link}
                to="/company-settings/projects"
                endIcon={<AddRounded />}
                sx={{
                  flexShrink: 0,
                  gap: 1,
                  background: "#172E4E",
                  color: "#FFFFFF",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                Add New Project
              </Button>
            )}

            {/* زر Add New أو List */}
            {(addHref || listHref || customButton) && (
              <Button
                variant="contained"
                component={Link}
                to={addHref || listHref || customButton?.href || "/"}
                sx={{
                  flexShrink: 0,
                  gap: 1,
                  background: "#172E4E",
                  width: { xs: "100%", sm: "auto" },
                }}
              >
                {addHref ? (
                  <>
                    {t(`Add New ${text}`)}
                    <AddRounded />
                  </>
                ) : listHref ? (
                  <>
                    {t("View Items List")}
                    <ListRounded />
                  </>
                ) : (
                  <>
                    {customButton?.text}
                    {customButton?.icon}
                  </>
                )}
              </Button>
            )}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default Title;





