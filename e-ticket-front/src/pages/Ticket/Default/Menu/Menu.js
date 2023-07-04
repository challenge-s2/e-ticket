import React, { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import logoBlack from "../../../../utils/assets/Logo eTickets black.png"

import Button from '@mui/material/Button';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import TocRoundedIcon from '@mui/icons-material/TocRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import axios from "axios";
import { toast } from "react-toastify";

import { useLocation, Link } from "react-router-dom";

const Menu = () => {
  const url = useLocation().pathname;
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
  }

  useEffect(() => {
    checkLoggedIn();
  }, [])


  const loggout = () => {
    localStorage.setItem("userId", '')
    localStorage.setItem("user", '')
    localStorage.setItem("companyId", '')
    setLocalStorageData({
      user: '',
      userId: '',
    })
  }

  return (
    <>
      <div className={styles.container}>
      {localStorageData.userId === '' ?
        <div className={styles.not_connected}>
          <div className={styles.left}><WarningRoundedIcon sx={{verticalAlign: 'middle'}}/>Connectez-vous pour enregistrer vos tickets</div>
        </div>
        :
        <></>
        }
        <div className={styles.wrapper}>
          <div className={styles.left}>
            {
              url.startsWith('/ticket/my-tickets') ?
                <div className={styles.text} style={{verticalAlign: 'middle'}}>
                  <TocRoundedIcon sx={{marginRight: '10px'}}/>
                  Mes tickets
                </div>
              :
              url === '/ticket/my-profil' ?
                <div className={styles.text} style={{verticalAlign: 'middle', margin: "auto 0"}}>
                  <EmojiPeopleRoundedIcon sx={{marginRight: '10px'}}/>
                  Mon profil
                </div>
              :
                <div className={styles.logo} style={{verticalAlign: 'middle', margin: "auto 0"}}>
                  <img src={logoBlack} alt="Image of the logo"/>
                </div>
            }
          </div>
          <div className={styles.right}>
            {localStorageData.userId === '' ?
              <Link to="/auth/ticket" id={styles.login_button}>
                <Button variant={"contained"} color={"success"}>Connexion</Button>
              </Link>
              :
              <Button variant="contained" color='error' onClick={() => loggout()} size='small'>Déconnexion</Button>
            }
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Menu;
