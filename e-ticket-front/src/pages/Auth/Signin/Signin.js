import React, { useState, useEffect } from "react";
import styles from "./Signin.module.scss";
import { Button, TextField } from "@mui/material";

const Signin = ({ changePage }) => {
  const [windowSize, setWindowSize] = useState(window.screen.width);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.screen.width));
  }, []);

  return (
    <>
      <div className={styles.container}>
        {windowSize >= 1200 ? (
          <>
            <div className={styles.left}>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4727/4727424.png"
                  alt="img"
                />
              </div>
            </div>

            <div className={styles.middle}></div>
          </>
        ) : (
          <></>
        )}

        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2>Créer votre compte</h2>
            {windowSize >= 600 ?
              <div className={styles.name}>
                <TextField
                  sx={{ width: "48%", marginBottom: "2rem", marginRight: "4%" }}
                  type={"text"}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Prénom"}
                  placeholder={"John"}
                />
                <TextField
                  sx={{ width: "48%", marginBottom: "2rem" }}
                  type={"text"}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Nom"}
                  placeholder={"Doe"}
                />
              </div>
            :
            <>
              <div className={styles.name}>
                  <TextField
                    sx={{ width: "100%", marginBottom: "2rem" }}
                    type={"text"}
                    variant={"outlined"}
                    className={"innput"}
                    label={"Prénom"}
                    placeholder={"John"}
                  />
              </div>
              <div className={styles.name}>
                <TextField
                  sx={{ width: "100%", marginBottom: "2rem" }}
                  type={"text"}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Nom"}
                  placeholder={"Doe"}
                />
              </div>
            </>

            }
            
            <div className={styles.email}>
              <TextField
                sx={{ width: "100%", marginBottom: "2rem" }}
                type={"text"}
                variant={"outlined"}
                className={"innput"}
                label={"Adresse mail"}
                placeholder={"john.doe@gmail.com"}
              />
            </div>
            {windowSize >= 600 ?
              <div className={styles.passwrd}>
                <TextField
                  sx={{ width: "48%", marginBottom: "2rem", marginRight: "4%" }}
                  type={"password"}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Mot de passe"}
                />
                <TextField
                  sx={{ width: "48%", marginBottom: "2rem" }}
                  type={"password"}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Confirmer le mot de passe"}
                />
              </div>
            :
            <>
              <div className={styles.passwrd}>
                <TextField
                  sx={{ width: "100%", marginBottom: "2rem"}}
                  type={"password"}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Mot de passe"}
                />
              </div>
              <div className={styles.passwrd}>
                <TextField
                  sx={{ width: "100%", marginBottom: "2rem" }}
                  type={"password"}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Confirmer le mot de passe"}
                />
              </div>
            </>
            }
            <div className={styles.button}>
              <Button variant={"contained"} color={"primary"}>
                S'inscrire
              </Button>
            </div>
            <div
              className={styles.change_to_login}
              onClick={() => changePage("login")}
            >
              Vous avez déjà un compte ? Connectez vous !
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
