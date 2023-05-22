import { React } from "react";
import styles from "./Signin.module.scss";

const Signin = ({ changePage }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4727/4727424.png"
            alt="img"
          />
        </div>

        <div className={styles.middle}></div>

        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2>Créer votre compte</h2>
            <div className={styles.name}>
              <input type="text" className="innput" placeholder="Prénom" />
              <input type="text" className="innput" placeholder="Nom" />
            </div>
            <div className={styles.email}>
              <input
                type="mail"
                className="innput"
                placeholder="Adresse mail"
              />
            </div>
            <div className={styles.passwrd}>
              <input
                type="password"
                className="innput"
                placeholder="Mot de passe"
              />
              <input
                type="password"
                className="innput"
                placeholder="Confirmer le mot de passe"
              />
            </div>
            <div className={styles.button}>
              <button className="bttn bttn-prim">S'inscrire</button>
            </div>
            <div className={styles.change_to_login} onClick={() => changePage('login')}>Vous avez déjà un compte ? Connectez vous !</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
