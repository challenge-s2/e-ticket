import React from "react";
import styles from "./ActivitySector.module.scss";
import "./ActivitySector.css";
import boulangerieImg from "../../../../utils/assets/Boulangerie_V0.3.jpg";
import coffeeShopImg from "../../../../utils/assets/Coffeeshop.jpg";
import eCigaretteImg from "../../../../utils/assets/eCigarette.jpg";
import fastfoodImg from "../../../../utils/assets/Fastfood_V0.1.jpg";
import beatuySalonImg from "../../../../utils/assets/Salon-beaute.jpg";
import otherImg from "../../../../utils/assets/Autres_V0.1.jpg";

const content = [
  {
    key: 1,
    name: "Boulangerie/Patisserie",
    img: boulangerieImg,
    alt: "image of a bakery",
    link: "",
  },
  {
    key: 2,
    name: "Salon de beauté",
    img: beatuySalonImg,
    alt: "image of a beauty salon",
    link: "",
  },
  {
    key: 3,
    name: "Magazin d'eCigarette",
    img: eCigaretteImg,
    alt: "image of a eCigarette shop",
    link: "",
  },
  {
    key: 4,
    name: "Fastfood",
    img: fastfoodImg,
    alt: "image of a fastfood",
    link: "",
  },
  {
    key: 5,
    name: "Cafétéria",
    img: coffeeShopImg,
    alt: "image of a coffee shop",
    link: "",
  },
  {
    key: 6,
    name: "Autre",
    img: otherImg,
    alt: "image of other",
    link: "",
  },
];

const ActivitySector = () => {


  return (
    <>
      <div className={styles.container}>
        <h1>Sélectionnez votre secteur d'activité :</h1>
        <div className={styles.container_item}>
          {content.map((item, index) => (
            <div className="item-csa" key={index}>
              <img
                src={item.img}
                alt={item.alt}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ActivitySector;
