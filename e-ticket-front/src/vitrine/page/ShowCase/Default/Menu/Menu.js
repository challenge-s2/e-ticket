import { React, useState } from "react";
import styles from "./Menu.module.scss";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Menu = () => {
  // const [shadow, setShadow] = useState(false);

  // window.addEventListener('scroll', (() => {
  //   if (shadow === false && scrollY > 70) {
  //     setShadow(true)
  //   }
  //   else if (shadow === true && scrollY <= 70) {
  //     setShadow(false)
  //   }

  // }) ,false)

return (
    <>
    <nav className={styles.container}>
        <div className={styles.wrapper}>
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
                <Button variant={"contained"} color={"success"}>Connexion</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Menu;
