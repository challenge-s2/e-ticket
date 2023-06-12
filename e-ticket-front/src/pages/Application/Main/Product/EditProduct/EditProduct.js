import React, {useState} from "react";
import styles from "./EditProduct.module.scss";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { Navigate, useLocation, useParams } from "react-router-dom";

const EditProduct = () => {

  const { id } = useParams();
  const [name, setName] = useState(id);
  const [price, setPrice] = useState(null);


  console.log(useLocation());
  const handleSumbit = () => {
    if(name !== '' && price !== null){
      console.log(name); /* TODO Enregistrer dans la BDD */
      console.log(price); /* TODO Enregistrer dans la BDD */

      /* Après */
      <Navigate to="/app/list-products"/>
    }
  }

  return (
    <>
      <div className={styles.container}>

        <div className={styles.product_name}>
          <TextField label="Nom du produit" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" sx={{width: '75%'}}/>
        </div>

        <div className={styles.product_price}>
          <TextField label="Prix du produit" value={price} onChange={(e) => setPrice(e.target.value)} variant="outlined" sx={{width: '75%'}}/>
        </div>

        <div className={styles.button_submit}>
          <Button variant="contained" color='primary' onClick={handleSumbit} sx={{width: '75%'}}>Ajouter</Button>
        </div>


      </div>
    </>
  );
};

export default EditProduct;
