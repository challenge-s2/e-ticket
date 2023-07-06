import React, { useEffect, useState } from "react";
import styles from "../../Application.module.scss";
import LeftBoard from "../../LeftBoard/LeftBoard";
import { Navigate } from "react-router-dom";
import MenuMobile from "../../Menu/MenuMobile";
import LeftBoardMobile from "../../LeftBoard/LeftBoardMobile";
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
              axios
                .get(`/company/user/${localStorage.getItem('userId')}`, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem('user')}`
                  }
                })
                .then((res) => {
                  if(res.data.message._id === localStorage.getItem('companyId') && localStorage.getItem('companyId') !== ''){
                    setReadyChecked(true)
                  }
                  else {
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
