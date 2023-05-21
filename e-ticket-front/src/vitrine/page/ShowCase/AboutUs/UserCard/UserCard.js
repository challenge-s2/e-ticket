import React from "react";
import styles from "./UserCard.module.scss";

const UserCard = ({img, name, description}) => {
  return (
    <>
      <div className={styles.container}>
        <img src={img} alt="a person"/>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.description}>{description}</div>
      </div>
    </>
  );
};

export default UserCard;
