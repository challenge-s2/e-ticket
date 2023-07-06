import React, {useState, useEffect} from "react";
import styles from "./EditProduct.module.scss";
import TextField from '@mui/material/TextField';
import { useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {

  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);


  const fetchCompanies = async () => {
    const productRaw = await axios.get('/products/' + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
    setName(productRaw.data.message.name)
    setPrice(productRaw.data.message.price)
  }

  useEffect(() => {
    fetchCompanies();
  },[])


  return (
    <>
      <div className={styles.container}>

        <div className={styles.product_name}>
          <TextField label="Nom du produit" value={name} disabled onChange={(e) => setName(e.target.value)} variant="outlined" sx={{width: '100%'}}/>
        </div>

        <div className={styles.product_price}>
          <TextField label="Prix du produit" type="number" disabled value={price} onChange={(e) => setPrice(e.target.value)} variant="outlined" sx={{width: '100%'}}/>
        </div>


      </div>
    </>
  );
};

export default EditProduct;
