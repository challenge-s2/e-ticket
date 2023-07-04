import React, { useState, useEffect } from "react";
import styles from "./Menu.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const Menu = () => {
  const [localStorageData, setLocalStorageData] = useState({
    user: '',
    userId: '',
  })
  const [userRoles, setUserRoles] = useState([])

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
            setUserRoles(res.data.message.roles)
            console.log(res.data.message.roles)
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
    <nav className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            eTickets
          </div>

          <div className={styles.middle}>
          </div>


          <div className={styles.right}>
            <div className={styles.rigth_button_container}>
              {
                localStorageData.userId === '' ?
                <Link to="/auth/home" id={styles.login_button}>
                  <Button variant={"contained"} color={"success"}>Connexion</Button>
                </Link>
              :
                <>
                {
                  userRoles.includes('COMPANY') ?
                    <Link to="/app" id={styles.login_button}>
                      <Button variant={"contained"} color={"success"}>Application</Button>
                    </Link>
                  :
                    <></>
                }
                {
                  userRoles.includes('ADMIN') ?
                    <Link to="/admin" id={styles.login_button}>
                      <Button variant={"contained"} color={"warning"}>Backoffice</Button>
                    </Link>
                  :
                    <></>
                }
                  <Button variant="contained" color='error' onClick={() => loggout()} size='small'>Déconnexion</Button>
                </>
              }
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;