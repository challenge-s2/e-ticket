import { React } from "react";
import styles from "./Menu.module.scss";
import Auth from "./Auth/Auth";

const Menu = ({handleChangePage}) => {
  return (
    <>
      <nav className={styles.container}>
        <div className={styles.left} onClick={() => handleChangePage("homepage")}>
          {/* Logo */}
          eTickets
        </div>

        <div className={styles.middle}>
          <div onClick={() => handleChangePage("about-us")}>Qui sommes nous ?</div>
        </div>

        <div className={styles.right}>
          {/* Boutton de connexion */}
          <Auth />
        </div>
      </nav>
    </>
  );
};

export default Menu;
