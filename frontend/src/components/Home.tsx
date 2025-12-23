// import {
//   OpenInNewRounded,
//   RemoveRedEyeRounded,
//   ReportProblemRounded,
//   ReportProblemIcon,
// } from "@mui/icons-material";
// import {
//   Avatar,
//   Box,
//   Grid2,
//   IconButton,
//   Stack,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import { ReactNode, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { API_URL } from "../API_URL";
// import { useToken } from "../hooks/useToken";
// import { MyPie } from "./Nivo/PieCart";
// import DescriptionIcon from "@mui/icons-material/Description";
// import { MyLine, StatisticalReports } from "./Nivo/LineChart";
// import List from "./List";

// const data: {
//   title: string;
//   icon: ReactNode;
//   chartType: "deviations" | "site-monitoring" | "case-investigations";
//   bgcolor: string;
// }[] = [
//   {
//     title: "Deviations",
//     icon: (
//       <Avatar sx={{ color: "black", width: 50, height: 50 }}>
//         <ReportProblemRounded sx={{ fontSize: 40 }} />
//       </Avatar>
//     ),
//     chartType: "deviations",
//     bgcolor: "#F0FFF8 ",
//   },
//   {
//     title: "Site Monitoring",
//     icon: (
//       <Avatar
//         sx={{ background: "#F0FFF8", color: "#36D399", width: 50, height: 50 }}
//       >
//         <RemoveRedEyeRounded sx={{ fontSize: 40 }} />
//       </Avatar>
//     ),

//     chartType: "site-monitoring",
//     bgcolor: "#FFFFFF",
//   },
//   {
//     title: "Cases Investigations",
//     icon: (
//       <Avatar
//         sx={{ background: "#F0FFF8", color: "#36D399", width: 50, height: 50 }}
//       >
//         <DescriptionIcon sx={{ fontSize: 40 }} />
//       </Avatar>
//     ),
//     chartType: "case-investigations",
//     bgcolor: "#FFFFFF",
//   },
// ];

// const Home = () => {
//   const [numbers, setNumbers] = useState<{
//     deviations: number;
//     "site-monitoring": number;
//     "case-investigations": number;
//   }>({
//     deviations: 0,
//     "site-monitoring": 0,
//     "case-investigations": 0,
//   });
//   const { token, activeProject } = useToken();

//   useEffect(() => {
//     (async () => {
//       const res = await fetch(
//         `${API_URL}/companies?projectId=${activeProject?.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await res.json();
//       if (!res.ok) return;
//       setNumbers(data);
//     })();
//   }, [activeProject, token]);

//   // services/riskAssessmentAPI.ts
//   // export async function fetchRiskAssessments(token: string, projectId: number) {
//   //   const res = await fetch(
//   //     `${API_URL}/risk-assessment?projectId=${projectId}`,
//   //     {
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //       },
//   //     }
//   //   );

//   //   if (!res.ok) throw new Error("Failed to fetch risk assessments");
//   //   return await res.json();
//   // }

//   return (
//     <>
//       {/* <Typography>System messages</Typography>
//       <Typography>
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
//         obcaecati unde dolor ipsam quaerat inventore suscipit voluptate a labore
//         blanditiis provident incidunt sunt laudantium dolores ex! Tempora dicta
//         enim vel.
//       </Typography> */}
//       <Grid2 container spacing={2} mt={2}>
//         {data.map(({ icon, title, chartType }, index) => (
//           <Grid2
//             bgcolor={
//               chartType === "site-monitoring"
//                 ? "#FFFFFF"
//                 : chartType === "case-investigations"
//                 ? "#FFFFFF"
//                 : "#F0FFF8 "
//             }
//             size={{ xs: 12, sm: 6, md: 4 }}
//             key={index}
//           >
//             <Stack
//               sx={{
//                 width: 1,
//                 height: "auto",
//                 p: 2,
//                 alignItems: "center",
//                 gap: 1,
//                 flexDirection: "column",
//                 border: "0.1px solid #E5EFFF",
//                 //borderColor: "primary.main",
//                 borderRadius: 1,
//                 position: "relative",
//                 " > svg": {
//                   fontSize: 50,
//                   color: "primary.main",
//                 },
//               }}
//             >
//               {/* {icon}
//               <Typography
//                 color="#172E4E"
//                 fontSize={20}
//                 textAlign="center"
//                 fontWeight={700}
//               >
//                 {title}
//               </Typography> */}
//               {chartType === "deviations" ? (
//                 <Stack direction="row" alignItems="center" spacing={1}>
//                   {icon}
//                   <Typography color="#172E4E" fontSize={20} fontWeight={700}>
//                     {title}
//                   </Typography>
//                 </Stack>
//               ) : (
//                 <>
//                   {icon}
//                   <Typography
//                     color="#172E4E"
//                     fontSize={20}
//                     textAlign="center"
//                     fontWeight={700}
//                   >
//                     {title}
//                   </Typography>
//                 </>
//               )}

