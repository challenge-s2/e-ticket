import React, { useEffect, useState } from "react";
import styles from "./NewCommand.module.scss";
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
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom"

const NewCommand = () => {
  const [listOfAllProducts, setListOfAllProducts] = useState([])
  const [product, setProduct] = useState();
  const [listOfProducts, setListOfProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [redirection, setRedirection] = useState()
  const [idNewCommand, setIdNewCommand] = useState('')

  const fetchProduct = async () => {
    if(localStorage.getItem('companyId') !== ''){

      await axios
        .get(`/products/company/${localStorage.getItem('companyId')}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user')}`
          }
        })
        .then((res) => setListOfAllProducts(res.data.message))
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [])

  useEffect(() => {
    console.log(listOfProducts);
    let total = 0;
    for (
      let productInArray = 0;
      productInArray < listOfProducts.length;
      productInArray++
    ) {
      total = total + listOfAllProducts.filter((ele) => ele._id === listOfProducts[productInArray])[0].price;
      // total = total + productsRaw.filter((ele) => ele.id === listOfProducts[productInArray])[0].price;
    }
    setTotalPrice(total);
  }, [listOfProducts]);

  useEffect(() => {
    console.log(totalPrice);
  }, [totalPrice]);

  const handleChange = (event) => {
    setProduct(event.target.value);
  };

  const addNewProductToList = (newProduct) => {
    if (newProduct === null) {
      setListOfProducts([...listOfProducts, product]);
      setProduct('');
    } else {
      setListOfProducts([...listOfProducts, newProduct]);
    }
  };

  const removeProductToList = (productToRemove) => {
    setListOfProducts(
      listOfProducts.filter(
        (ele, index) => index !== listOfProducts.lastIndexOf(productToRemove)
      )
    );
  };


  const handleSubmit = async () => {
    console.log(listOfProducts)
    console.log(totalPrice)
    const arrayOfProducts = []
    listOfProducts.map((item) => (
      arrayOfProducts.push({
        _id: listOfAllProducts.filter((prod) => prod._id === item)[0]._id,
        name: listOfAllProducts.filter((prod) => prod._id === item)[0].name,
        price: listOfAllProducts.filter((prod) => prod._id === item)[0].price
      })
    ))
    console.log(arrayOfProducts)
    await axios.get(`/company/${localStorage.getItem('companyId')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    }).then((res) => 
    {
      console.log(`companyInformations: ${res.data.message.name} - ${res.data.message.address}`)
      axios.post('/ticket/', {
        companyId: localStorage.getItem('companyId'),
        listProducts: arrayOfProducts,
        companyInformations: `${res.data.message.name} - ${res.data.message.address}`,
        promo: parseInt(0)
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      }).then((rs) => {
        setIdNewCommand(rs.data.message._id)
      }).then(() => 
          toast.success('Commande ajouté !', {
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
    })
    
  }

  useEffect(() => {
    if(idNewCommand !== ''){
      setRedirection(true)
    }
  },[idNewCommand])

  return (
    <>
      {redirection ? <Navigate to={`/app/detail-old-command/${idNewCommand}`} /> : <></>}
      <div className={styles.container}>
        <div className={styles.top}>
          <Box sx={{ minWidth: 120, display: "flex" }}>
            <FormControl fullWidth>
              <InputLabel id="label_form_add_product">
                Nouveau produit
              </InputLabel>
              <Select
                labelId="label_form_add_product"
                id="select_form_add_product"
                value={product}
                label="Nouveau produit"
                onChange={handleChange}
                sx={{ textAlign: "left" }}
              >
                {/*{productsRaw.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}*/}

                {listOfAllProducts.map((item, index) => (
                  <MenuItem value={item._id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: "1vw" }}
              onClick={() => addNewProductToList(null)}
            >
              <AddIcon />
            </Button>
          </Box>

          <div className={styles.list_container}>
            {listOfProducts
              .filter((value, index, array) => array.indexOf(value) === index)
              .map((item, index) => (
                <div key={index}>
                  <div className={styles.left}>
                    {listOfAllProducts.find((i) => i._id === item).name}
                  </div>

                  <div className={styles.right}>
                    <ButtonGroup aria-label="outlined primary button group">
                      <Button
                        color="error"
                        onClick={() => removeProductToList(item)}
                      >
                        {listOfProducts.filter((i) => i === item).length ===
                        1 ? (
                          <DeleteIcon />
                        ) : (
                          <RemoveIcon />
                        )}
                      </Button>
                      <Button disabled>
                        {listOfProducts.filter((i) => i === item).length}
                      </Button>
                      <Button onClick={() => addNewProductToList(item)}>
                        <AddIcon color="success" />
                      </Button>
                    </ButtonGroup>
                  </div>
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
          <div className={styles.complete_command}>
            <Box>
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{ width: "100%", marginTop: "2vh" }}
                onClick={handleSubmit}
              >
                Finaliser la commande
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCommand;
