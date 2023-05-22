import { React } from "react";
import styles from "./Menu.module.scss";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <nav className={styles.container}>
        <div className={styles.left}>
          {/* Logo */}
          eTickets
        </div>

        <div className={styles.middle}>
          {/* <div onClick={() => handleChangePage("about-us")}>Qui sommes nous ?</div> */}
        </div>


        <div className={styles.right}>
          {/* Boutton de connexion */}
          <div className={styles.rigth_button_container}>
            <Link to="/auth" id={styles.login_button}>
              <button class="bttn bttn-drk">
                    Connexion
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
