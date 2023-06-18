import React, { useState } from "react";
import styles from "./Home.module.scss";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import ParkRoundedIcon from '@mui/icons-material/ParkRounded';
import CloudRoundedIcon from '@mui/icons-material/CloudRounded';


const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.item_home}>
          <h3>Mes tickets</h3>
          <div className={styles.ticket}>
            <div className={styles.content}>
                <div className={styles.cl}>
                    <img src="https://placehold.co/400" alt="imr"/>
                </div>
                <div className={styles.cm}>
                    <div className={styles.cmt}>Nom de l'enseigne - Paris</div>
                    <div className={styles.cmb}>Le 01/01/2023 à 12h30</div>
                </div>
                <div className={styles.cr}><ArrowForwardIosRoundedIcon fontSize='small' sx={{marginLeft: '5px'}}/></div>
            </div>
          </div>

          <div className={styles.ticket}>
            <div className={styles.text}>Voir plus</div>
            <ArrowForwardIosRoundedIcon fontSize='small' sx={{marginLeft: '5px'}}/>
          </div>
        </div>
        <div className={styles.item_home}>
          <h3>Ce que eTickets a économisé</h3>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <div className={styles.t}><WaterDropRoundedIcon fontSize='small' sx={{verticalAlign: "middle", marginRight: "5px"}}/>Eau</div>
              <div className={styles.ml}>0.03L</div>
              {/* <div className={styles.b}>En savoir plus</div> */}
            </div>
            <div className={styles.middle}>
              <div className={styles.t}><ParkRoundedIcon fontSize='small' sx={{verticalAlign: "middle", marginRight: "5px"}}/>Arbre</div>
              <div className={styles.ml}>0.03L</div>
              {/* <div className={styles.b}>En savoir plus</div> */}
            </div>
            <div className={styles.right}>
              <div className={styles.t}><CloudRoundedIcon fontSize='small' sx={{verticalAlign: "middle", marginRight: "5px"}}/>Co2</div>
              <div className={styles.ml}>0.03L</div>
              {/* <div className={styles.b}>En savoir plus</div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
