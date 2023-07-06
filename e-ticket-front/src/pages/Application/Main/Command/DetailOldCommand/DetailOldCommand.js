import React, { useState, useEffect } from "react";
import styles from "./DetailOldCommand.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import Moment from "moment";

const DetailOldCommand = () => {
  const { id } = useParams();
  const [commandInfo, setCommandInfo] = useState()
  const [totalPrice, setTotalPrice] = useState(0);


  const getTotalPrice = () => {
    let price = 0
    commandInfo?.listProducts.map((item) => (
      price = price + item.price
    ))
    setTotalPrice(price);
  }

  const fetchData = async () => {
    const commandInfoRaw = await axios.get('/ticket/'+ id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    }).then((res) => setCommandInfo(res.data.message))
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    getTotalPrice();
  },[commandInfo])

  return (
    <>
      <div className={styles.container}>
        <h1>
          Commande n°{id}, réalisée le {Moment(commandInfo?.creationDate).format("DD/MM/YYYY").toLocaleString('fr-FR')}
        </h1>
        <div className={styles.top}>
          <div className={styles.list_container}>
            {commandInfo?.listProducts.map((item, index) => (
              <div key={index}>
                <div className={styles.left}>{item.name}</div>
                <div className={styles.right}>{item.price}€</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.bottom}>
          <h3 className={styles.title}>Résumé de la commande</h3>
          <div className={styles.content}>
            <div className={styles.t}>Promotion</div>
            <div className={styles.tr}>- {commandInfo?.promo.toFixed(2)} €</div>
          </div>
          <div className={styles.content}>
            <div className={styles.nbOfItem}>
              Nombre d'article : {commandInfo?.listProducts.length}
            </div>
            <div className={styles.totalPrice}>{totalPrice.toFixed(2)} €</div>
          </div>
          <div className={styles.content}>
            <div className={styles.t}>Total</div>
            <div className={styles.tr}>{(totalPrice - commandInfo?.promo).toFixed(2)} € </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailOldCommand;
