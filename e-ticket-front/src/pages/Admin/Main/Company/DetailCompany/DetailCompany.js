import React, { useEffect, useState } from "react";
import styles from "./DetailCompany.module.scss";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import QRCode from "react-qr-code";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import { toast } from 'react-toastify';

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

const DetailCompany = () => {
  const { id } = useParams();
  const [openQRCode, setOpenQRCode] = useState(false)
  const [base64Value, setBase64Value] = useState('');
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    description: '',
    type: '',
    registerDate: '',
    email: '',
  })

  const fetchData = async () => {
    const companyRaw = await axios.get(`/company/${id}`);
    setCompanyInfo({
      name: companyRaw.data.message.name,
      description : companyRaw.data.message.description,
      type : companyRaw.data.message.type,
      registerDate : companyRaw.data.message.registerDate
    })
    const userInfoRaw = await axios.get(`/users/${companyRaw.data.message.userId}`)
    setCompanyInfo((prevValue) => ({...prevValue, email: userInfoRaw.data.message.email}))
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleSumbit = () => {
    console.log(companyInfo);

    axios.post(`/company/${id}`, 
      /*{
          Header: "Bearer" + user.token
      },*/
      {
        name: companyInfo?.name,
        description: companyInfo?.description,
        type: companyInfo?.type,
      }
    )
  };

  const sendBase64 = async () => {
    const svgElement = document.getElementById('mySVG')
    const serializeSVG = new XMLSerializer().serializeToString(svgElement)
    const base64Value = window.btoa(serializeSVG)
    console.log(base64Value)
    await axios.patch(`/company/${id}`, {
      qrCode: base64Value
    })
    .then(() => setOpenQRCode(false))
    .then(() => 
      toast.success('Code généré!', {
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
  }

  return (
    <div className={styles.container}>
      <div className={styles.button_generation}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenQRCode(true)}
        >
          Générer un QRCode
        </Button>
        
      </div>
      <Dialog
        open={openQRCode}
        onClose={() => setOpenQRCode(false)}
      >
        <DialogContent sx={{padding: '50px'}}>
          <QRCode value={`http://localhost:3010/ticket/my-tickets/company/${id}`} id='mySVG'/>
        </DialogContent>
        <DialogActions sx={{padding: '50px'}}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => sendBase64()}
          >
            Envoyer le nouveau QRCode
          </Button>
        </DialogActions>
      </Dialog>
      <div className={styles.company_name}>
        <TextField
          label="Nom de l'entreprise"
          value={companyInfo?.name}
          onChange={(e) => setCompanyInfo((prevValue) => ({...prevValue, name: e.target.value}) )}
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </div>

      <div className={styles.company_description}>
        <TextField
          label="Description de l'entreprise"
          value={companyInfo?.description}
          onChange={(e) => setCompanyInfo((prevValue) => ({...prevValue, description: e.target.value}) )}
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </div>

      <div className={styles.company_type}>
        <FormControl sx={{ width: "100%" }} size="medium">
          <InputLabel id="label">Type d'entreprise</InputLabel>
          <Select
            value={companyInfo?.type}
            onChange={(e) => setCompanyInfo((prevValue) => ({...prevValue, type: e.target.value}) )}
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
          value={Moment(companyInfo?.registerDate).format('DD/MM/YYYY')}
          disabled
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </div>


      <div className={styles.company_type}>
        <TextField label="Mail de l'entreprise" value={companyInfo?.email} disabled variant="outlined" sx={{width: '100%'}}/>
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
    </div>
  );
};

export default DetailCompany;