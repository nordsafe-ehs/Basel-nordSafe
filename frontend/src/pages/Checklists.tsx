import { KeyboardArrowRightRounded } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useGetLink } from "../hooks/useGetLink";
import { useTranslation } from "react-i18next";

const Checklists = () => {
  const link = useGetLink();
  const {t} = useTranslation()

  if (!link) return <Typography>{t("Something went wrong")}</Typography>;

  return (
    <>
      <Stack gap={2}>
        {link.links?.map(({ text, href }, i) => (
          <Button
            key={i}
            to={href || ""}
            component={Link}
            sx={{
              fontSize: 16,
              justifyContent: "space-between",
            }}
            variant="outlined"
          >
            {text as string}
            <KeyboardArrowRightRounded />
          </Button>
        ))}
      </Stack>
    </>
  );
};

export default Checklists;
