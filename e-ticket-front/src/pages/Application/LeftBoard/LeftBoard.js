import React from "react";
import styles from "./LeftBoard.module.scss";
import ItemCommandLeftBoard from "./ItemCommandLeftBoard/ItemCommandLeftBoard";
import ItemProductLeftBoard from "./ItemProductLeftBoard/ItemProductLeftBoard";
import ItemSettingsLeftBoard from "./ItemSettingsLeftBoard/ItemSettingsLeftBoard";

const LeftBoard = () => {
  return (
    <div className={styles.container}>
      <ItemCommandLeftBoard opened={true} />
      <ItemProductLeftBoard />
      <ItemSettingsLeftBoard />
    </div>
  );
};

export default LeftBoard;
