import React, { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";

const Login = ({changePage}) => {
  const { path } = useParams()

  const [windowSize, setWindowSize] = useState(window.screen.width);
  const [redirection, setRedirection] = useState(false)
  const [errorLogin, setErrorLogin] = useState(' ')
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })

  const checkLoggedIn = async () => {
    if(localStorage.getItem('userId') !== ''){
      await axios.get(`/company/user/${localStorage.getItem('userId')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      })
        .then((res) => {
          if(res.data.message._id === localStorage.getItem('companyId')){
            setRedirection(true) 
            toast.error('Vous êtes déjà connecté', {
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
          else{
            localStorage.setItem('user', '')
            localStorage.setItem('userId', '')
            localStorage.setItem('companyId', '')
            toast.error('Erreur dans les données', {
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
        }
      )
      .catch(() => {
        localStorage.setItem('user', '')
        localStorage.setItem('userId', '')
        localStorage.setItem('companyId', '')
        /*toast.error('Erreur dans les données', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })*/
      })
    }
  }

  useEffect(() => {
    checkLoggedIn();
    window.addEventListener("resize", () => setWindowSize(window.screen.width));
  }, []);

  const getCompany = async (userId) => {
    await axios
        .get(`/company/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`
          }
        })
        .then((res) => localStorage.setItem('companyId', res.data.message._id))
        
        .catch(() => localStorage.setItem('companyId', ''))
  }

  const handleSubmit = async () => {
    setErrorLogin(' ')
    try {
      let userId = ''
      await axios.post('/auth/login', {
        email: userInfo.email,
        password: userInfo.password
      }).then((res) => {
        if(res.data.message.message === 'User not found') {
          setErrorLogin('Mauvais email ou mot de passe')
        }
        else {
          localStorage.setItem('user', res.data.message.jwt)
          userId = res.data.message.user._id
          localStorage.setItem('userId', userId)
          if(res.data.message.user.roles.includes('COMPANY')) {
            getCompany(userId)
          }
          setRedirection(true)
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
      })
      
    }
    catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {redirection ? <Navigate to={`/${path === 'home' ? '' : path}`} replace /> : <></>}
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.wrapper_left}>
            <h2>Connectez-vous</h2>
            <div className={styles.mail}>
              <TextField
                type={"text"}
                id="login-email"
                value={userInfo.email}
                onChange={(e) => setUserInfo((prevValue) => ({...prevValue, email: e.target.value}))}
                variant={"outlined"}
                className={"innput"}
                label={"Adresse mail"}
                placeholder={"john.doe@gmail.com"}
              />
            </div>
            <div className={styles.password}>
              <TextField
                type={"password"}
                id="login-password"
                value={userInfo.password}
                onChange={(e) => setUserInfo((prevValue) => ({...prevValue, password: e.target.value}))}
                variant={"outlined"}
                className={"innput"}
                label={"Mot de passe"}
              />
            </div>
            <div style={{color: 'red'}}>{errorLogin}</div>
            <div className={styles.submit}>
              <Button variant={"contained"} color={"success"} id="login-btn" onClick={handleSubmit}>
                Connexion
              </Button>
            </div>
            <div
              className={styles.change_to_signin}
              onClick={() => changePage("signin")}
            >
              Vous n'avez pas de compte? Créez-en un !
            </div>

          </div>
        </div>

        {windowSize >= 1200 ? (
          <>
            <div className={styles.middle}></div>
            <div className={styles.right}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1052/1052815.png"
                alt="img"
              />
            </div>
          </>
        ) : (
          <></>
        )}

      </div>
    </>
  );
};

export default Login;
