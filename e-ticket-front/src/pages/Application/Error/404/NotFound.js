import React, { useEffect, useState } from "react";
import styles from "../../Application.module.scss";
import LeftBoard from "../../LeftBoard/LeftBoard";
import { Routes, Route, Navigate } from "react-router-dom";
import ListOldCommand from "../../Main/Command/ListOldCommand/ListOldCommand";
import NewCommand from "../../Main/Command/NewCommand/NewCommand";
import NewProduct from "../../Main/Product/NewProduct/NewProduct";
import ListOfProducts from "../../Main/Product/ListOfProducts/ListOfProducts";
import EditProduct from "../../Main/Product/EditProduct/EditProduct";
import DetailOldCommand from "../../Main/Command/DetailOldCommand/DetailOldCommand";
import MenuMobile from "../../Menu/MenuMobile";
import LeftBoardMobile from "../../LeftBoard/LeftBoardMobile";
import MyInformations from "../../Main/Settings/MyInformations/MyInformations";
import ProductNotFound from "../../Error/404/ProductNotFound";
import CommandNotFound from "../../Error/404/CommandNotFound";
import axios from "axios";
import { toast } from "react-toastify";
import PageNotFound from "../../../Application/Error/404/PageNotFound";
import { Grid } from "@mui/material";

const Application = () => {
  const [openLeftBoardMobile, setOpenLeftBoardMobile] = useState(false);
  const [windowSize, setWindowSize] = useState(window.screen.width);
  const [redirection, setRedirection] = useState(false)
  const [readyChecked, setReadyChecked] = useState(false)

  
  const checkValidData = async () => {
      try {
        await axios
          .get(`/users/${localStorage.getItem('userId')}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('user')}`
            }
          })
          .then((res) => {
            if(res.data.message.roles.includes('COMPANY')){
              console.log("ok valid")
              axios
                .get(`/company/user/${localStorage.getItem('userId')}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('user')}`
                  }
                })
                .then((res) => {
                  if(res.data.message._id === localStorage.getItem('companyId') && localStorage.getItem('companyId') !== ''){
                    console.log("double ok valid")
                    setReadyChecked(true)
                  }
                  else {
                    console.log("pas ok pas valid 1")
                    localStorage.setItem("userId", '')
                    localStorage.setItem("user", '')
                    localStorage.setItem("companyId", '')
                    setRedirection(true)
                    toast.error('Erreur de données', {
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
            else {
              console.log("pas ok pas entreprise")
              setRedirection(true)
              toast.error("Vous n'avez pas l'autorisation d'accéderà cette interface", {
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
      catch (err) {
        console.log("pas ok pas valid")
        setRedirection(true)
        toast.error("Vous n'avez pas l'autorisation d'accéderà cette interface", {
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

  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.screen.width));
    checkValidData();
  }, []);


  return (
    <>
      {redirection ? <Navigate to={'/'} replace /> : <></>}
      {readyChecked ?
        <>
            <div className={styles.container}>
                {windowSize < 1330 ? (
                <MenuMobile setOpen={setOpenLeftBoardMobile} />
                ) : (
                <></>
                )}
                <div className={styles.container_board}>
                {windowSize < 1330 ? (
                    <LeftBoardMobile
                    open={openLeftBoardMobile}
                    setOpen={setOpenLeftBoardMobile}
                    />
                ) : (
                    <div className={styles.container_left_board}>
                    <LeftBoard />
                    </div>
                )}
                    
                    <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    >
                        <PageNotFound/>
                    </Grid>
                </div>
            
          </div>
        </>  
      :
        <>Chargement...</>
      }
    </>
  );
};

export default Application;