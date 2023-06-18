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
    🌳 Écologie : Le ticket eTicket est la meilleure alternative au ticket en papier et au ticket par e-mail. Tous nos choix techniques reposent sur notre volonté de minimiser notre impact.
    \n🤝 Fidélité : Des points de fidélité sont automatiquement cumulés lorsque vos clients scannent un QR code après un achat. Ils se créeront ensuite un compte dans votre programme pour utiliser ces points, et ainsi augmenteront votre taux d'embasement.
    \n⭐️ Avis : Vos clients peuvent laisser un avis client en 1 clic depuis le ticket eTicket. Cela vous aidera à gagner en visibilité et en notoriété en ligne.
    \n🔒 Protection des données : Nous de vendons ou ne partageons aucune donnée personnelle à des tiers, ni les vôtres, ni celles de vos clients.
    \n🎓 Loi : En avril 2023, la loi anti-gaspillage interdira la distribution systématique des tickets de caisse. Adaptez-vous en 1 scan avec eTicket !`,
  },
  {
    key: 2,
    question: "Comment récupérer son ticket de caisse dématérialisé eTicket ?",
    answer:`
      C’est très simple, aucune application ni inscription préalable n'est requise.
      
      1. Vos clients paient leurs achats comme d’habitude, peu importe le moyen de paiement.
      2. Ils scannent le QR code en caisse avec l'appareil photo de leur smartphone.
      3. Tadaam, le ticket et les points de fidélité apparaissent !
      4. Ils laissent un avis client sur votre enseigne en 1 clic.
      Et pour vous ? Ça ne change rien, vous encaissez sur votre logiciel de caisse comme d'habitude. 😉
    `    
  },
  {
    key: 3,
    question: "Que fait eTicket de vos données et de celles de vos clients ?",
    answer: `La protection des données personnelles est extrêmement importante pour nous. Nous ne partagerons ou vendrons jamais de données personnelles à des tiers : ni les vôtres, ni celles de vos clients.`,
  },
  {
    key: 4,
    question: "Qu’est-ce que eTicket change à ma routine d’encaissement ?",
    answer:
      "Absolument rien ! Nous nous occupons d'intégrer eTicket à votre logiciel de caisse.",
  },
];

const Questions = () => {
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
                <Typography sx={{fontSize: "x-large"}}>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </>
  );
};

export default Questions;
