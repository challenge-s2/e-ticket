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
    name: "Poire",
    price: 1.8,
  },
  {
    id: 6,
    name: "Orange",
    price: 2.08,
  },
  {
    id: 7,
    name: "Kiwii",
    price: 1.88,
  },
  {
    id: 8,
    name: "Cerisei",
    price: 1.92,
  },
  {
    id: 9,
    name: "Poirei",
    price: 1.8,
  },
  {
    id: 10,
    name: "Orangei",
    price: 2.08,
  },
];

/* const productsRaw = await axios.get('localhost:3000/products/') */

const NewCommand = () => {
  const [product, setProduct] = useState();
  const [listOfProducts, setListOfProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    console.log(listOfProducts);
    let total = 0;
    for (
      let productInArray = 0;
      productInArray < listOfProducts.length;
      productInArray++
    ) {
      total = total + products.filter((ele) => ele.id === listOfProducts[productInArray])[0].price;
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


  const handleSubmit = () => {
    console.log(listOfProducts)
    console.log(totalPrice)

    /* axios.post('localhost:3000/command', {
      listOfProducts: listOfProducts,
      totalPrice: totalPrice
    }) */
  }

  return (
    <>
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

                {products.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
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
                    {products.find((i) => i.id === item).name}
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
