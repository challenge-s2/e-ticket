import { React, useState } from "react";
import styles from "./ItemQuestion.module.scss";

const ItemQuestion = ({ question, answer }) => {

  const [display, setDisplay] = useState(false);

  const handleChangeDisplay = () => {
    setDisplay(!display);
    console.log(display);
  };
  // console.log(question);
  return (
    <>
      <div className={styles.item_question}>
        <div className={styles.question_bar}>
          <span className={styles.content_question}>{question}</span>
          <button
            className={styles.icon_down + " bttn bttn-prim-out"}
            onClick={handleChangeDisplay}
          >
            \/
          </button>
        </div>
        <div
          className={styles.answer}
          style={{ display: display ? "block" : "none"}}
        >
          {answer}
        </div>
      </div>
    </>
  );
};

export default ItemQuestion;
