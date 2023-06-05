import React from "react";
import styles from "./LeftBoard.module.scss";
import ItemCommandLeftBoard from "./ItemCommandLeftBoard/ItemCommandLeftBoard";
import ItemProductLeftBoard from "./ItemProductLeftBoard/ItemProductLeftBoard";

const LeftBoard = () => {

  return (
    <div className={styles.container}>
      <ItemCommandLeftBoard opened={true} />
      <ItemProductLeftBoard opened={true} />
    </div>
  );
};

export default LeftBoard;
