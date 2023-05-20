import React from "react";
import styles from "./FormSector.module.scss";
import { MdClose } from "react-icons/md";

const FormSector = ({ number, sectors, closeForm }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.close} onClick={() => closeForm()}>
          <MdClose size={30} />
        </div>
        <h2>Contactez nous pour découvrir notre solution</h2>
        <select className="selecct selecct-lgt" name="activitySelector" id="activitySelector">
          {sectors.map((item) => (
            <>
              {item.key === number ? (
                <option value={item.key} selected>
                  {item.name}
                </option>
              ) : (
                <option value={item.key}>{item.name}</option>
              )}
            </>
          ))}
        </select>
        <div className={styles.container_form}>
          <div className={styles.name}>
            <input type="text" className="innput" placeholder="Prénom" />
            <input type="text" className="innput" placeholder="Nom" />
          </div>
          <div className={styles.email}>
            <input type="mail" className="innput" placeholder="Adresse mail" />
          </div>
          <div className={styles.button}>
            <button className="bttn bttn-drk">Envoyer</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormSector;
