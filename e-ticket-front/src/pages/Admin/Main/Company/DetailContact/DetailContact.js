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


const DetailCompany = () => {
  const { id } = useParams();
  const [openQRCode, setOpenQRCode] = useState(false)
  const [base64Value, setBase64Value] = useState('');
  const [contactInfo, setContactInfo] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    companyName: '',
    position: '',
    type: '',
  })

  const fetchContact = async () => {
    await axios.get(`/contact/${id}`, 
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
      .then((res) => setContactInfo(res.data.message))
  }


  useEffect(() => {
    fetchContact();
  }, [])

  const handleChange = (status) => {
    axios.patch(`/cpntact/${id}`, 
      {
        status: status
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      }
    )
  };

  return (
    <div className={styles.container}>

      <div className={styles.company_description}>
        <TextField
          label="Description de l'entreprise"
          value={
            item.status === 'pending'
        ?
          <td><HourglassEmptyRoundedIcon color="warning"/></td>
        :
          item.status === 'valid'
        ?
        <td><VerifiedRoundedIcon color="success"/></td>
        :
        <td><DangerousRoundedIcon color="error"/></td>
        }
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </div>

      <div className={styles.company_description}>
        <TextField
          label="Description de l'entreprise"
          value={companyInfo?.type}
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </div>

      <div className={styles.input_duo}>
        <TextField
          label="Nom de l'entreprise"
          value={companyInfo.firstname}
          variant="outlined"
          sx={{ width: "100%" }}
          disabled
        />
        <TextField
          label="Nom de l'entreprise"
          value={companyInfo.lastname}
          variant="outlined"
          sx={{ width: "100%" }}
          disabled
        />
      </div>

      <div className={styles.input_duo}>
        <TextField
          label="Nom de l'entreprise"
          value={companyInfo.phone}
          variant="outlined"
          sx={{ width: "100%" }}
          disabled
        />
        <TextField
          label="Nom de l'entreprise"
          value={companyInfo.email}
          variant="outlined"
          sx={{ width: "100%" }}
          disabled
        />
      </div>

      <div className={styles.input_duo}>
        <TextField
          label="Nom de l'entreprise"
          value={companyInfo.companyName}
          variant="outlined"
          sx={{ width: "100%" }}
          disabled
        />
        <TextField
          label="Nom de l'entreprise"
          value={companyInfo.position}
          variant="outlined"
          sx={{ width: "100%" }}
          disabled
        />
      </div>

      <div className={styles.button_submit}>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleChange('valid')}
          sx={{ width: "48%", marginRight: "4%" }}
        >
          Modifier
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleChange('valid')}
          sx={{ width: "48%" }}
        >
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default DetailCompany;