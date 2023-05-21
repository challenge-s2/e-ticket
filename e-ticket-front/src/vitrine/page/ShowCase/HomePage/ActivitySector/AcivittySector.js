import { React, useState } from "react";
import styles from "./ActivitySector.module.scss";
import FormSector from "./FormSector/FormSector";
import { CSSTransition } from "react-transition-group";
import "./ActivitySector.css";

const content = [
  {
    key: 1,
    name: "Fastfood",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 2,
    name: "Institue de beauté",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 3,
    name: "Vente d'eCigarette",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 4,
    name: "Boulangerie/Patisserie",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 5,
    name: "Autre",
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
];

const ActivitySector = () => {
  const [activitySector, setActivitySector] = useState(null);

  const handleShowForm = (num) => {
    setActivitySector(num);
  };

  const closeForm = () => {
    setActivitySector(null);
  };

  return (
    <>
      <div className={styles.container}>
        <CSSTransition
          in={activitySector !== null}
          timeout={300}
          classNames="form"
          unmountOnExit
        >
          <FormSector
            number={activitySector}
            sectors={content}
            closeForm={closeForm}
          />
        </CSSTransition>
        <h1>Sélectionnez votre secteur d'activité :</h1>
        <div className={styles.container_item}>
          {content.map((item, index) => (
            <div className="item-csa" key={index}>
              <img
                src={item.img}
                alt={item.alt}
                onClick={() => handleShowForm(item.key)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ActivitySector;
