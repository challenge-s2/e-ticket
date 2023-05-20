import { React } from "react";
import styles from "./Login.module.scss";

const Login = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.first}>
          <input type="login" className="innput" placeholder="Adresse mail" />
        </div>
        <div className={styles.second}>
          <input type="password" className="innput" placeholder="Mot de passe"/>
        </div>
        <div className={styles.button}>
          <button className="bttn bttn-succ">Connexion</button>
        </div>
      </div>
    </>
  );
};

export default Login;
