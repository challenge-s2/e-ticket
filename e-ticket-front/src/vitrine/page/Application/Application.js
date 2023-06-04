import React from "react";
import styles from "./Application.module.scss";
import LeftBoard from "./LeftBoard/LeftBoard";
import { Routes, Route } from "react-router-dom";
import ListOldCommand from "./Main/Command/ListOldCommand/ListOldCommand";
import NewCommand from "./Main/Command/NewCommand/NewCommand";
import NewProduct from './Main/Product/NewProduct/NewProduct'
import ListOfProducts from "./Main/Product/ListOfProducts/ListOfProducts";
import EditProduct from "./Main/Product/EditProduct/EditProduct";

const Application = () => {
  return (
    <>
      <div className={styles.container}>
        {/* <Menu /> */}
        <div className={styles.container_board}>
          <div className={styles.container_left_board}>
            <LeftBoard />
          </div>
          <div className={styles.container_main_board}>
            <Routes>
              <Route path="/list-old-commands" element={<ListOldCommand/>}/>
              <Route path="/new-command" element={<NewCommand/>}/>
              
              <Route path="/list-products" element={<ListOfProducts/>}/>
              <Route path="/new-product" element={<NewProduct/>}/>
              <Route path="/edit-product/:id" element={<EditProduct/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;
