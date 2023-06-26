import React, { useEffect, useState } from "react";
import { MenuItem, FormControl, Select, InputLabel, Button, TextField } from '@mui/material';



const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <Button
      className="link-button pwa-install-button"
      color={"primary"}
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
    >
      Installer l'application
    </Button>
  );
};

export default InstallPWA;
