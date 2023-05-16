import React from "react";
import styles from "./ActivitySector.module.scss";

const content = [
  {
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
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
              <img src={item.img} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ActivitySector;
