import React, { useState } from "react";
import styles from "./ListOldCommand.module.scss";
import LastPageIcon from "@mui/icons-material/LastPage";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";

const ListOldCommand = () => {
  const content = [
    {
      id: 1,
      price: 7.5,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 2,
      price: 8.97,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 3,
      price: 48.75,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 4,
      price: 7.78,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 5,
      price: 46.54,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 6,
      price: 2.53,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 7,
      price: 55.42,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 8,
      price: 7.5,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 9,
      price: 8.97,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 10,
      price: 48.75,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 11,
      price: 7.5,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 12,
      price: 8.97,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 13,
      price: 48.75,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 14,
      price: 7.78,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 15,
      price: 46.54,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 16,
      price: 2.53,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 17,
      price: 55.42,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 18,
      price: 7.5,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 19,
      price: 8.97,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
    {
      id: 20,
      price: 48.75,
      people: "John",
      date: "2023-15-01 10:20:00",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(content.length);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_commlist}>
          <h2>Liste des anciènnes commandes:</h2>
          <div className={styles.container_grid}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Prix total</th>
                  <th>Date de la commande</th>
                  <th>Par qui ?</th>
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

                      <td>{item.price}</td>

                      <td>{item.date}</td>

                      <td>{item.people}</td>

                      <td>
                        <Button variant='contained'>
                          <LastPageIcon />
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

export default ListOldCommand;
