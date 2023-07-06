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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


import CircularProgress from '@mui/material/CircularProgress';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const NewCommand = () => {
  const [openModal, setOpenModal] = useState(false);
  const [emailToSearch, setEmailToSearch] = useState('')

  const [listOfAllProducts, setListOfAllProducts] = useState([]);
  const [product, setProduct] = useState();
  const [listOfProducts, setListOfProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [redirection, setRedirection] = useState();
  const [idNewCommand, setIdNewCommand] = useState('');
  const [errorSearchEmail, setErrorSearchEmail] = useState('');
  const [stepToSearchEmail, setStepToSearchEmail] = useState('');
  const [promotion, setPromotion] = useState(0);
  const [fidelityId, setFidelityId] = useState('');

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

  const changeEmailToSearch = async (e) => {
    setEmailToSearch(e.target.value)
  }

  const searchForEmail = async () => {
    setErrorSearchEmail('')
    setPromotion(0)
    setFidelityId('')
    if(new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(emailToSearch)){
      setStepToSearchEmail('waiting')
      await axios
          .get(`/fidelity/one/${localStorage.getItem('companyId')}/${emailToSearch}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('user')}`
            }
          })
          .then((res) => {
            setFidelityId(res.data.message._id)
            console.log(res.data.message._id)
            setStepToSearchEmail('valid')
            setPromotion(res.data.message.points)
            console.log(res.data.message.points)

          })
          .catch(() => {
            setStepToSearchEmail('error')
            setErrorSearchEmail("Ce mail n'existe pas")
          })
        }
        else {
        setStepToSearchEmail('error')
        setErrorSearchEmail("Ce n'est pas un mail valide")
      }
  }

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
      console.log(`companyInformations: ${res.data.message.name} - ${res.data.message.address}`);
      console.log(parseInt(totalPrice - promotion).toFixed(2));
      console.log(typeof (totalPrice.toFixed(2) - promotion.toFixed(2)));
      axios.post('/ticket/', {
        companyId: localStorage.getItem('companyId'),
        listProducts: arrayOfProducts,
        companyInformations: `${res.data.message.name} - ${res.data.message.address}`,
        promo: parseInt(promotion.toFixed(2))
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      }).then((rs) => {
        setIdNewCommand(rs.data.message._id)
      }).then(() => {
        if(fidelityId !== '' && promotion > 0){
          axios.patch(`/fidelity/${fidelityId}`, {
            points: 0,
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('user')}`
            }
          }).then(() => {
            toast.success('Promotion ajouté !', {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            })
          })
        }
        
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
          <FormControl sx={{width: '100%'}}>
            <Box sx={{ minWidth: '100%', marginTop: "20px", display: 'flex' }}>
              {
                stepToSearchEmail === 'waiting' ?
                  <Button disabled><HourglassEmptyRoundedIcon color="warning"/></Button>
                :
                stepToSearchEmail === "error" ?
                  <Button disabled><CloseRoundedIcon color="error"/></Button>
                :
                stepToSearchEmail === "valid" ?
                  <Button disabled><TaskAltRoundedIcon color="success"/></Button>
                :
                  <Button disabled></Button>

              }
                <TextField
                  id="outlined-multiline-flexible"
                  label="Renseigner le mail"
                  value={emailToSearch}
                  onChange={(e) => changeEmailToSearch(e)}
                  sx={{ margin: "auto 0", width: "100%"}}
                  variant="standard"
                />
                <Button
                  onClick={searchForEmail}
                  color="warning"
                  variant="contained"
                  sx={{ margin: "0 0 0 20px" }}
                >
                  <SearchRoundedIcon/>
                </Button>
            </Box>
          </FormControl>
          <div style={{marginTop: '10px', color:'red'}}>{errorSearchEmail}</div>
          <h3 className={styles.title}>Résumé de la commande</h3>
          <div className={styles.content}>
            <div className={styles.t}>Promotion</div>
            <div className={styles.tr}>- {promotion.toFixed(2)} €</div>
          </div>
          <div className={styles.content}>
            <div className={styles.nbOfItem}>
              Nombre d'article : {listOfProducts.length}
            </div>
            <div className={styles.totalPrice}>{totalPrice.toFixed(2)} €</div>
          </div>
          <div className={styles.content}>
            <div className={styles.t}>Total</div>
            <div className={styles.tr}>{(totalPrice - promotion).toFixed(2)} € </div>
          </div>
          <div className={styles.complete_command}>
            {
              listOfAllProducts.length > 0 && (totalPrice - promotion).toFixed(2) > 0
            ?
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
            :
            <Box>
              <Button
                variant="contained"
                color="success"
                size="large"
                sx={{ width: "100%", marginTop: "2vh" }}
                disabled
              >
                Finaliser la commande
              </Button>
            </Box>
            }
          </div>
        </div>
        {/* <Dialog
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
              <Box sx={{ minWidth: 120, marginTop: "1vh" }}>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Renseigner le mail"
                  value={emailToSearch}
                  onChange={(e) => changeEmailToSearch(e)}
                  sx={{ marginTop: "2vh", width: "100%" }}
                />
                <Button
                  onClick={handleSubmit}
                  color="error"
                  variant="contained"
                  autoFocus
                  sx={{ padding: "1vh 1vw", margin: "1vh 1vw" }}
                >
                  Envoyer
                </Button>
              </Box>
          </DialogContent>
        </Dialog> */}
      </div>
    </>
  );
};

export default NewCommand;
