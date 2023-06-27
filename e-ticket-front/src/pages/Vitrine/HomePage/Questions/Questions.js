import React from "react";
import styles from "./Questions.module.scss";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const questions = [
  {
    key: 1,
    question: "Pourquoi choisir le ticket de caisse dématéralisé eTicket ?",
    answer: `
    <p>🌳 Écologie : Le ticket eTicket est la meilleure alternative au ticket en papier et au ticket par e-mail. Tous nos choix techniques reposent sur notre volonté de minimiser notre impact.</p>
    <p></p>
    <p>🤝 Fidélité : Des points de fidélité sont automatiquement cumulés lorsque vos clients scannent un QR code après un achat. Ils se créeront ensuite un compte dans votre programme pour utiliser ces points, et ainsi augmenteront votre taux d'embasement.</p>
    <p></p>
    <p>⭐️ Avis : Vos clients peuvent laisser un avis client en 1 clic depuis le ticket eTicket. Cela vous aidera à gagner en visibilité et en notoriété en ligne.</p>
    <p></p>
    <p>🔒 Protection des données : Nous de vendons ou ne partageons aucune donnée personnelle à des tiers, ni les vôtres, ni celles de vos clients.</p>
    <p></p>
    <p>🎓 Loi : En avril 2023, la loi anti-gaspillage interdira la distribution systématique des tickets de caisse. Adaptez-vous en 1 scan avec eTicket !</p>`,
  },
  {
    key: 2,
    question: "Comment récupérer son ticket de caisse dématérialisé eTicket ?",
    answer: `
      <p>C’est très simple, aucune application ni inscription préalable n'est requise.</p>
      <p></p>
      <p></p>
      <p>1. Vos clients paient leurs achats comme d’habitude, peu importe le moyen de paiement.</p>
      <p></p>
      <p>2. Ils scannent le QR code en caisse avec l'appareil photo de leur smartphone.</p>
      <p></p>
      <p>3. Tadaam, le ticket et les points de fidélité apparaissent !</p>
      <p></p>
      <p>4. Ils laissent un avis client sur votre enseigne en 1 clic.</p>
      <p></p>
      <p>Et pour vous ? Ça ne change rien, vous encaissez sur votre logiciel de caisse comme d'habitude. 😉</p>
    `,
  },
  {
    key: 3,
    question: "Que fait eTicket de vos données et de celles de vos clients ?",
    answer: `
    <p>La protection des données personnelles est extrêmement importante pour nous. Nous ne partagerons ou vendrons jamais de données personnelles à des tiers : ni les vôtres, ni celles de vos clients.</p>`,    
  },
  {
    key: 4,
    question: "Qu’est-ce que eTicket change à ma routine d’encaissement ?",
    answer:
      "<p>Absolument rien ! Nous nous occupons d'intégrer eTicket à votre logiciel de caisse.</p>",
  },
];

const Questions = () => {
  const htmlParser = new DOMParser()
  return (
    <>
      <div className={styles.container}>
        <h1>Les questions fréquentes : </h1>
        <div className={styles.contrainer_questions}>
          {questions.map((item) => (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="content"
                id="header"
              >
                <Typography sx={{ fontSize: "x-large", fontWeight: "bold" }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div dangerouslySetInnerHTML={{__html: item.answer}}/>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
};

export default Questions;
