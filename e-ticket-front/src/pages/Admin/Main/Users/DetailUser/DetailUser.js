import React, { useEffect, useState } from "react";
import styles from "./DetailUser.module.scss";
import {
  Button,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";


const DetailUser = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({
    email: '',
    roles: []
  })


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
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleSumbit = () => {
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