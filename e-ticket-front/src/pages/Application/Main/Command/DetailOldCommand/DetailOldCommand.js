import React, { useState, useEffect } from "react";
import styles from "./DetailOldCommand.module.scss";
import { useParams } from "react-router-dom";

const products = [
  //Exemple TODO > connexion avec la BDD
  {
    id: 1,
    name: "Banane",
    price: 1.98,
  },
  {
    id: 2,
    name: "Pomme",
    price: 0.8,
  },
  {
    id: 3,
    name: "Kiwi",
    price: 1.88,
  },
  {
    id: 4,
    name: "Cerise",
    price: 1.92,
  },
  {
    id: 5,
    name: "Cerise",
    price: 1.92,
  },
  {
    id: 6,
    name: "Cerise",
    price: 1.92,
  },
  {
    id: 7,
    name: "Poire",
    price: 1.8,
  },
  {
    id: 8,
    name: "Orange",
    price: 2.08,
  },
  {
    id: 9,
    name: "Cerise",
    price: 1.92,
  },
  {
    id: 10,
    name: "Cerise",
    price: 1.92,
  },
  {
    id: 11,
    name: "Cerise",
    price: 1.92,
  },
  {
    id: 12,
    name: "Cerise",
    price: 1.92,
  },
  {
    id: 13,
    name: "Cerise",
    price: 1.92,
  },
];

const DetailOldCommand = () => {
  const { id } = useParams();
  /* const command = await axios.get(`localhost:3000/command/${id}`) */
  /* const allProductsRaw = await axios.get('localhost:3000/products/') */
  /* const productsOfCommand = command.products */

  const [listOfProducts, setListOfProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setListOfProducts(products);
    // setListOfProducts(productsOfCommand);
  }, []);

  useEffect(() => {
    let price = 0;
    listOfProducts.map((item) => (price = price + item.price));
    // listOfProducts.map((item) => (price = price + allProductsRaw.filter((prod) => prod._id === item).price));
    setTotalPrice(price);
  }, [listOfProducts]);

  return (
    <>
      <div className={styles.container}>
        <h1>
          Commande n°{id}, fait le -- --{/*command.date*/}
        </h1>
        <div className={styles.top}>
          <div className={styles.list_container}>
            {listOfProducts.map((item, index) => (
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
            <div className={styles.nbOfItem}>
              Nombre d'article : {listOfProducts.length}
            </div>
            <div className={styles.totalPrice}>{totalPrice.toFixed(2)} €</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailOldCommand;
