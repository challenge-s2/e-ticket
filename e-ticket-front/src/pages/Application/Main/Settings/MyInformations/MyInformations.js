import React, { useState, useEffect } from "react";
import styles from "./MyInformations.module.scss";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import Moment from "moment"
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import QRCode from "react-qr-code";

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

const MyInformations = () => {
  const [openQRCode, setOpenQRCode] = useState(false)
  const [informations, setInformations] = useState({
    name: "",
    description: "",
    type: "",
    date: ""
  })

  const fetchData = async () => {
    const companyRaw = await axios.get(`/company/${localStorage.getItem('companyId')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    });
    setInformations({
      name: companyRaw.data.message.name,
      description : companyRaw.data.message.description,
      type : companyRaw.data.message.type,
      registerDate : companyRaw.data.message.registerDate
    })
  }

  useEffect(() => {
    fetchData();
  }, [])


  const handleSumbit = () => {
    console.log(informations);

    axios.patch(`/company/${localStorage.getItem('companyId')}`, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`
          }
        },
        {
            name: informations.name,
            description: informations.description,
            type: informations.type,
        }
        )
        .then(() => 
          toast.success('Informations mis à jour!', {
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
  };

  const printQRCode = () => {
    window.print()
    
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.company_name}>
        <TextField
          label="Nom de l'entreprise"
          value={informations.name}
          onChange={(e) => setInformations((prevValues) => ({...prevValues, name: e.target.value}))}
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </div>

      <div className={styles.company_description}>
        <TextField
          label="Description de l'entreprise"
          value={informations.description}
          onChange={(e) => setInformations((prevValues) => ({...prevValues, description: e.target.value}))}
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </div>

      <div className={styles.company_type}>
        <FormControl sx={{ width: "100%" }} size="medium">
          <InputLabel id="label">Type d'entreprise</InputLabel>
          <Select
            value={informations.type}
            onChange={(e) => setInformations((prevValues) => ({...prevValues, type: e.target.value}))}
            labelId="label"
            id="select"
            label="Type d'entreprise"
            sx={{ textAlign: "left" }}
          >
            {contentCompanyType.map((option, index) => (
              <MenuItem key={index} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className={styles.company_start_date}>
        <TextField
          label="Date d'arrivée"
          value={Moment(informations?.registerDate).format('DD/MM/YYYY')}
          disabled
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </div>

      

      <div className={styles.button_submit}>
        <Button
          variant="contained"
          color="warning"
          onClick={handleSumbit}
          sx={{ width: "100%" }}
        >
          Modifier
        </Button>
      </div>

      <div className={styles.company_start_date}>
        <Button onClick={() => setOpenQRCode(true)}>
          Afficher le QR Code
        </Button>
      </div>


      <Dialog
        open={openQRCode}
        onClose={() => setOpenQRCode(false)}
      >
        <DialogContent sx={{padding: '50px'}}>
          <QRCode 
            value={`http://localhost:3010/ticket/my-tickets/company/${localStorage.getItem('companyId')}`} 
            id='mySVG'
            onClick={() => printQRCode()}
            style={{cursor: 'pointer'}}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyInformations;
