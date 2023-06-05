import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";


const ContactSupport = ({open, handleClose}) => {
    const [typeOfReport, setTypeOfReport] = useState(null);
    const lisTypeOfReport = [
        "Les produits",
        "Une commande",
        "Une ancienne commande",
        "L'application",
        "Autre",
    ]


  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{margin: '2vh 5vw'}}>
          {"Contacter le support :"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box sx={{ minWidth: 120, marginTop: '1vh'}}>
                <FormControl fullWidth>
                <InputLabel id="label_form_add_report">
                    Type de signalement
                </InputLabel>
                <Select
                    labelId="label_form_add_report"
                    id="select_form_add_report"
                    value={typeOfReport}
                    label="Type de signalement"
                    onChange={(e) => setTypeOfReport(e.target.value)}
                    sx={{ textAlign: "left" }}
                >
                    {lisTypeOfReport.map((item, index) => (
                    <MenuItem value={item} key={index}>
                        {item}
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
                    <TextField
                    id="outlined-multiline-flexible"
                    label="Détaillez votre signalement"
                    multiline
                    minRows={2}
                    maxRows={8}
                    sx={{marginTop: '2vh', width: '100%'}}
                />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='contained' autoFocus sx={{padding: '1vh 1vw', margin: '1vh 1vw'}}>
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ContactSupport;