import { React } from "react";
import styles from "./Login.module.scss";
import {Button, TextField} from "@mui/material";

const Login = ({changePage}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2>Connectez-vous</h2>
          <div className={styles.mail}>
            <TextField
                sx={{width: '50%', marginBottom: '1rem'}}
                type={"text"}
                variant={"outlined"}
                className={"innput"}
                label={"Adresse mail"}
                placeholder={"john.doe@gmail.com"}
            />
          </div>
          <div className={styles.password}>
            <TextField
                sx={{width: '50%', marginBottom: '1rem'}}
                type={"password"}
                variant={"outlined"}
                className={"innput"}
                label={"Mot de passe"}
            />
          </div>
          <div className={styles.submit}>
            <Button variant={"contained"} color={"success"}>Connexion</Button>
          </div>
          <div className={styles.change_to_signin} onClick={() => changePage('signin')}>Vous n'avez pas de compte? Créé en un !</div>
        </div>
        <div className={styles.middle}></div>
        <div className={styles.right}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1052/1052815.png"
            alt="img"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
