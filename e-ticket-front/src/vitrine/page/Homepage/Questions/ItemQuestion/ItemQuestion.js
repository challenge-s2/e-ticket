import { React, useState } from "react";
import styles from "./ItemQuestion.module.scss";
import { CSSTransition } from "react-transition-group";
import "./ItemQuestion.css"

const ItemQuestion = ({ question, answer }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  // const nodeRef = useRef(null);

  const handleChangeDisplay = () => {
    setShowAnswer(!showAnswer);
    console.log(showAnswer);
  };
  // console.log(question);
  return (
    <>
      <div className={styles.item_question}>
        <div className={styles.question_bar}>
          <span className={styles.content_question}>{question}</span>
          <button
            className={styles.icon_down + " bttn bttn-prim-out"}
            onClick={() => setShowAnswer(!showAnswer)}
          >
            🔽
          </button>
        </div>
        <CSSTransition
          in={showAnswer}
          timeout={500}
          classNames="hideAnswer"
          unmountOnExit
        >
          <div className="answer">{answer}</div>
        </CSSTransition>
      </div>
    </>
  );
};

export default ItemQuestion;
