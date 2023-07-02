import React, {useState, useEffect} from "react";
import styles from "./EditProduct.module.scss";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { Navigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditProduct = () => {

  const { id } = useParams();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [redirection, setRedirection] = useState(false)


  const fetchCompanies = async () => {
    const productRaw = await axios.get('/products/' + id)
    setName(productRaw.data.message.name)
    setPrice(productRaw.data.message.price)
  }

  useEffect(() => {
    fetchCompanies();
  },[])

  console.log(useLocation());
  const handleSumbit = async () => {
    if(name !== '' && price !== null){
      await axios.patch(`/products/${id}`)
      .then(() => 
        toast.success('Produit mis à jour !', {
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
          <TextField label="Nom du produit" value={name} disabled onChange={(e) => setName(e.target.value)} variant="outlined" sx={{width: '100%'}}/>
        </div>

        <div className={styles.product_price}>
          <TextField label="Prix du produit" value={price} disabled onChange={(e) => setPrice(e.target.value)} variant="outlined" sx={{width: '100%'}}/>
        </div>

        {/* <div className={styles.button_submit}>
          <Button variant="contained" color='primary' onClick={handleSumbit} sx={{width: '100%'}}>Ajouter</Button>
        </div> */}


      </div>
    </>
  );
};

export default EditProduct;
