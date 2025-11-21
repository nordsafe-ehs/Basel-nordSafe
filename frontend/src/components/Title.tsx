import { AddRounded, ListRounded } from "@mui/icons-material";
import {  Box, Button, Collapse, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LinkType } from "../types/Sidebar";
import { API_URL } from "../API_URL";
import { useToken } from "../hooks/useToken";
import { useTranslation } from "react-i18next";

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
        direction="row"
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

        <Typography variant="h4" fontWeight={700} color="secondary">
          {typeof text == "function" ? text(id as string) : text}{" "}
        </Typography>
        {(addHref || listHref || customButton || projects.length === 0) && (
          <Stack direction="row" spacing={1}>
            {(addHref || listHref || customButton) && (
              <Button
                variant="contained"
                component={Link}
                to={addHref || listHref || customButton?.href || "/"}
                sx={{ flexShrink: 0, gap: 1 }}
              >
                {addHref ? (
                  <>
                    {t("Add New Item")}
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
      {desc && (
        <Typography variant="body2" color="primary">
          {desc}
        </Typography>
      )}
      {features && (
        <>
          <Button
            onClick={() => setOpen(!open)}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ mt: 1 }}
          >
            {open ? "Hide" : "Show"} {t("Key features:")}
          </Button>
          <Collapse in={open}>
            <Typography variant="body2" color="primary" mt={1}>
              {t("Key features:")}{" "}
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
      )}
    </Box>
  );
};

export default Title;
