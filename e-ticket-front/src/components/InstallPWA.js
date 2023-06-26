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
    <>
        <h1>Installez notre application !</h1>
        <Button
            onClick={onClick}
            color="primary"
            variant="contained"
            sx={{ padding: "1vh 1vw", margin: "1vh 1vw", textAlign: 'center' }}
        >
        Installer l'application
        </Button>
    </>
    
  );
};

export default InstallPWA;
