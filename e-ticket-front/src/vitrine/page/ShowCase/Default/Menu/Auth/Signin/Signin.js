import { React } from "react";
import styles from "./Signin.module.scss";

const Signin = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>
          <input type="text" className="innput" placeholder="Prénom" />
          <input type="text" className="innput" placeholder="Nom" />
        </div>
        <div className={styles.email}>
          <input type="mail" className="innput" placeholder="Adresse mail" />
        </div>
        <div className={styles.passwrd}>
          <input type="password" className="innput" placeholder="Mot de passe"/>
          <input type="password" className="innput" placeholder="Confirmer le mot de passe"/>
        </div>
        <div className={styles.button}>
          <button className="bttn bttn-prim">S'inscrire</button>
        </div>
      </div>
    </>
  );
};

export default Signin;
