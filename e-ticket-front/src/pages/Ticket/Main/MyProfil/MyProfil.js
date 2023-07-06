import React, { useEffect, useState } from "react";
import styles from "./MyProfil.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify";
import TicketItem from "../Home/TicketItem/TicketItem";

const MyProfil = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [emailGet, setEmailGet] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [localStorageData, setLocalStorageData] = useState({
    user: localStorage.getItem('user'),
    userId: localStorage.getItem('userId')
  })
  const [fidelityInfo, setFidelityInfo] = useState([])

  const handleSubmitChanges = () => {
    setErrorPassword('')
    if(user.password !== ''){
      if(user.password !== user.confirmPassword) {
        setErrorPassword('not the same')
      }
      else if (!new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})').test(user.password)){
        setErrorPassword('not strong enough')
      }
      else if(user.email !== emailGet){
        axios.patch(`/users/${localStorageData.userId}`, {
          email: user.email,
          password: user.password
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`
          }
        }).then(() => {
          toast.success('Informations modifiés', {
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
      else {
        axios.patch(`/users/${localStorageData.userId}`, {
          password: user.password
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`
          }
        }).then(() => {
          toast.success('Informations modifiés', {
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
    else if(user.email !== emailGet){
      axios.patch(`/users/${localStorageData.userId}`, {
        email: user.email,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      }).then(() => {
        toast.success('Informations modifiés', {
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

  const fetchUserData = async () => {
    if(localStorageData.userId !== ''){
      try {       
          await axios.get(`/users/${localStorage.getItem('userId')}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('user')}`
            }
          })
          .then((res) => {
            setUser({
              email: res.data.message.email,
              password: '',
              confirmPassword: ''
            })
            setEmailGet(res.data.message.email)
        })
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  const fetchDataFidelity = async () => {
    if(localStorage.getItem('userId') !== ''){
      try {
        await axios.get(`/fidelity/byUser/${localStorage.userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`
          }
        })
        .then((res) => {
          setFidelityInfo(res.data.message)
        })
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  useEffect(() => {
    fetchUserData();
    fetchDataFidelity();
    setLocalStorageData({
      user: localStorage.getItem('user'),
      userId: localStorage.getItem('userId')
    })
  }, [localStorage.getItem('userId')])


  return (
    <>
      <div className={styles.container}>
        {localStorageData.userId !== '' ?
          <div className={styles.item_home}>
            <h3>Mes informations</h3>
            <Box>
              <TextField
                id="outlined-basic"
                type="email"
                label="Adresse mail"
                variant="outlined"
                value={user.email}
                onChange={(e) => setUser((prev) => ({...prev, email: e.target.value }))}
                sx={{ width: "100%", marginBottom: "15px" }}
              />
              <TextField
                id="outlined-basic"
                type="password"
                label="Mot de passe"
                variant="outlined"
                defaultValue={user.password}
                onChange={(e) => setUser((prev) => ({...prev, password: e.target.value }))}
                sx={{ width: "100%", marginBottom: "15px" }}
              />
              <TextField
                id="outlined-basic"
                type="password"
                label="Confirmation de mot de passe"
                variant="outlined"
                defaultValue={user.confirmPassword}
                onChange={(e) => setUser((prev) => ({...prev, confirmPassword: e.target.value }))}
                sx={{ width: "100%", marginBottom: "15px" }}
              />
              {
                errorPassword === 'not the same' ?
                <div style={{color: 'red'}}>Veuillez renseigner le même mot de passe</div>
                : errorPassword === 'not strong enough' ?
                <div style={{color: 'red'}}>Veuillez renseigner un mot de passe plus fort (au mois: 8 caractères, 1 majuscule, 1 minuscule, 1 caractère spécial )</div>
                :
                <></>
              }
              <Button
                variant="contained"
                color="warning"
                sx={{ width: "100%" }}
                size="large"
                onClick={() => handleSubmitChanges()}
              >
                Enregistrer mes informations
              </Button>
            </Box>

            <h3>Mes fidelités</h3>
            <Box>
              {fidelityInfo.length > 0 ?
                <>
                  {fidelityInfo?.map((item, index) => (
                    <div className={styles.fidelity}>
                      <div className={styles.content}>
                        <div className={styles.cmt}>
                          {item.companyInformations}
                        </div>
                        <div className={styles.cmb}>
                          Nombre de points: {item.points}
                        </div>
                      </div>
                    </div>
                  ))}
                
                </>
              :
              <div>Vous n'avez pas de points de fidelité en cours</div>
              }
            </Box>
          </div>
        :
          <div className={styles.item_home}>
            <h3>Connectez-vous pour enregistrez vos tickets</h3>
            <Link to="/auth/ticket" id={styles.login_button}>
            <Button
              variant="contained"
              color="success"
              sx={{ width: "100%" }}
              size="large"
            >
              Connectez-vous
            </Button>
              </Link>
          </div>
        }
      </div>
    </>
  );
};

export default MyProfil;
