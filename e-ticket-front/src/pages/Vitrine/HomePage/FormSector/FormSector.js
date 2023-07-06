import React, { useEffect, useState } from "react";
import styles from "./FormSector.module.scss";
import { MenuItem, FormControl, Select, InputLabel, Button, TextField } from '@mui/material';
import { toast } from "react-toastify";
import axios from "axios";

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
  const [informations, setInformations] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    companyName: '',
    position: '',
    type: '',
  });
  const [errorForm, setErrorForm] = useState(' ');


  const handleSubmitForm = () => {
    setErrorForm(' ')
    if(
      informations.firstname !== '' &&
      informations.lastname !== '' &&
      informations.phone !== '' &&
      informations.email !== '' &&
      informations.companyName !== '' &&
      informations.position !== '' &&
      informations.type !== ''
    ){
      axios.post(`/contact/`, {
        email: informations.email,
        lastname: informations.lastname,
        firstname: informations.firstname,
        companyName: informations.companyName,
        type: informations.type,
        phone: informations.phone,
        position: informations.position
      }).then(() => {
        toast.success('Demande envoyée !', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }).then(() => {
        setInformations({
          firstname: '',
          lastname: '',
          phone: '',
          email: '',
          companyName: '',
          position: '',
          type: ''
        })
      })
    }
    else {
      setErrorForm('Il manque des données')
    }
  }

  useEffect(() => console.log(informations.type), [informations.type])

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
            <div className={styles.activity_sector}>
                <FormControl sx={{ m: 1, width: '100%' , margin: "0"}} size="small">
                  <InputLabel id="demo-simple-select-helper-label">Activité</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Activité"
                    value={informations.type}
                    onChange={(e) => setInformations((prev) => ({...prev, type: e.target.value}))}
                  >
                    {content.map((option, index) => (
                      <MenuItem value={option.name} key={index}>{option.name}</MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </div>

              <div className={styles.two}>
                <TextField
                  sx={{ width: '48%', margin: '0 4% 2rem 0' }}
                  type={"text"}
                  variant={"outlined"}
                  label={"Prénom"}
                  placeholder={"John"}
                  value={informations.firstname}
                  onChange={(e) => setInformations((prev) => ({...prev, firstname: e.target.value}))}
                />
                <TextField
                  sx={{ width: '48%', marginBottom: '2rem'}}
                  type={"text"}
                  variant={"outlined"}
                  label={"Nom"}
                  placeholder={"Doe"}
                  value={informations.lastname}
                  onChange={(e) => setInformations((prev) => ({...prev, lastname: e.target.value}))}
                />  
              </div>

                <div className={styles.two}>
                  <TextField
                    sx={{ width: '48%', margin: '0 3% 2rem 0' }}
                    type={"text"}
                    variant={"outlined"}
                    label={"Téléphone de contact"}
                    placeholder={"+33 6 78 94 56 12"}
                    value={informations.phone}
                    onChange={(e) => setInformations((prev) => ({...prev, phone: e.target.value}))}
                  />
                  <TextField
                    sx={{ width: '48%', marginBottom: '2rem' }}
                    type={"text"}
                    variant={"outlined"}
                    label={"Mail de contact"}
                    placeholder={"utilisateur@contact.fr"}
                    value={informations.email}
                    onChange={(e) => setInformations((prev) => ({...prev, email: e.target.value}))}
                  />  
                </div>

                <div className={styles.two}>
                  <TextField
                    sx={{ width: '48%', margin: '0 4% 2rem 0' }}
                    type={"text"}
                    variant={"outlined"}
                    label={"Nom de l'entreprise"}
                    placeholder={"Microsoft"}
                    value={informations.companyName}
                    onChange={(e) => setInformations((prev) => ({...prev, companyName: e.target.value}))}
                  />
                  <TextField
                    sx={{ width: '48%', marginBottom: '2rem' }}
                    type={"text"}
                    variant={"outlined"}
                    label={"Votre poste"}
                    placeholder={"CEO"}
                    value={informations.position}
                    onChange={(e) => setInformations((prev) => ({...prev, position: e.target.value}))}
                  />
                </div>
              

              <div className={styles.one} style={{marginBottom: '2rem'}}>
                {errorForm}
              </div>


              <div className={styles.button}>
                <Button variant={"contained"} sx={{ width: '100%' }} color={"primary"} onClick={() => handleSubmitForm()}>Envoyer</Button>
              </div>
          </div>

        </div>

      </div>
    </>
  );
};

export default FormSector;
