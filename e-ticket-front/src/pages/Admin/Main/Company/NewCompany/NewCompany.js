import React, {useState} from "react";
import styles from "./NewCompany.module.scss";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios"
import { toast } from "react-toastify";

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

const NewCompany = () => {

  const [redirection, setRedirection] = useState(false)
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    description: '',
    companyType: '',
    mail: '',
    //phone: 'ipo',
    password: '',
    address: ''

  });
  const [newCompanyId, setNewCompanyId] = useState('');


  const handleSumbit = async () => {
    if(
      companyInfo.name !== '' && 
      companyInfo.description !== '' && 
      companyInfo.companyType !== '' && 
      companyInfo.mail !== '' && 
      companyInfo.address !== '' &&
      //companyInfo.phone !== '' &&
      companyInfo.password !== ''
    ){
      console.log(companyInfo); /* TODO Enregistrer dans la BDD */
      await axios.post(`/users/company/`, {
        email: companyInfo.mail,
        password: companyInfo.password
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      }).then((res) => 
        axios.post('/company/',  {
          name: companyInfo.name,
          description: companyInfo.description,
          type: companyInfo.companyType,
          address: companyInfo.address,
          userId: res.data.message._id
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`
          }
        })
        .then((res) => setNewCompanyId(res.data.message._id))
        .then(() => 
          toast.success('Entreprise créée !', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
        )
      )
      .then(() => setRedirection(true))
    }
  }

  return (
    <>
      {redirection ? <Navigate to={`/admin/company/${newCompanyId}`} replace /> : <></>}
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

        <div className={styles.input_duo}>
          <TextField label="Ville de l'entreprise" value={companyInfo.address} onChange={(e) => setCompanyInfo((prevValue) => ({...prevValue, address: e.target.value}) )} variant="outlined" sx={{width: '100%'}}/>
          <TextField label="Mail de l'entreprise" type="email" value={companyInfo.mail} onChange={(e) => setCompanyInfo((prevValue) => ({...prevValue, mail: e.target.value}) )} variant="outlined" sx={{width: '100%'}}/>
        </div>

        {/*<div className={styles.input}>
          <TextField label="Numéro de téléphone de l'entreprise" value={companyInfo.phone} onChange={(e) => setCompanyInfo((prevValue) => ({...prevValue, phone: e.target.value}) )} variant="outlined" sx={{width: '100%'}}/>
        </div>*/}

        <div className={styles.input}>
          <TextField label="Mot de passe du compte" type="password" value={companyInfo.password} onChange={(e) => setCompanyInfo((prevValue) => ({...prevValue, password: e.target.value}) )} variant="outlined" sx={{width: '100%'}}/>
        </div>

        <div className={styles.button_submit}>
          <Button variant="contained" color='primary' onClick={handleSumbit} sx={{width: '100%'}}>Ajouter</Button>
        </div>


      </div>
    </>
  );
};

export default NewCompany;
