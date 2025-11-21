import {
  OpenInNewRounded,
  RemoveRedEyeRounded,
  ReportProblemRounded,
  ShieldRounded,
} from "@mui/icons-material";
import { Grid2, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../API_URL";
import { useToken } from "../hooks/useToken";

const data: {
  title: string;
  icon: ReactNode;
  chartType: "deviations" | "site-monitoring" | "case-investigations";
}[] = [
  {
    title: "Deviations",
    icon: <ReportProblemRounded />,
    chartType: "deviations",
  },
  {
    title: "Site Monitoring",
    icon: <RemoveRedEyeRounded />,
    chartType: "site-monitoring",
  },
  {
    title: "Cases Investigations",
    icon: <ShieldRounded />,
    chartType: "case-investigations",
  },
];

const Home = () => {
  
  const [numbers, setNumbers] = useState<{
    deviations: number;
    "site-monitoring": number;
    "case-investigations": number;
  }>({
    deviations: 0,
    "site-monitoring": 0,
    "case-investigations": 0,
  });
  const { token, activeProject } = useToken();


  useEffect(() => {
    (async () => {
      const res = await fetch(
        `${API_URL}/companies?projectId=${activeProject?.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) return;
      setNumbers(data);
    })();
  }, [activeProject, token]);

  return (
    <>
      {/* <Typography>System messages</Typography>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
        obcaecati unde dolor ipsam quaerat inventore suscipit voluptate a labore
        blanditiis provident incidunt sunt laudantium dolores ex! Tempora dicta
        enim vel.
      </Typography> */}
      <Grid2 container spacing={2} mt={2}>
        {data.map(({ icon, title, chartType }, index) => (
          <Grid2 size={{xs: 12, sm: 6, md: 4}} key={index}>
            <Stack
              sx={{
                width: 1,
                height: 1,
                p: 2,
                alignItems: "center",
                gap: 1,
                flexDirection: "column",
                border: "2px solid",
                borderColor: "primary.main",
                borderRadius: 1,
                position: "relative",
                " > svg": {
                  fontSize: 50,
                  color: "primary.main",
                },
              }}
            >
              {icon}
              <Typography
                color="primary"
                fontSize={20}
                textAlign="center"
                fontWeight={700}
              >
                {title}
              </Typography>
              <Typography color="primary" fontWeight={900} fontSize={16}>
                {numbers[chartType]}
              </Typography>
              <Tooltip title="More details" followCursor>
                <IconButton
                  component={Link}
                  to={"/chart/" + chartType}
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    borderRadius: 0,
                    borderStartEndRadius: 5,
                    borderEndStartRadius: 10,
                    color: "white",
                    bgcolor: "primary.main",
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
                  }}
                >
                  <OpenInNewRounded />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
};

export default Home;
