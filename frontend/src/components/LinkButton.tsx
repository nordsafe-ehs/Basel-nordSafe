import { KeyboardArrowDownRounded } from "@mui/icons-material";
import { Button, Collapse, IconButton, Stack, Tooltip } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import { LinkType } from "../types/Sidebar";
import { checkIsActive } from "../utils/functions";

const LinkButton = ({
  link: { text, href, links, onClick, permissions, hideOnSidebar, icon },
  setOpen,
}: {
  setOpen?: Dispatch<SetStateAction<boolean>>;
  link: LinkType;
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState(false);
  const { decodedToken } = useToken();
  const { id } = useParams();

  useEffect(() => {
    setActive(
      checkIsActive({
        links,
        href,
        pathname: id ? pathname.replace(id, ":id") : pathname,
      })
    );
  }, [pathname, href, links, id]);

  if (
    (permissions && !permissions.includes(decodedToken.role)) ||
    hideOnSidebar
  )
    return null;

  return (
    <Stack>
      <Stack direction="row" position="relative" alignItems="center">
        {links && links?.some(({ hideOnSidebar }) => !hideOnSidebar) ? (
          <IconButton
            sx={{
              position: "absolute",
              zIndex: 2,

              transition: ".25s",
              transform: !icon && active ? "rotate(180deg)" : "",
            }}
            onClick={() => setActive((prev) => !prev)}
          >
            <KeyboardArrowDownRounded
              sx={{
                color: "primary.main",
              }}
            />
          </IconButton>
        ) : (
          ""
        )}
        {/* <Tooltip title={text as string} followCursor placement="right">
          <Button
            key={text as string}
            {...(onClick
              ? { component: Button }
              : { component: Link, to: href })}
            fullWidth
            onClick={() => {
              if (onClick) onClick();
              if (setOpen) setOpen(false);
            }}
            variant={
              checkIsActive({
                links,
                href,
                pathname: id ? pathname.replace(id, ":id") : pathname,
              })
                ? "outlined"
                : "text"
            }
            sx={{
              justifyContent: "flex-start",
              pl:
                links && links?.some(({ hideOnSidebar }) => !hideOnSidebar)
                  ? 4
                  : icon
                  ? 1
                  : 2,
              pr: 2,
              textAlign: "unset",
              span: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
                width: 1,
                pl: icon ? 1 : 0,
              },
              svg: {
                fontSize: 20,
              },
            }}
          >
            {(links && links?.some(({ hideOnSidebar }) => !hideOnSidebar)) ||
              icon}
            <span>{text as string}</span>
          </Button>
        </Tooltip> */}
        <Tooltip title={text as string} followCursor placement="right">
          <Button
            key={text as string}
            {...(onClick
              ? { component: Button }
              : { component: Link, to: href })}
            fullWidth
            onClick={() => {
              if (onClick) onClick();
              if (setOpen) setOpen(false);
            }}
            variant={
              checkIsActive({
                links,
                href,
                pathname: id ? pathname.replace(id, ":id") : pathname,
              })
                ? "outlined"
                : "text"
            }
            sx={{
              justifyContent: "flex-start",
              paddingX: "8px",
              paddingY: "16px",
              pl:
                links && links?.some(({ hideOnSidebar }) => !hideOnSidebar)
                  ? 4
                  : icon
                  ? 1
                  : 2,
              pr: 2,
              textAlign: "unset",
              span: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
                width: 1,
                pl: icon ? 1 : 0,
              },
              svg: {
                fontSize: 20,
                color: "#172E4E", // لون الأيقونة الأساسي
              },

              // حالات التفاعل
              "&:hover": {
                bgcolor: "#E0F7FA",
                // color: "#0064FF",
                // svg: { color: "#0064FF" },
              },

              "&.MuiButton-outlined": {
                bgcolor: "#172E4E",
                color: "white",
                fontWeight: "bold",
                svg: { color: "#0CB283" },
              },
              ...(href?.startsWith("/company-settings") && {
                bgcolor: "#FFFFFF", // خلفية مختلفة
                borderRadius: '50px',
                
                border:'0.2px solid #E5EFFF',
                px:"20px",
                py:'15px',
                "&:hover": {
                  bgcolor: "#F0FFF8",
                },
                "&.MuiButton-outlined": {
                  bgcolor: "#F0FFF8",
                  color: "#172E4E",
                  fontWeight: "bold",
                  svg: { color: "#0CB283" },
                },
              }),
            }}
          >
            {(links && links?.some(({ hideOnSidebar }) => !hideOnSidebar)) ||
              icon}
            <span>{text as string}</span>
          </Button>
        </Tooltip>
      </Stack>
      {links && (
        <Collapse
          sx={{
            pl: 2,
          }}
          in={active}
        >
          {links.map((link) => (
            <LinkButton
              setOpen={setOpen}
              key={link.text as string}
              link={link}
            />
          ))}
        </Collapse>
      )}
    </Stack>
  );
};

export default LinkButton;
