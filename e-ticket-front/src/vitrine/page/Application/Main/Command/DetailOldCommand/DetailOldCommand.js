import React, { useState, useEffect } from "react";
import styles from "./DetailOldCommand.module.scss";
import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const DetailOldCommand = () => {
  const { id } = useParams();
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

  const [listOfProducts, setListOfProducts] = useState(products);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;
    listOfProducts.map((item) => (
      price = price + item.price
    ))
    setTotalPrice(price)                                                          
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1>Commande n°{id}, fait le -- --{/*TODO date de la commande*/}</h1>
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
