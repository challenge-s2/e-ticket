import React, { useState, useEffect } from "react";
import styles from "./ListingCompany.module.scss";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Moment from "moment";
import axios from "axios";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { toast } from "react-toastify";


const ListOldCommand = () => {
    const [companies, setCompanies] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    
    const fetchCompanies = async () => {
      const companiesRaw = await axios.get('/company');
      setCompanies(companiesRaw.data.message)
      console.log(companies)
      setTotalItems(companiesRaw.data.message.length)
    }
  
    useEffect(() => {
      fetchCompanies();
    },[])

  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };

    const deleteCompany = async (id) => {
      await axios.delete(`/company/${id}`)
        .then(() => 
        toast.success('Entreprise supprimée !', {
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
        fetchCompanies();
    }
  
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
                    <th>Nom de l'entreprise</th>
                    <th>Description</th>
                    <th>Type d'entreprise</th>
                    <th>Date d'arrivé</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {companies
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item._id}</td>
  
                        <td>{item.name}</td>
  
                        <td>{item.description}</td>

                        <td>{item.type}</td>

                        <td>{Moment(item.registerDate).format("dddd MM YYYY").toLocaleString('fr-FR')}</td>
  
                        <td>
                          <Link to={`/admin/company/${item._id}`}>
                            <Button variant="contained">
                              <LastPageIcon />
                            </Button>
                          </Link>
                          <Button variant="contained" color="error" onClick={() => deleteCompany(item._id)}>
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
  
  export default ListOldCommand;
