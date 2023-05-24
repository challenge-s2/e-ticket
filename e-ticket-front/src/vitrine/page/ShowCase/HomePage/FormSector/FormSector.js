import React from "react";
import styles from "./FormSector.module.scss";
import { MenuItem, FormControl, Select, InputLabel, Button, TextField } from '@mui/material';

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
    name: "Institue de beauté",
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
      <div className={styles.container}>
        <h1>Contactez nous pour découvrir notre solution !</h1>
        <div className={styles.wrapper}>

          <div className={styles.left}>
            <div className={styles.cont}>
              Nous sommes disponibles tous les jours, nous vous répondrons dans les plus brefs délais. 
          </div>
          </div>
          
          <div className={styles.container_form}>

            <div className={styles.name}>
              <TextField
                  sx={{width: '48%', marginBottom: '2rem', marginRight: '4%'}}
                  type={"text"}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Prénom"}
                  placeholder={"John"}
                />
                <TextField
                  sx={{width: '48%', marginBottom: '2rem'}}
                  type={"text"}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Nom"}
                  placeholder={"Doe"}
                />
            </div>

            <div className={styles.activity_sector}>
              <FormControl sx={{ m: 1, width: '100%' , margin: "0"}} size="small">
                <InputLabel id="demo-simple-select-helper-label">Activité</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  label="Activité"
                >
                  {content.map((option, index) => (
                    <MenuItem value={index}>{option.name}</MenuItem>
                  ))}

                </Select>
              </FormControl>
            </div>

            <div className={styles.email}>
              <TextField
                sx={{ width: '100%', marginBottom: '2rem' }}
                  type={"mail"}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Adresse mail"}
                  placeholder={"john.doe@gmail.com"}
                />  
            </div>

            <div className={styles.button}>
              <Button variant={"contained"} sx={{ width: '100%' }} color={"primary"}>Envoyer</Button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default FormSector;
