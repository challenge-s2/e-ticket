import React from "react";
import styles from "./Contributors.module.scss";
import bpi from "../../../../utils/assets/logo-bpi.svg"
import cegid from "../../../../utils/assets/logo-cegid.svg"
import laruche from "../../../../utils/assets/logo-laruche.svg"
import sista from "../../../../utils/assets/logo-sista.svg"
import stationf from "../../../../utils/assets/logo-bpi.svg"
import wilco from "../../../../utils/assets/logo-wilco.svg"

const content = [
  {
    key: 1,
    img: bpi,
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 2,
    img: cegid,
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 3,
    img: laruche,
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 4,
    img: sista,
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 5,
    img: stationf,
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 6,
    img: wilco,
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 7,
    img: laruche,
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 8,
    img: sista,
    alt: "image of the activity sector to choose",
    link: "",
  },
];

const Contributors = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.itemsF}>
          {content.map((item) => (
            <div className={styles.item} key={item.key}>
              <img src={item.img} alt={item.alt} />
            </div>
          ))}
        </div>
        <div className={styles.itemsS}>
          {content.map((item) => (
            <div className={styles.item} key={item.key}>
              <img src={item.img} alt={item.alt} />
            </div>
          ))}
        </div>
        <div className={styles.itemsT}>
          {content.map((item) => (
            <div className={styles.item} key={item.key}>
              <img src={item.img} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Contributors;
