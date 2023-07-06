import React from "react";
import styles from "./FormSector.module.scss";
import { MenuItem, FormControl, Select, InputLabel, Button, TextField, Box } from '@mui/material';
import { Link } from "react-router-dom";

const content = [
  {
    key: 1,
    name: "Fastfood",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 2,
    name: "Institut de beauté",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 3,
    name: "Vente d'eCigarette",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 4,
    name: "Boulangerie/Patisserie",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 5,
    name: "Autre",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
];

const FormSector = () => {
  return (
    <>
      <div className={styles.container} id="form">
        <h1>Contactez-nous pour découvrir notre solution !</h1>
        <div className={styles.wrapper}>

          <div className={styles.left}>
            <div className={styles.cont}>
              <p>Nous sommes disponibles tous les jours, nous vous répondrons dans les plus brefs délais.</p>
              <br/>
              <span style={{ textAlign: "left" }}>
              <p>Nous couvrons un large choix de secteur d'activité comme :</p>
              <p>- Fastfood</p>
              <p>- Institut de beauté</p>
              <p>- Vente d'eCigarette</p>
              <p>- Boulangerie/Patisserie</p>
              <p>Choisissez celui qui vous correspond</p>

              </span>
              
          </div>
          </div>
          
          <div className={styles.container_form}>

            {
              localStorage.getItem('userId') === '' 
            ?
              <Box sx={{ height: '100%', display: 'flex'}}>
                <Link to="/auth/home" id={styles.login_button} style={{margin: 'auto 0'}}>
                  <Button variant="contained" color="success">Connectez-vous pour contacter le support</Button>
                </Link>
              </Box>
            :
            <>
              <div className={styles.activity_sector}>
                  <FormControl sx={{ m: 1, width: '100%' , margin: "0"}} size="small">
                    <InputLabel id="demo-simple-select-helper-label">Activité</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      label="Activité"
                    >
                      {content.map((option, index) => (
                        <MenuItem value={index} key={index}>{option.name}</MenuItem>
                      ))}

                    </Select>
                  </FormControl>
                </div>

                <div className={styles.one}>
                  <TextField
                    sx={{ width: '100%', marginBottom: '2rem' }}
                      type={"text"}
                      variant={"outlined"}
                      label={"Information sur l'entreprise"}
                      placeholder={"Microsoft Corporation, une multinationale informatique..."}
                    />  
                </div>

                <div className={styles.one}>
                  <TextField
                    sx={{ width: '100%', marginBottom: '2rem' }}
                      type={"text"}
                      multiline
                      maxRows={4}
                      rows={2}
                      variant={"outlined"}
                      label={"Le contenu de votre demande"}
                    />  
                </div>

                <div className={styles.button}>
                  <Button variant={"contained"} sx={{ width: '100%' }} color={"primary"}>Envoyer</Button>
                </div>
              </>
            }
          </div>

        </div>

      </div>
    </>
  );
};

export default FormSector;
