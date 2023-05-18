import ActivitySector from "./ActivitySector/AcivittySector";
import BlockText from "./BlockText/BlockText";
import Menu from "./Menu/Menu";

import styles from "./Homepage.module.scss"
import Contributors from "./Contributors/Contributors";
import Questions from "./Questions/Questions";
import Footer from "./Footer/Footer";

const Homepage = () => {
  return (
    <>
      <div className={styles.container}>
        <header>
          <Menu />
        </header>
        <main>
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
          <Contributors/>
          <Questions/>
          <BlockText
            title="Qu'est ce que c'est ?"
            text="Notre solution propose un outil de gestion des produits, des commandes et des tickets de caisse de manière dématérialisé."
            align="left"
          />
          
        </main>

        <footer><Footer/></footer>
      </div>
    </>
  );
};

export default Homepage;
