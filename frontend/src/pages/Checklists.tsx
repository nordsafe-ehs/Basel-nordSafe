// import { KeyboardArrowRightRounded } from "@mui/icons-material";
// import { Button, Stack, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useGetLink } from "../hooks/useGetLink";
// import { useTranslation } from "react-i18next";

// const Checklists = () => {
//   const link = useGetLink();
//   const {t} = useTranslation()

//   if (!link) return <Typography>{t("Something went wrong")}</Typography>;

//   return (
//     <>
//       <Stack gap={2}>
//         {link.links?.map(({ text, href }, i) => (
//           <Button
//             key={i}
//             to={href || ""}
//             component={Link}
//             sx={{
//               fontSize: 16,
//               justifyContent: "space-between",
//             }}
//             variant="outlined"
//           >
//             {text as string}
//             <KeyboardArrowRightRounded />
//           </Button>
//         ))}
//       </Stack>
//     </>
//   );
// };

// export default Checklists;


import { Tabs, Tab, Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useGetLink } from "../hooks/useGetLink";
import { useTranslation } from "react-i18next";

const Checklists = () => {
  const link = useGetLink();
  const { t } = useTranslation();
  const location = useLocation();

  if (!link) return <Typography>{t("Something went wrong")}</Typography>;

  const currentPath = location.pathname;

  return (
    <Box sx={{ p: 2 }}>
      <Tabs
        value={currentPath} // القيمة النشطة
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Checklist tabs"
        sx={{
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: 12,
            fontWeight: 500,
            color: "#172E4E",
            borderRadius: 2,
            px: 3,
            py: 1.5,
            mx: 1,
            border: "0.1px solid #E5Efff",
            transition: "0.3s",
          },
          "& .Mui-selected": {
            color: "#172E4E", // لون النص عند الضغط
            backgroundColor: "#F0FFF8", // لون الخلفية عند الضغط
          },
        }}
      >
        {link.links?.map(({ text, href }, i) => (
          <Tab
            key={i}
            label={text as string}
            value={href} // لازم نمرر نفس القيمة للـ Tab
            component={Link}
            to={href || ""}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default Checklists;
