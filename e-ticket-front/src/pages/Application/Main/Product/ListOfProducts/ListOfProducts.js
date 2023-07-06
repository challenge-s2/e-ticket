import React, { useState, useEffect } from "react";
import styles from "./ListOfProducts.module.scss";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Moment from "moment";
import axios from "axios";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { toast } from "react-toastify";


const ListOfProducts = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    
    const fetchProducts = async () => {
      const productsRaw =await axios
      .get(`/products/company/${localStorage.getItem('companyId')}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      })
      setProducts(productsRaw.data.message)
      setTotalItems(productsRaw.data.message.length)
    }
  
    useEffect(() => {
      fetchProducts();
    },[])

  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };

    const deleteProduit = async (item) => {
      await axios.delete(`/products/${item._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      })
      .then(() => 
        toast.success('Produit supprimé !', {
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
      fetchProducts()
    }
  
    return (
      <>
        <div className={styles.container}>
          <div className={styles.container_commlist}>
            <h2>Liste des produits:</h2>
            <div className={styles.container_grid}>
              <table>
                <thead>
                  <tr>
                    <th>Nom du produit</th>
                    <th>Prix</th>
                    <th>Date d'ajout</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products
                    .map((item, index) => (
                      <tr key={index}>
  
                        <td>{item.name}</td>
  
                        <td>{item.price}€</td>

                        <td>{Moment(item.creationDate).format("DD/MM/YYYY").toLocaleString('fr-FR')}</td>
                        
                        <td>
                          <Link to={`/app/edit-product/${item._id}`}>
                            <Button variant="contained">
                              <LastPageIcon />
                            </Button>
                          </Link>
                          <Button variant="contained" color="error" onClick={() => deleteProduit(item)}>
                            <DeleteRoundedIcon />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className={styles.pagination}>
                <TablePagination
                  component="div"
                  count={totalItems}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default ListOfProducts;

