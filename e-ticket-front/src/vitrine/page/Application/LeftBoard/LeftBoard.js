import React, { useState } from "react";
import styles from "./LeftBoard.module.scss";
import ItemCommandLeftBoard from "./ItemCommandLeftBoard/ItemCommandLeftBoard";
import ItemProductLeftBoard from "./ItemProductLeftBoard/ItemProductLeftBoard";
import ContactSupport from "../ContactSupport/ContactSupport";
import { Button } from "@mui/material";


const LeftBoard = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <ItemCommandLeftBoard opened={true} />
      <ItemProductLeftBoard opened={true} />
      <div className={styles.button_contact_support}>
        <Button variant="contained" color="error" sx={{padding: '1vh 1vw'}} onClick={() => setOpen(true)}>
          Contacter le support
        </Button>
      </div>
      <ContactSupport open={open} handleClose={() => setOpen(false)}/>
    </div>
  );
};

export default LeftBoard;
