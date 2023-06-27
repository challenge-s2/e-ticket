import React, {useState} from "react";
import styles from "./NewCompany.module.scss";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const contentCompanyType = [
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

const NewCompany = () => {

  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    description: '',
    companyType: '',
    mail: '',
    phone: ''

  });

  const handleSumbit = () => {
    if(
      companyInfo.name !== '' && 
      companyInfo.description !== '' && 
      companyInfo.companyType !== '' && 
      companyInfo.mail !== '' && 
      companyInfo.phone !== ''
    ){
      console.log(companyInfo); /* TODO Enregistrer dans la BDD */

      /* Après */
      <Navigate to="/admin/company/list"/>
    }
  }

  return (
    <>
      <div className={styles.container}>

        <div className={styles.input}>
          <TextField label="Nom de l'entreprise" value={companyInfo.name} onChange={(e) => setCompanyInfo((prevValue) => ({...prevValue, name: e.target.value}) )} variant="outlined" sx={{width: '100%'}}/>
        </div>

        <div className={styles.input}>
          <TextField label="Description de l'entreprise" value={companyInfo.description} onChange={(e) => setCompanyInfo((prevValue) => ({...prevValue, description: e.target.value}) )} variant="outlined" sx={{width: '100%'}}/>
        </div>

        <div className={styles.input}>
          <FormControl fullWidth>
            <InputLabel id="label_form_add_report">
              Type d'entreprise
            </InputLabel>
            <Select
              labelId="label_form_add_report"
              id="select_form_add_report"
              value={companyInfo.companyType}
              label="Type d'entreprise"
              onChange={(e) => setCompanyInfo((prevValue) => ({...prevValue, companyType: e.target.value}) )}
              sx={{ textAlign: "left" }}
            >
              {contentCompanyType.map((item, index) => (
                <MenuItem value={item.name} key={index}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>  
        </div>

        <div className={styles.input}>
          <TextField label="Mail de l'entreprise" value={companyInfo.mail} onChange={(e) => setCompanyInfo((prevValue) => ({...prevValue, mail: e.target.value}) )} variant="outlined" sx={{width: '100%'}}/>
        </div>

        <div className={styles.input}>
          <TextField label="Numéro de téléphone de l'entreprise" value={companyInfo.phone} onChange={(e) => setCompanyInfo((prevValue) => ({...prevValue, phone: e.target.value}) )} variant="outlined" sx={{width: '100%'}}/>
        </div>

        <div className={styles.button_submit}>
          <Button variant="contained" color='primary' onClick={handleSumbit} sx={{width: '100%'}}>Ajouter</Button>
        </div>


      </div>
    </>
  );
};

export default NewCompany;
