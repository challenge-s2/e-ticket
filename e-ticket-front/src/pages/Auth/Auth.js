import React from "react";
import styles from "./Auth.module.scss";
import { useState } from "react";
import Login from "./Login/Login";
import Signin from "./Signin/Signin";
import { CSSTransition } from "react-transition-group";
import "./Auth.css";
import { IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

const Auth = () => {
  const [choice, setChoice] = useState("login");

  const changePage = (e) => {
    setChoice(e);
  };

  return (
    <>
      <div className={styles.returnButton}>
        <Link to="/">
          <IconButton variant="contained" sx={{textAlign: 'left'}} onClick={() => console.log('test')}>
            <ArrowBackIcon sx={{fontSize: 50, color: '#353535'}}/>
          </IconButton>
        </Link>
      </div>
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
