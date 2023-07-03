import React, { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import logoBlack from "../../../../utils/assets/Logo eTickets black.png"
import { TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import Button from '@mui/material/Button';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import TocRoundedIcon from '@mui/icons-material/TocRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import axios from "axios";
import { toast } from "react-toastify";

import { useLocation } from "react-router-dom";

const Menu = () => {
  const [openModalLogin, setOpenModalLogin] = useState(false)
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  })
  const [localStorageData, setLocalStorageData] = useState({
    user: '',
    userId: '',
  })

  const checkLoggedIn = async () => {
    if(localStorage.getItem('user') === '' || localStorage.getItem('userId') === ''){
      localStorage.setItem('user', '')
      localStorage.setItem('userId', '')
      setLocalStorageData({
        user: '',
        userId: '',
      })
    }
    else {
      await axios.get(`/users/${localStorage.getItem('userId')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      })
        .then((res) => {
          if(res.status === 200){
            setLocalStorageData({
              user: localStorage.getItem('user'),
              userId: localStorage.getItem('userId'),
            })
          }
          else{
            localStorage.setItem('user', '')
            localStorage.setItem('userId', '')
            setLocalStorageData({
              user: '',
              userId: '',
            })
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
        setLocalStorageData({
          user: '',
          userId: '',
        })
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
      })
    }
    setOpenModalLogin(false)
  }

  useEffect(() => {
    checkLoggedIn();
  }, [])

  const handleSubmit = async () => {

    try {
      let userId = ''
      let jwt = ''
      await axios.post('/auth/login', {
        email: userInfo.email,
        password: userInfo.password
      }).then((res) => {
        userId = res.data.message.user._id
        jwt = res.data.message.jwt
        localStorage.setItem('user', jwt)
        localStorage.setItem('userId', userId)
        setLocalStorageData({
          user: jwt,
          userId: userId
        })
        console.log("ok")
      })
        .then(() => 
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
        )
        setOpenModalLogin(false)
      
    }
    catch (error) {
      console.log(error)
    }

    
      /*.catch((err) => {
        try {
          setWarning(err.response.data.message);
        } catch {
          setWarning("Il semble que le serveur soit offline");
        }
      });*/
  }

  const loggout = () => {
    localStorage.setItem("userId", '')
    localStorage.setItem("user", '')
    localStorage.setItem("companyId", '')
  }

  return (
    <>
      <div className={styles.container}>
      <Dialog
        open={openModalLogin}
        onClose={() => setOpenModalLogin(false)}
      >
        <DialogContent sx={{padding: '50px'}}>
          <div className={styles.mail}>
            <TextField
              type={"text"}
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
              value={userInfo.password}
              onChange={(e) => setUserInfo((prevValue) => ({...prevValue, password: e.target.value}))}
              variant={"outlined"}
              className={"innput"}
              label={"Mot de passe"}
            />
          </div>
        </DialogContent>
        <DialogActions sx={{padding: '50px'}}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleSubmit()}
          >
            Connexion
          </Button>
        </DialogActions>
      </Dialog>
        <div className={styles.not_connected}>
          <div className={styles.left}><WarningRoundedIcon sx={{verticalAlign: 'middle'}}/>Connectez-vous pour enregistrer vos tickets</div>
          <div className={styles.right}>
            {localStorageData.userId === '' ?
              <Button variant="contained" color='success' onClick={() => setOpenModalLogin(true)} size='small'>Connexion</Button>
              :
              <Button variant="contained" color='error' onClick={() => loggout()} size='small'>Déconnexion</Button>
            }
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.text} style={{verticalAlign: 'middle', display: useLocation().pathname.startsWith('/ticket/my-tickets')  ? 'block' : 'none'}}>
            <TocRoundedIcon sx={{marginRight: '10px'}}/>
            Mes tickets
          </div>
          <div className={styles.text} style={{verticalAlign: 'middle', margin: "auto 0", display: useLocation().pathname === '/ticket/my-profil' ? 'block' : 'none'}}>
            <EmojiPeopleRoundedIcon sx={{marginRight: '10px'}}/>
            Mon profil
          </div>
          <div className={styles.logo} style={{verticalAlign: 'middle', margin: "auto 0", display: useLocation().pathname === '/ticket/' ? 'block' : 'none'}}>
            <img src={logoBlack} alt="Image of the logo"/>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Menu;
