import React, { useEffect, useState } from "react";
import styles from "./Application.module.scss";
import LeftBoard from "./LeftBoard/LeftBoard";
import { Routes, Route, Navigate, redirect } from "react-router-dom";
import ListOldCommand from "./Main/Command/ListOldCommand/ListOldCommand";
import NewCommand from "./Main/Command/NewCommand/NewCommand";
import NewProduct from "./Main/Product/NewProduct/NewProduct";
import ListOfProducts from "./Main/Product/ListOfProducts/ListOfProducts";
import EditProduct from "./Main/Product/EditProduct/EditProduct";
import DetailOldCommand from "./Main/Command/DetailOldCommand/DetailOldCommand";
import MenuMobile from "./Menu/MenuMobile";
import LeftBoardMobile from "./LeftBoard/LeftBoardMobile";
import MyInformations from "./Main/Settings/MyInformations/MyInformations";
import ProductNotFound from "./Error/404/ProductNotFound";
import CommandNotFound from "./Error/404/CommandNotFound";
import axios from "axios";

const Application = () => {
  const [openLeftBoardMobile, setOpenLeftBoardMobile] = useState(false);
  const [windowSize, setWindowSize] = useState(window.screen.width);

  const checkValidData = async () => {
    try {
      await axios
          .get(`/company/user/${localStorage.getItem('userId')}`)
          .then((res) => {
            if(res.data.message._id === localStorage.getItem('companyId')){
              console.log("ok valid")
            }
            else {
              console.log("pas ok pas valid 1")
              localStorage.setItem("userId", '')
              localStorage.setItem("user", '')
              localStorage.setItem("companyId", '')
              return redirect('auth')
            }
          })
          .catch(() => {
            console.log("pas ok pas valid 2")
            localStorage.setItem("userId", '')
            localStorage.setItem("user", '')
            localStorage.setItem("companyId", '')
            return redirect('auth')
          })
    }
    catch (err) {
      console.log("pas ok pas valid 3")
      localStorage.setItem("userId", '')
      localStorage.setItem("user", '')
      localStorage.setItem("companyId", '')
      return redirect('auth')
    }
  }

  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.screen.width));
    checkValidData();
  }, []);


  return (
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
              <Route index element={<NewCommand />} />
              <Route path="/list-old-commands" element={<ListOldCommand />} />
              <Route path="/new-command" element={<NewCommand />} />
              <Route
                path="/detail-old-command/:id"
                element={<DetailOldCommand />}
              />
              <Route
                path="/detail-old-command/not-found"
                element={<CommandNotFound />}
              />

              <Route path="/list-products" element={<ListOfProducts />} />
              <Route path="/new-product" element={<NewProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route
                path="/edit-product/not-found"
                element={<ProductNotFound />}
              />
              <Route path="/my-informations" element={<MyInformations />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;
