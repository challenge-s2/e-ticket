import { React } from "react";
import styles from "./Login.module.scss";

const Login = ({changePage}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2>Connectez-vous</h2>
          <div className={styles.mail}>
            <input type="login" className="innput" placeholder="Adresse mail" />
          </div>
          <div className={styles.password}>
            <input
              type="password"
              className="innput"
              placeholder="Mot de passe"
            />
          </div>
          <div className={styles.submit}>
            <button className="bttn bttn-succ">Connexion</button>
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
