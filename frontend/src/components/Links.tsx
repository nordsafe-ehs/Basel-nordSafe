// import { KeyboardArrowRightRounded } from "@mui/icons-material";
// import { Button, Stack, Typography } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useGetLink } from "../hooks/useGetLink";
// import { useToken } from "../hooks/useToken";
// import { useTranslation } from "react-i18next";

// const Links = () => {
//   const link = useGetLink();
//   const { decodedToken } = useToken();
//   const {t} = useTranslation()

//   if (!link) return <Typography> {t("Something went wrong")}</Typography>;

//   return (
//     <>
//       <Stack gap={2}>
//         {link.links?.map(
//           ({ href, text, onClick, permissions }) =>
//             !(permissions && !permissions.includes(decodedToken.role)) && (
//               <Button
//                 {...(onClick
//                   ? { component: Button, onClick }
//                   : { component: Link, to: href })}
//                 fullWidth
//                 variant="outlined"
//                 onClick={() => onClick && onClick()}
//                 sx={{
//                   fontSize: 20,
//                   justifyContent: "space-between",
//                 }}
//               >
//                 {text as string}
//                 <KeyboardArrowRightRounded />
//               </Button>
//             )
//         )}
//       </Stack>
//     </>
//   );
// };

// export default Links;



import { Button, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetLink } from "../hooks/useGetLink";
import { useToken } from "../hooks/useToken";
import { useTranslation } from "react-i18next";

const Links = () => {
  const link = useGetLink();
  const { decodedToken } = useToken();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  if (!link) return <div>{t("Something went wrong")}</div>;

  return (
    <Stack direction="row" spacing={2} sx={{ p: 2, flexWrap: "wrap" }}>
      {link.links?.map(({ href, text, onClick, permissions }, i) => {
        const isAllowed =
          !permissions || permissions.includes(decodedToken.role);
        const isActive = location.pathname === href;

        if (!isAllowed) return null;

        return (
          <Button
            key={i}
            onClick={() => {
              if (onClick) onClick();
              else navigate(href || "");
            }}
            variant="outlined"
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontSize: 16,
              px: 2,
              py: 1,
              bgcolor: isActive ? "#F0FFF8" : "#FFFFFF",
              color: isActive ? "#172E4E" : "#333",
            }}
          >
            {text as string}
          </Button>
        );
      })}
    </Stack>
  );
};

export default Links;