//               {/* <Typography color="#172E4E" fontWeight={900} fontSize={16}>
//                 {numbers[chartType]}
//               </Typography> */}
//               {/*  PieChart داخل بطاقة Deviations فقط */}
//               {chartType === "deviations" && (
//                 <Box   width={1}>
//                   <MyPie  deviation={numbers.deviations} />
//                   <Stack
//                     direction="row"
//                     alignItems="center"
//                     justifyContent="end"
//                     spacing={1}
//                     mt={25}
//                   >
//                     <Typography
//                       fontSize={14}
//                       fontWeight={500}
//                       color="success.main"
//                       sx={{ marginTop: "12px" }}
//                     >
//                       Increased from last month +12%
//                     </Typography>
//                     <Box
//                       component="span"
//                       sx={{
//                         width: 0,
//                         height: 0,
//                         borderLeft: "6px solid transparent",
//                         borderRight: "6px solid transparent",
//                         borderBottom: "10px solid",
//                         borderBottomColor: "success.main",
//                       }}
//                     />
//                   </Stack>
//                 </Box>
//               )}

//               {chartType === "case-investigations" && (
//                 <Typography
//                   fontSize={14}
//                   fontWeight={500}
//                   color="#172E4E"
//                   mt={1}
//                 >
//                   Increased from last month
//                 </Typography>
//               )}

//               <Tooltip title="More details" followCursor>
//                 <IconButton
//                   component={Link}
//                   to={"/chart/" + chartType}
//                   sx={{
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     borderRadius: 0,
//                     borderStartEndRadius: 5,
//                     borderEndStartRadius: 10,
//                     color: "#36D399",
//                     bgcolor: "#F0FFF8",
//                     "&:hover": {
//                       bgcolor: "primary.main",
//                     },
//                   }}
//                 >
//                   <OpenInNewRounded />
//                 </IconButton>
//               </Tooltip>
//             </Stack>
//           </Grid2>
//         ))}
//         <Box width={1} mt={2}>
//           <Stack direction="column" spacing={2} alignItems="Start">
//             {/* <Typography
//               fontSize={20}
//               fontWeight={700}
//               color="#003f5c"
//               textAlign="center"
//             >
//               Statistical Reports
//             </Typography> */}
//             <Box width="100%" height={400}>
//               <StatisticalReports />
//             </Box>
//           </Stack>
//         </Box>

//         <Box width={1} mt={2}>
//           <Stack direction="column" spacing={2} alignItems="Start">
//             <Typography
//               fontSize={20}
//               fontWeight={700}
//               color="#003f5c"
//               textAlign="center"
//             >
//               Recent Report
//             </Typography>
//             <Box width="100%" height={400}>
//               <List />
//             </Box>
//           </Stack>
//         </Box>
//       </Grid2>
//     </>
//   );
// };

// export default Home;

