import React, { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import LeftBoard from "./LeftBoard/LeftBoard";
import { Routes, Route } from "react-router-dom";
import NewCompany from "./Main/Company/NewCompany/NewCompany";
import ListingCompany from "./Main/Company/ListingCompany/ListingCompany";
import DetailCompany from "./Main/Company/DetailCompany/DetailCompany";

import MenuMobile from "./Menu/MenuMobile";
import LeftBoardMobile from "./LeftBoard/LeftBoardMobile";
import CompanyNotFound from "./Error/404/CompanyNotFound";
import ListingUsers from "./Main/Users/ListingUsers/ListingUsers";
import DetailUser from "./Main/Users/DetailUser/DetailUser";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Admin = () => {
  const [openLeftBoardMobile, setOpenLeftBoardMobile] = useState(false);
  const [windowSize, setWindowSize] = useState(window.screen.width);
  const [redirection, setRedirection] = useState(false)
  const [readyChecked, setReadyChecked] = useState(false)

  
  const checkValidData = async () => {
    try {
      await axios
          .get(`/user/${localStorage.getItem('userId')}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('user')}`
            }
          })
          .then((res) => {
            if(res.data.message.roles.includes('ADMIN')){
              console.log("ok valid")
            }
            else {
              console.log("pas ok pas admin")
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
        setReadyChecked(true);
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
      {redirection ? <Navigate to={`/`} replace /> : <></>}
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
              <div className={styles.container_main_board}>
                <Routes>
                  <Route index element={<ListingCompany />} />
                  <Route path="/company/list" element={<ListingCompany />} />
                  <Route path="/company/new" element={<NewCompany />} />
                  <Route path="/company/:id" element={<DetailCompany />} />
                  <Route path="/company/not-found" element={<CompanyNotFound />} />

                  <Route path="/users/list" element={<ListingUsers />} />
                  <Route path="/users/:id" element={<DetailUser />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      :
        <>Chargement...</>
      }
    </>
  );
};

export default Admin;
