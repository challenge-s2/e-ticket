import React from "react";
import styles from "./Auth.module.scss";
import { useState } from "react";
import Login from "./Login/Login";
import Signin from "./Signin/Signin";
import { CSSTransition } from "react-transition-group";
import "./Auth.css";

const Auth = () => {
  const [choice, setChoice] = useState("login");

  const changePage = (e) => {
    setChoice(e);
  };

  return (
    <>
      <div className={styles.container}>
        <CSSTransition
          in={choice === "login"}
          timeout={600}
          classNames="login"
          unmountOnExit
        >
          <Login changePage={changePage} />
        </CSSTransition>

        <CSSTransition
          in={choice === "signin"}
          timeout={600}
          classNames="signin"
          unmountOnExit
        >
          <Signin changePage={changePage} />
        </CSSTransition>
      </div>
    </>
  );
};

export default Auth;
