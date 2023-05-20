import React from "react";
import styles from "./AboutUs.module.scss";
import UserCard from "./UserCard/UserCard";

const AboutUs = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Qui sommes nous ?</h1>

        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut sequi rerum, accusantium molestias veritatis asperiores ad quas possimus reprehenderit magnam, corporis consectetur dolorem laboriosam maiores excepturi, laudantium tempore nulla repellendus.</div>

        <div className={styles.cards}>
          <UserCard img="https://placehold.co/400" name="Théo RACHER RAULIN" description="Créateur du site web"/>
          <UserCard img="https://placehold.co/400" name="Théo RACHER RAULIN" description="Créateur du site web"/>
          <UserCard img="https://placehold.co/400" name="Théo RACHER RAULIN" description="Créateur du site web"/>
          <UserCard img="https://placehold.co/400" name="Théo RACHER RAULIN" description="Créateur du site web"/>

        </div>

      </div>
    </>
  );
};

export default AboutUs;