import {
  OpenInNewRounded,
  RemoveRedEyeRounded,
  ReportProblemRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../API_URL";
import { useToken } from "../hooks/useToken";
import { MyPie } from "./Nivo/PieCart";
import DescriptionIcon from "@mui/icons-material/Description";
import { StatisticalReports } from "./Nivo/LineChart";
import List from "./List";

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
      <Grid2 container justifyContent={"start"} gap={3} mt={2}>
        {/* بطاقة Deviations بعرض كامل */}
        <Grid2 xs={12}>
          <Stack
            sx={{
              width: "380px",
              height: "460px",
              p: 4,
              alignItems: "center",
              gap: 1,
              flexDirection: "column",
              border: "0.1px solid #E5EFFF",
              borderRadius: "24px",
              bgcolor: "#F0FFF8 ",
              position: "relative",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              {/* <Avatar sx={{ color: "black", width: 50, height: 50 }}>
                <ReportProblemRounded sx={{ fontSize: 40 }} />
              </Avatar> */}
              <ReportProblemRounded sx={{ width: "45px", height: "45px" }} />
              <Typography color="#172E4E" fontSize={20} fontWeight={700}>
                Deviations
              </Typography>
            </Stack>

            <Box width={1}>
              <MyPie deviation={numbers.deviations} />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="end"
                spacing={1}
                mt={25}
              >
                <Typography
                  fontSize={14}
                  fontWeight={500}
                  color="success.main"
                  sx={{ marginTop: "12px" }}
                >
                  Increased from last month +12%
                </Typography>
                <Box
                  component="span"
                  sx={{
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderBottom: "10px solid",
                    borderBottomColor: "success.main",
                  }}
                />
              </Stack>
            </Box>

            <Tooltip title="More details" followCursor>
              <IconButton
                component={Link}
                to="/chart/deviations"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  borderRadius: 0,
                  borderStartEndRadius: 5,
                  borderEndStartRadius: 10,
                  color: "#36D399",
                  bgcolor: "#F0FFF8",
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

        {/* عمود يسار فيه Site و Cases فوق بعض */}
        <Grid2 xs={12} sm={8} md={8}>
          <Stack spacing={2}>
            {/* Site Monitoring */}
            <Stack
              sx={{
                width: "320px",
                height: "190px",
                p: 2,
                alignItems: "flex-start",
                gap: 1,
                flexDirection: "column",
                border: "0.2px solid #E5EFFF",
                borderRadius: "20px",
                position: "relative",
              }}
            >
              <Avatar
                sx={{
                  background: "#F0FFF8",
                  color: "#36D399",
                  width: 50,
                  height: 50,
                }}
              >
                <RemoveRedEyeRounded sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography
                color="#172E4E"
                fontSize={20}
                textAlign="center"
                fontWeight={700}
              >
                Site Monitoring
              </Typography>
              <Typography color="#172E4E" fontWeight={900} fontSize={20}>
                {numbers["site-monitoring"]}
              </Typography>
              <Tooltip title="More details" followCursor>
                <IconButton
                  component={Link}
                  to="/chart/site-monitoring"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    borderRadius: 0,
                    borderStartEndRadius: 5,
                    borderEndStartRadius: 10,
                    color: "#36D399",
                    bgcolor: "#F0FFF8",
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
                  }}
                >
                  <OpenInNewRounded />
                </IconButton>
              </Tooltip>
            </Stack>

            {/* Cases Investigations */}
            <Stack
              sx={{
                width: "320px",
                height: "199px",
                p: 2,
                alignItems: "flex-start",
                gap: 1,
                flexDirection: "column",
                border: "0.1px solid #E5EFFF",
                borderRadius: 1,
                position: "relative",
              }}
            >
              <Avatar
                sx={{
                  background: "#F0FFF8",
                  color: "#36D399",
                  width: 50,
                  height: 50,
                }}
              >
                <DescriptionIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography
                color="#172E4E"
                fontSize={20}
                textAlign="center"
                fontWeight={700}
              >
                Cases Investigations
              </Typography>
              <Typography color="#172E4E" fontWeight={900} fontSize={20}>
                {numbers["case-investigations"]}
              </Typography>
              <Typography fontSize={14} fontWeight={500} color="#172E4E" mt={1}>
                Increased from last month
              </Typography>
              <Tooltip title="More details" followCursor>
                <IconButton
                  component={Link}
                  to="/chart/case-investigations"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    borderRadius: 0,
                    borderStartEndRadius: 5,
                    borderEndStartRadius: 10,
                    color: "#36D399",
                    bgcolor: "#F0FFF8",
                    "&:hover": {
                      bgcolor: "primary.main",
                    },
                  }}
                >
                  <OpenInNewRounded />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Grid2>

        {/* عمود يمين فارغ */}
        <Grid2 xs={12} sm={4} md={4}>
          <h1>Basel</h1>
        </Grid2>

        {/* باقي الأقسام */}
        <Box width={1} mt={2}>
          <Stack direction="column" spacing={2} alignItems="Start">
            <Box width="100%" height={400}>
              <StatisticalReports />
            </Box>
          </Stack>
        </Box>

        <Box width={1} mt={2}>
          <Stack direction="column" spacing={2} alignItems="Start">
            <Typography
              fontSize={20}
              fontWeight={700}
              color="#003f5c"
              textAlign="center"
            >
              Recent Report
            </Typography>
            <Box width="100%" height={400}>
              <List />
            </Box>
          </Stack>
        </Box>
      </Grid2>
    </>
  );
};

export default Home;
