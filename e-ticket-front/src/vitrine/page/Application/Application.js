import React from "react";
import styles from "./Application.module.scss";
import Menu from "./Menu/Menu";
import LeftBoard from "./LeftBoard/LeftBoard";
import { Routes, Route } from "react-router-dom";
import ListOldCommand from "./Main/Command/ListOldCommand/ListOldCommand";

const Application = () => {
  return (
    <>
      <div className={styles.container}>
        <Menu />
        <div className={styles.container_board}>
          <div className={styles.container_left_board}>
            <LeftBoard />
          </div>
          <div className={styles.container_main_board}>
            <Routes>
              <Route path="/list-old-commands" element={<ListOldCommand />} />
              {/* <Route path="/app/new-command"/> */}
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;
