import { React } from "react";
import ActivitySector from "./ActivitySector/AcivittySector";
import BlockText from "./BlockText/BlockText";
import styles from "./Homepage.module.scss";
import Contributors from "./Contributors/Contributors";
import Questions from "./Questions/Questions";

const Homepage = () => {
  return (
    <>
      <div className={styles.container}>
        {/* Form à afficher que si showForm != null */}
        <ActivitySector />
        <BlockText
          title="La solution qui facilite la vie des commerçants, le n°1 des tickets dématérialisés !"
          align="center"
        />
        <BlockText
          title="Qu'est ce que c'est ?"
          text="Notre solution propose un outil de gestion des produits, des commandes et des tickets de caisse de manière dématérialisé."
          align="left"
        />
        <Contributors />
        <Questions />
        <BlockText
          title="Qu'est ce que c'est ?"
          text="Notre solution propose un outil de gestion des produits, des commandes et des tickets de caisse de manière dématérialisé."
          align="left"
        />
      </div>
    </>
  );
};

export default Homepage;
