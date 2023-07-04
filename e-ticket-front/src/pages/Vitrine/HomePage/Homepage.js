import { React } from "react";
import ActivitySector from "./ActivitySector/ActivitySector";
import BlockText from "./BlockText/BlockText";
import styles from "./Homepage.module.scss";
import Contributors from "./Contributors/Contributors";
import Questions from "./Questions/Questions";
import FormSector from "./FormSector/FormSector";
import FirstItem from "./FirstItem/FirstItem";
import InstallPWA from "../../../components/InstallPWA";

const Homepage = () => {
  return (
    <>
      <div className={styles.container}>
        {/* Form à afficher que si showForm != null */}
        <FirstItem />
        <BlockText
          title="Qu'est ce que c'est ?"
          text="Notre solution propose un outil de gestion des produits, des commandes et des tickets de caisse de manière dématérialisée."
          align="left"
          step="second"
        />
        <div className={styles.last_block_text}>
          <BlockText
            title="La solution qui facilite la vie des commerçants, le n°1 des tickets dématérialisés !"
            align="center"
            step="second"
          />
        </div>
        <ActivitySector />
        <Contributors />
        <Questions />
        <div className={styles.last_block_text}>
          <BlockText
            title="On s'occupe de tout"
            text="Aucune modification à faire, Installation simple, Vos clients on le choix, On vous accompagne"
            align="left"
            step="second"
          />
        </div>
        <FormSector />
      </div>
      <div>
        <InstallPWA />
      </div>
    </>
  );
};

export default Homepage;
