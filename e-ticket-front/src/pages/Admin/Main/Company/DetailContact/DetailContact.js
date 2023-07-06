import React, { useEffect, useState } from "react";
import styles from "./DetailContact.module.scss";
import {
  Button,
  TextField,
} from "@mui/material";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import DangerousRoundedIcon from '@mui/icons-material/DangerousRounded';


const DetailCompany = () => {
  const { id } = useParams();
  const [redirection, setRedirection] = useState(false)
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
    axios.patch(`/contact/${id}`, 
      {
        status: status
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      }
    ).then(() => setRedirection(true))
  };

  return (
    <>
      {redirection ? <Navigate to={`/admin/contact/list`} replace /> : <></>}
      <div className={styles.container}>

        <div className={styles.company_description}>
          {
            contactInfo.status === 'refused'
          ?
          <TextField
            label="Statut de la demande"
            value={'Demande Refusée'}
            variant="outlined"
            sx={{ width: "100%" }}
            disabled
          />
          :
          contactInfo.status === 'valid'
          ?
          <TextField
            label="Statut de la demande"
            value={"Demande acceptée"}
            variant="outlined"
            sx={{ width: "100%" }}
            disabled
          />
          :
          <TextField
            label="Statut de la demande"
            value={"Demande en attente"}
            variant="outlined"
            sx={{ width: "100%" }}
            disabled
          />
          }
        </div>

        <div className={styles.company_description}>
          <TextField
            label="Type d'entreprise"
            value={contactInfo?.type}
            variant="outlined"
            sx={{ width: "100%" }}
            disabled
          />
        </div>

        <div className={styles.input_duo}>
          <TextField
            label="Prénom du demandeur"
            value={contactInfo.firstname}
            variant="outlined"
            sx={{ width: "100%" }}
            disabled
          />
          <TextField
            label="Nom du demandeur"
            value={contactInfo.lastname}
            variant="outlined"
            sx={{ width: "100%" }}
            disabled
          />
        </div>

        <div className={styles.input_duo}>
          <TextField
            label="Numéro de téléphone du demandeur"
            value={contactInfo.phone}
            variant="outlined"
            sx={{ width: "100%" }}
            disabled
          />
          <TextField
            label="Mail du demandeur"
            value={contactInfo.email}
            variant="outlined"
            sx={{ width: "100%" }}
            disabled
          />
        </div>

        <div className={styles.input_duo}>
          <TextField
            label="Nom de l'entreprise"
            value={contactInfo.companyName}
            variant="outlined"
            sx={{ width: "100%" }}
            disabled
          />
          <TextField
            label="Poste du demandeur"
            value={contactInfo.position}
            variant="outlined"
            sx={{ width: "100%" }}
            disabled
          />
        </div>

        {
          contactInfo.status === 'pending' 
          ?
            <div className={styles.button_submit}>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleChange('valid')}
                sx={{ width: "48%", marginRight: "4%" }}
              >
                Accepter
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleChange('refused')}
                sx={{ width: "48%" }}
              >
                Refuser
              </Button>
            </div>
          :
            <></>
        }
      </div>
    </>
  );
};

export default DetailCompany;