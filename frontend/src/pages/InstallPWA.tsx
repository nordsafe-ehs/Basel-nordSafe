import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let deferredPrompt: any = null;

export default function InstallPWA() {
  const [canInstall, setCanInstall] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt = e;
      setCanInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
    };
  }, []);

  function isIosSafari() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return (
      /iphone|ipad|ipod/.test(userAgent) &&
      /safari/.test(userAgent) &&
      !/crios|fxios/.test(userAgent)
    );
  }

  const handleInstallClick = async () => {
    if (isIosSafari()) {
      alert(
        "To install this app:\n\n1. Tap the Share button in Safari.\n2. Select 'Add to Home Screen'."
      );
      return;
    }

    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    deferredPrompt = null;
    setCanInstall(false);
  };

  // const handleInstallClick = async () => {
  //   if (!deferredPrompt) return;
  //   deferredPrompt.prompt();
  //   const choiceResult = await deferredPrompt.userChoice;
  //   if (choiceResult.outcome === "accepted") {
  //     console.log("User accepted the install prompt");
  //   } else {
  //     console.log("User dismissed the install prompt");
  //   }
  //   deferredPrompt = null;
  //   setCanInstall(false);
  // };

  const handleReloadClick = () => {
    window.location.reload();
  };

  return (
    <Stack
      sx={{ textAlign: "center" }}
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Typography fontSize={50} fontWeight={900} color="primary.main" mb={2}>
        {t("Install Our App")}{" "}
      </Typography>
      <Typography mb={1} fontSize={20}>
        {t(
          "Install this app on your device to use it like a native application."
        )}{" "}
      </Typography>
      {canInstall ? (
        <Button
          variant="contained"
          startIcon={<DownloadIcon  />}
          size="large"
          onClick={handleInstallClick}
        >
          {t("Install App")}
        </Button>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t("If you see this section then you have to reload the page.")}{" "}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            size="medium"
            onClick={handleReloadClick}
          >
            {t("Reload Page")}
          </Button>
        </>
      )}
    </Stack>
  );
}
