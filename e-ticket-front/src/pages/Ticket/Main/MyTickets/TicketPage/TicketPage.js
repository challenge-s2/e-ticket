import React, { useState, useEffect } from "react";
import styles from "./TicketPage.module.scss";
import { useParams } from "react-router-dom";

const TicketPage = () => {
  const { id } = useParams();
  const ticket = {
    id: 3,
    name: "FNAC",
    place: "Bordeaux",
    date: "2023-05-10 17:00:00",
    totalPrice: 27.98,
    lenArticles: 5,
  };

  const articles = [
    {
      name: 'Tisane Bio',
      quantity: 1,
      price: 5.00
    },
    {
      name: "Lait d'avoine 1L",
      quantity: 1,
      price: 2.50
    },
    {
      name: 'Melon',
      quantity: 1,
      price: 5.00
    },
    {
      name: 'Mélange Etudiant',
      quantity: 1,
      price: 8.00
    },
    {
      name: "Miel d'acacia bio",
      quantity: 1,
      price: 6.95
    },
  ]

  let realDate = new Date(ticket.date);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    setDay(
      realDate.getDate() < 10 ? "0" + realDate.getDate() : realDate.getDate()
    );
    setMonth(
      realDate.getMonth().toString.length === 1
        ? "0" + realDate.getMonth()
        : realDate.getMonth()
    );
    setYear(realDate.getFullYear());
    setHours(realDate.getHours() < 10 ? "0" + realDate.getHours() : realDate.getHours());
    setMinutes(realDate.getMinutes() < 10 ? "0" + realDate.getMinutes() : realDate.getMinutes());
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.item_home}>
          <h3>Mon ticket</h3>
          <div className={styles.item}>
            <div className={styles.company_name}>{ticket.name}</div>
            <div className={styles.company_place}>{ticket.place}</div>
            <div className={styles.company_date}>Le {`${day}/${month}/${year}`} à {`${hours}h${minutes}`}</div>

            <div className={styles.menu}>


              <div className={styles.list_item}>
                <div className={styles.left}>
                  <div className={styles.left_item_article_title}>ARTICLE</div>
                  {articles.map((item,index) => (
                    <div key={index} className={styles.left_item_article_title}>{item.name}</div>
                  ))}
                </div>
                <div className={styles.middle}>
                  <div className={styles.middle_item_article_title}>P.U. x QTE</div>
                  {articles.map((item,index) => (
                    <div key={index} className={styles.middle_item_article_title}>{item.price} x {item.quantity}</div>
                  ))}
                </div>
                <div className={styles.right}>
                  <div className={styles.right_item_article_title}>MONTANT</div>
                  {articles.map((item,index) => (
                    <div key={index} className={styles.right_item_article_title}>{item.price} €</div>
                  ))}
                </div>
              </div>


              <div className={styles.articles}>
              <div className={styles.left}>{ticket.lenArticles} articles</div>
                <div className={styles.right}>Total: {ticket.totalPrice}€</div>
              </div>


              <div className={styles.pay}>
                <div className={styles.left}>CB</div>
                <div className={styles.right}>{ticket.totalPrice}€</div>
              </div>


              <div className={styles.taxes}>

                <div className={styles.one}>
                  <div className={styles.top}>Taux</div>
                  <div className={styles.bottom}>5.50 %</div>
                </div>
                
                <div className={styles.two}>
                  <div className={styles.top}>H.T.</div>
                  <div className={styles.bottom}>26.02</div>
                </div>

                <div className={styles.three}>
                  <div className={styles.top}>T.V.A.</div>
                  <div className={styles.bottom}>1.43</div>
                </div>

                <div className={styles.four}>
                  <div className={styles.top}>T.T.C.</div>
                  <div className={styles.bottom}>{ticket.totalPrice}</div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketPage;
