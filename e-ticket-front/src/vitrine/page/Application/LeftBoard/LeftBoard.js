import React from "react";
import styles from "./LeftBoard.module.scss";
import ItemCommandLeftBoard from "./ItemCommandLeftBoard/ItemCommandLeftBoard";

const LeftBoard = () => {
  const content1 = [
    {
      title: "Anciènnes commandes",
      subItem: {
        title: "Liste",
      },
    },
  ];

  return (
    <div className={styles.container}>
      <ItemCommandLeftBoard opened={true} />
    </div>
  );
};

export default LeftBoard;
