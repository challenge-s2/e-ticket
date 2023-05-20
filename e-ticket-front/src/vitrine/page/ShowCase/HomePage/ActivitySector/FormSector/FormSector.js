import React from "react";
import styles from "./FormSector.module.scss";

const FormSector = ({ number, sectors }) => {
  return (
    <>
      <div className={styles.container}>
        <select name="activitySelector" id="activitySelector">
          {sectors.map((item) => (
            <>
              {item.key === number ? (
                <option value={item.key} selected>
                  {item.key}
                </option>
              ) : (
                <option value={item.key}>{item.key}</option>
              )}
            </>
          ))}
        </select>
        <div className={styles.name}>
          <input type="text" className="innput" placeholder="Prénom" />
          <input type="text" className="innput" placeholder="Nom" />
        </div>
        <div className={styles.email}>
          <input type="mail" className="innput" placeholder="Adresse mail" />
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
      </div>
    </>
  );
};

export default FormSector;
