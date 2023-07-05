import React, {useState} from "react";
import styles from "./NewProduct.module.scss";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const NewProduct = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState(null);
  const [redirection, setRedirection] = useState(false)

  const handleSumbit = async () => {
    if(name !== '' && price !== null){
      await axios.post('/products/',{
        name: name,
        price: parseInt(price),
        companyId: localStorage.getItem('companyId')
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      }).then(() => 
      toast.success('Produit ajouté !', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      )

      setRedirection(true)
    }
  }

  return (
    <>
      {redirection ? <Navigate to='/app/list-products' replace /> : <></>}
      <div className={styles.container}>

        <div className={styles.product_name}>
          <TextField label="Nom du produit" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" sx={{width: '100%'}}/>
        </div>

        <div className={styles.product_price}>
          <TextField label="Prix du produit (en €)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} variant="outlined" sx={{width: '100%'}}/>
        </div>

        <div className={styles.button_submit}>
          <Button variant="contained" color='primary' onClick={handleSumbit} sx={{width: '100%'}}>Ajouter</Button>
        </div>


      </div>
    </>
  );
};

export default NewProduct;
