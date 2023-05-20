import React from "react";
import styles from "./Auth.module.scss";
import { useState } from "react";
import Login from "./Login/Login";
import Signin from "./Signin/Signin";

const Auth = () => {
  const [disp, setDisp] = useState(false);
  const [choice, setChoice] = useState("login");

  return (
    <>
      <div className={styles.container}>
        <div className={styles.rigth_button_container}>
          <button
            className="bttn bttn-drk"
            onClick={() => {
              setDisp(!disp);
            }}
          >
            Connexion
          </button>
        </div>
        <div
          className={styles.container_auth}
          style={{ display: disp ? "block" : "none" }}
          onClick={() => setDisp(!disp)}
        ></div>
        <div
          className={styles.block}
          style={{ display: disp ? "block" : "none" }}
        >
          <div className={styles.top}>
            <div
              className={styles.left}
              style={{
                backgroundColor: choice === "signin" ? "#00000015" : "",
              }}
              onClick={() => setChoice("signin")}
            >
              Inscription
            </div>
            <div
              className={styles.right}
              style={{
                backgroundColor: choice === "login" ? "#00000015" : "",
              }}
              onClick={() => setChoice("login")}
            >
              Connexion
            </div>
          </div>
          <div className={styles.bottom}>
            {choice === "login" ? <Login /> : <Signin />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
