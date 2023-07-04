import React, { useState, useEffect } from "react";
import styles from "./Signin.module.scss";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";

const Signin = ({ changePage }) => {
  const { path } = useParams()
  const [windowSize, setWindowSize] = useState(window.screen.width);
  const [redirection, setRedirection] = useState(false)
  const [userInfo, setUserInfo] = useState({
    //firstname: '',
    //lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errorPassword, setErrorPassword] = useState('')

  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.screen.width));
  }, []);


  const handleSubmit = () => {
    setErrorPassword('')
    if(userInfo.password !== userInfo.confirmPassword) {
      setErrorPassword('not the same')
    }
    else if (!new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})').test(userInfo.password)){
      setErrorPassword('not strong enough')
    }
    else {
      console.log(userInfo)
        axios.post('/users/',
        {
          email: userInfo.email,
          password: userInfo.password,
          roles: ['USER']
        })
          .then((res) => {
            console.log(res)
            if(res.status === 201) {
              console.log('first')
              toast.success('Compte créé', {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              theme: "dark",
              })
            }
          })
          .then(() => {
            try {
              axios.post('/auth/login', {
                email: userInfo.email,
                password: userInfo.password
              })
                .then((res) => {
                  localStorage.setItem('user', res.data.message.jwt)
                  localStorage.setItem('userId', res.data.message.user._id)
                  console.log("ok")
                })
                .then(() => {
                  toast.success('Connecté', {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  theme: "dark",
                  })
                }
                )
                .then(() => setRedirection(true))
              
            }
            catch (error) {
              console.log(error)
            }

          })
    }

  }

  return (
    <>
      {redirection ? <Navigate to={`/${path === 'home' ? '' : path}`} replace /> : <></>}
      <div className={styles.container}>
        {windowSize >= 1200 ? (
          <>
            <div className={styles.left}>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4727/4727424.png"
                  alt="img"
                />
              </div>
            </div>

            <div className={styles.middle}></div>
          </>
        ) : (
          <></>
        )}

        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2>Créer votre compte</h2>
            {/*{windowSize >= 600 ?
              <div className={styles.name}>
                <TextField
                  sx={{ width: "48%", marginBottom: "2rem", marginRight: "4%" }}
                  type={"text"}
                  value={userInfo.firstname}
                  onChange={(e) => setUserInfo((prevValue) => ({...prevValue, firstname: e.target.value}))}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Prénom"}
                  placeholder={"John"}
                />
                <TextField
                  sx={{ width: "48%", marginBottom: "2rem" }}
                  type={"text"}
                  value={userInfo.lastname}
                  onChange={(e) => setUserInfo((prevValue) => ({...prevValue, lastname: e.target.value}))}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Nom"}
                  placeholder={"Doe"}
                />
              </div>
            :
            <>
              <div className={styles.name}>
                  <TextField
                    sx={{ width: "100%", marginBottom: "2rem" }}
                    type={"text"}
                    value={userInfo.firstname}
                    onChange={(e) => setUserInfo((prevValue) => ({...prevValue, firstname: e.target.value}))}
                    variant={"outlined"}
                    className={"innput"}
                    label={"Prénom"}
                    placeholder={"John"}
                  />
              </div>
              <div className={styles.name}>
                <TextField
                  sx={{ width: "100%", marginBottom: "2rem" }}
                  type={"text"}
                  value={userInfo.lastname}
                  onChange={(e) => setUserInfo((prevValue) => ({...prevValue, lastname: e.target.value}))}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Nom"}
                  placeholder={"Doe"}
                />
              </div>
            </>

            }*/}
            
            <div className={styles.email}>
              <TextField
                sx={{ width: "100%", marginBottom: "2rem" }}
                type={"text"}
                value={userInfo.email}
                  onChange={(e) => setUserInfo((prevValue) => ({...prevValue, email: e.target.value}))}
                variant={"outlined"}
                className={"innput"}
                label={"Adresse mail"}
                placeholder={"john.doe@gmail.com"}
              />
            </div>
            {windowSize >= 600 ?
              <div className={styles.passwrd}>
                <TextField
                  sx={{ width: "48%", marginBottom: "2rem", marginRight: "4%" }}
                  type={"password"}
                  value={userInfo.password}
                  onChange={(e) => setUserInfo((prevValue) => ({...prevValue, password: e.target.value}))}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Mot de passe"}
                />
                <TextField
                  sx={{ width: "48%", marginBottom: "2rem" }}
                  type={"password"}
                  value={userInfo.confirmPassword}
                  onChange={(e) => setUserInfo((prevValue) => ({...prevValue, confirmPassword: e.target.value}))}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Confirmer le mot de passe"}
                />
              </div>
            :
            <>
              <div className={styles.passwrd}>
                <TextField
                  sx={{ width: "100%", marginBottom: "2rem"}}
                  type={"password"}
                  value={userInfo.password}
                  onChange={(e) => setUserInfo((prevValue) => ({...prevValue, password: e.target.value}))}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Mot de passe"}
                />
              </div>
              <div className={styles.passwrd}>
                <TextField
                  sx={{ width: "100%", marginBottom: "2rem" }}
                  type={"password"}
                  value={userInfo.confirmPassword}
                  onChange={(e) => setUserInfo((prevValue) => ({...prevValue, confirmPassword: e.target.value}))}
                  variant={"outlined"}
                  className={"innput"}
                  label={"Confirmer le mot de passe"}
                />
              </div>
            </>
            }
            <div className={styles.passwrd}>
              {
                errorPassword === 'not the same' ?
                <div style={{color: 'red'}}>Veuillez renseigner le même mot de passe</div>
                : errorPassword === 'not strong enough' ?
                <div style={{color: 'red'}}>Veuillez renseigner un mot de passe plus fort (au mois: 8 caractères, 1 majuscule, 1 minuscule, 1 caractère spécial )</div>
                :
                <></>

              }
            </div>
            <div className={styles.button}>
              <Button variant={"contained"} color={"primary"} onClick={handleSubmit}>
                S'inscrire
              </Button>
            </div>
            <div
              className={styles.change_to_login}
              onClick={() => changePage("login")}
            >
              Vous avez déjà un compte ? Connectez vous !
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
