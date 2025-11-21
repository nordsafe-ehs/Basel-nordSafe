import { KeyboardArrowRightRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetLink } from "../hooks/useGetLink";
import { useToken } from "../hooks/useToken";
import { useTranslation } from "react-i18next";

const Links = () => {
  const link = useGetLink();
  const { decodedToken } = useToken();
  const {t} = useTranslation()

  if (!link) return <Typography> {t("Something went wrong")}</Typography>;

  return (
    <>
      <Stack gap={2}>
        {link.links?.map(
          ({ href, text, onClick, permissions }) =>
            !(permissions && !permissions.includes(decodedToken.role)) && (
              <Button
                {...(onClick
                  ? { component: Button, onClick }
                  : { component: Link, to: href })}
                fullWidth
                variant="outlined"
                onClick={() => onClick && onClick()}
                sx={{
                  fontSize: 20,
                  justifyContent: "space-between",
                }}
              >
                {text as string}
                <KeyboardArrowRightRounded />
              </Button>
            )
        )}
      </Stack>
    </>
  );
};

export default Links;
