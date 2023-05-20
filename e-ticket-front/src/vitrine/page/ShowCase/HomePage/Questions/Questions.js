import React from "react";
import styles from "./Questions.module.scss";
import ItemQuestion from "./ItemQuestion/ItemQuestion";

const questions = [
  {
    key: 1,
    question: "Quelle heure est-il ?",
    answer: "Il est 12h00 Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eos?",
  },
  {
    key: 2,
    question: "Quelle heure est-il ?",
    answer: "Il est 12h00 Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eos?",
  },
  {
    key: 3,
    question: "Quelle heure est-il ?",
    answer: "Il est 12h00 Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eos?",
  },
  {
    key: 4,
    question: "Quelle heure est-il ?",
    answer: "Il est 12h00 Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eos?",
  },
];

const Questions = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Les questions fréquentes : </h1>
        <div className={styles.contrainer_questions}>
          {questions.map((item) => 
          // {
          //   return console.log(item.answer)
          // }
          (
            <ItemQuestion question={item.question} answer={item.answer} key={item.key} />
          )
          )}
        </div>
      </div>
    </>
  );
};

export default Questions;
