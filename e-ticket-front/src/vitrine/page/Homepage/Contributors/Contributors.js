import React from "react";
import styles from "./Contributors.module.scss";


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
  {
    key: 8,
    img: "https://placehold.co/400",
    alt: "image of the activity sector to choose",
    link: "",
  },
];

const Contributors = () => {
  return (
    <>
      <div className={styles.container}>
        {content.map((item) => (
          <div className={styles.item} key={item.key}>
            <img src={item.img} alt={item.alt} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Contributors;
