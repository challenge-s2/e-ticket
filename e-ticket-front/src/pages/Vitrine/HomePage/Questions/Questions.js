import React from "react";
import styles from "./Questions.module.scss";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
            (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="content"
                  id="header"
                >
                  <Typography>{item.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Questions;
