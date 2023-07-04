import React, { useEffect, useState } from "react";
import styles from "./MyProfil.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom"

const MyProfil = () => {
  const [user, setUser] = useState({
    firstname: "Jean",
    lastname: "DUPOND",
    email: "j.dupond@gmail.com",
  });

  const [localStorageData, setLocalStorageData] = useState({
    user: localStorage.getItem('user'),
    userId: localStorage.getItem('userId')
  })

  const handleSubmitChanges = () => {
    console.log('patched');
    // axios.patch(url + '/user' + user.id, user).then(() => console.log("changed"))
  }

  useEffect(() => {
    setLocalStorageData({
      user: localStorage.getItem('user'),
      userId: localStorage.getItem('userId')
    })
  }, [localStorage.getItem('userId')])

  return (
    <>
      <div className={styles.container}>
        {localStorageData.userId !== '' ?
          <div className={styles.item_home} style={{display: 'none'}}>
            <h3>Mes informations</h3>
            <Box>
              <TextField
                id="outlined-basic"
                type="text"
                label="Prénom"
                variant="outlined"
                defaultValue={user.firstname}
                onChange={(e) => setUser({ firstname: e.target.value })}
                sx={{ width: "100%", marginBottom: "15px" }}
              />
              <TextField
                id="outlined-basic"
                type="text"
                label="Nom"
                variant="outlined"
                defaultValue={user.lastname}
                onChange={(e) => setUser({ lastname: e.target.value })}
                sx={{ width: "100%", marginBottom: "15px" }}
              />
              <TextField
                id="outlined-basic"
                type="email"
                label="Adresse mail"
                variant="outlined"
                defaultValue={user.email}
                onChange={(e) => setUser({ email: e.target.value })}
                sx={{ width: "100%", marginBottom: "15px" }}
              />
              <Button
                variant="contained"
                color="warning"
                sx={{ width: "100%" }}
                size="large"
                onClick={() => handleSubmitChanges()}
              >
                Enregistrer mes informations
              </Button>
            </Box>
          </div>
        :
          <div className={styles.item_home}>
            <h3>Connectez-vous pour enregistrez vos tickets</h3>
            <Link to="/auth/ticket" id={styles.login_button}>
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%" }}
              size="large"
            >
              Connectez-vous
            </Button>
              </Link>
          </div>
        }
      </div>
    </>
  );
};

export default MyProfil;
