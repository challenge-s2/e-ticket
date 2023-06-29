import React, { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const Login = ({ changePage }) => {
  const [windowSize, setWindowSize] = useState(window.screen.width);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })

  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.screen.width));
  }, []);

  const handleSubmit = () => {
    console.log(userInfo)

    axios.post('/auth/loginlogin', userInfo).then((res) => {
        //redirect to app
      })
      .catch((err) => {
        try {
          setWarning(err.response.data.message);
        } catch {
          setWarning("Il semble que le serveur soit offline");
        }
      });
  }


  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.wrapper_left}>
            <h2>Connectez-vous</h2>
            <div className={styles.mail}>
              <TextField
                type={"text"}
                value={userInfo.email}
                onChange={(e) => setUserInfo((prevValue) => ({...prevValue, email: e.target.value}))}
                variant={"outlined"}
                className={"innput"}
                label={"Adresse mail"}
                placeholder={"john.doe@gmail.com"}
              />
            </div>
            <div className={styles.password}>
              <TextField
                type={"password"}
                value={userInfo.password}
                onChange={(e) => setUserInfo((prevValue) => ({...prevValue, password: e.target.value}))}
                variant={"outlined"}
                className={"innput"}
                label={"Mot de passe"}
              />
            </div>
            <div className={styles.submit}>
              <Button variant={"contained"} color={"success"} onClick={handleSubmit}>
                Connexion
              </Button>
            </div>
            <div
              className={styles.change_to_signin}
              onClick={() => changePage("signin")}
            >
              Vous n'avez pas de compte? Créé en un !
            </div>

          </div>
        </div>

        {windowSize >= 1200 ? (
          <>
            <div className={styles.middle}></div>
            <div className={styles.right}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1052/1052815.png"
                alt="img"
              />
            </div>
          </>
        ) : (
          <></>
        )}

      </div>
    </>
  );
};

export default Login;
