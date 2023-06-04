import React, { useState } from "react";
import styles from "./ListOfProducts.module.scss";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

import Moment from "moment";

const ListOfProducts = () => {
  const content = [
    {
      id: 1,
      name: "John",
      price: 7.5,
      date: "2023-05-02T00:10:00",
    },
    {
      id: 2,
      name: "John",
      price: 8.97,
      date: "2023-05-02T00:00:10",
    },
    {
      id: 3,
      name: "John",
      price: 48.75,
      date: "2023-05-02T00:00:00",
    },
    {
      id: 4,
      name: "John",
      price: 7.78,
      date: "2023-05-02T00:00:00",
    },
    {
      id: 5,
      name: "John",
      price: 46.54,
      date: "2023-05-02T00:00:00",
    },
    {
      id: 6,
      name: "John",
      price: 2.53,
      date: "2023-05-02T00:00:00",
    },
    {
      id: 7,
      name: "John",
      price: 55.42,
      date: "2023-05-02T00:00:00",
    },
    {
      id: 8,
      name: "John",
      price: 7.5,
      date: "2023-05-02T00:00:00",
    },
    {
      id: 9,
      name: "John",
      price: 8.97,
      date: "2023-05-02T00:00:00",
    },
    {
      id: 10,
      name: "John",
      price: 48.75,
      date: "2023-05-02T00:00:00",
    },
    {
      id: 11,
      name: "John",
      price: 7.5,
      date: "2023-05-02T10:00:00",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(content.length);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const editProduct = (product) => {
    console.log(product); /* TDOD lien vers la page d'édition */
  }

  const banProduct = (product) => {
    console.log(product); /* TDOD connexion avec la BDD */
  }

  const deleteProduct = (product) => {
    console.log(product); /* TDOD connexion avec la BDD */
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_commlist}>
          <h2>Liste des produits en base de donnée:</h2>
          <div className={styles.container_grid}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nom</th>
                  <th>Prix</th>
                  <th>Date d'ajout</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {content
                  .filter(
                    (item, index) =>
                      index >= page * rowsPerPage &&
                      index <= (page + 1) * rowsPerPage - 1
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>

                      <td>{item.name}</td>

                      <td>{item.price}€</td>

                      <td>
                        {Moment(item.date).format("dddd MM YYYY, HH:mm:ss")}
                      </td>

                      <td>
                        <ButtonGroup>
                          <Button variant="contained"  onClick={() => editProduct(item.id)}>
                            <DriveFileRenameOutlineIcon />
                          </Button>
                          <Button variant="outlined" color="error" onClick={() => banProduct(item.id)}>
                            <DoDisturbIcon />
                          </Button>
                          <Button variant="contained" color="error" onClick={() => deleteProduct(item.id)}>
                            <DeleteIcon />
                          </Button>
                        </ButtonGroup>
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
