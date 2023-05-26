import React from "react";
import styles from "./Application.module.scss";
import Menu from "./Menu/Menu";
import LeftBoard from "./LeftBoard/LeftBoard";

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
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;
