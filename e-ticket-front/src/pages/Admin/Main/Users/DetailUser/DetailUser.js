import React, { useEffect, useState } from "react";
import styles from "./DetailUser.module.scss";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from "moment";

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';


import { toast } from 'react-toastify';

const roles = ['USER', 'COMPANY', 'ADMIN']

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (name, roleValue, theme) => {
  return {
    fontWeight:
      roleValue.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const DetailUser = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({
    email: '',
    roles: []
  })
  const theme = useTheme();
  const [roleValue, setRoleValue] = useState([]);

  const handleChange = (event) => {
    setRoleValue(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
  };


  const fetchData = async () => {
    const userRaw = await axios.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    });
    setUserInfo({
      email: userRaw.data.message.email,
      roles : userRaw.data.message.roles,
    })
    setRoleValue(userRaw.data.message.roles)
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleSumbit = () => {
    console.log(userInfo);

    axios.patch(`/users/${id}`,
      {
        email: userInfo?.email
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      }
    )
  };

  return (
    <div className={styles.container}>

      <div className={styles.company_name}>
        <TextField
          label="Mail de l'utilisateur"
          value={userInfo?.email}
          onChange={(e) => setUserInfo((prevValue) => ({...prevValue, email: e.target.value}) )}
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </div>

      <div className={styles.company_start_date}>
          {userInfo?.roles.map((name) => (
            <TextField
            label="Roles de l'utilisateur"
            value={name}
            disabled
            variant="outlined"
            sx={{ width: "100%", marginBottom: "20px" }}
          />
          ))}
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

export default DetailUser;