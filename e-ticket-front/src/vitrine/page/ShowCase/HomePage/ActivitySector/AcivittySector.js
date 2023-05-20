import { React, useState } from "react";
import styles from "./ActivitySector.module.scss";
import FormSector from "./FormSector/FormSector";
import { FaWindowClose } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const content = [
  {
    key: 1,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 2,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 3,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 4,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 5,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 6,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
  {
    key: 7,
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
    console.log(activitySector);
  };

  return (
    <>
      <div className={styles.container}>
        {activitySector !== null ? (
          <>
            <div className={styles.close} onClick={() => closeForm()}>
              <MdClose size={30} />
            </div>
            <FormSector number={activitySector} sectors={content} />
          </>
        ) : (
          <></>
        )}
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
