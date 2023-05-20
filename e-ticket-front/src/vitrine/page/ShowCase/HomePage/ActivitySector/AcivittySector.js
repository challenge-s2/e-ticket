import React from "react";
import styles from "./ActivitySector.module.scss";

const content = [
  {
    key:1,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key:2,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key:3,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key:4,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key:5,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key:6,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key:7,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
];

const ActivitySector = ({handleShowForm}) => {
  return (
    <>
      <div className={styles.container}>
        <h1>Sélectionnez votre secteur d'activité :</h1>
        <div className={styles.container_item}>
          {content.map((item, index) => (
            <div className="item-csa" key={index}>
              <img src={item.img} alt={item.alt} onClick={() => handleShowForm(item.key)}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ActivitySector;
