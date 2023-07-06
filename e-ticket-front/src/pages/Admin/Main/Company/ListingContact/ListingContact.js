import React, { useState, useEffect } from "react";
import styles from "./ListingContact.module.scss";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Moment from "moment";
import axios from "axios";
import LastPageIcon from "@mui/icons-material/LastPage";

import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import DangerousRoundedIcon from '@mui/icons-material/DangerousRounded';

const ListingContact = () => {
    const [contacts, setContacts] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    
    const fetchContacts = async () => {
      const contactsRaw = await axios.get('/contact', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      });
      setContacts(contactsRaw.data.message)
      setTotalItems(contactsRaw.data.message.length)
    }
  
    useEffect(() => {
      fetchContacts();
    },[])

  
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
            <h2>Liste des demandes de contacts:</h2>
            <div className={styles.container_grid}>
              <table>
                <thead>
                  <tr>
                    <th>Personne</th>
                    <th>Entreprise</th>
                    <th>Type d'entreprise</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts
                    //.filter((cont) => cont.status === 'pending')
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{item.firstname.substring(0,1)}. {item.lastname}</td>
  
                        <td>{item.companyName}</td>
  
                        <td>{item.type}</td>

                        <td>{Moment(item.registerDate).format("DD/MM/YYYY").toLocaleString('fr-FR')}</td>
  
                        {
                            item.status === 'pending'
                        ?
                          <td><HourglassEmptyRoundedIcon color="warning"/></td>
                        :
                          item.status === 'valid'
                        ?
                        <td><VerifiedRoundedIcon color="success"/></td>
                        :
                        <td><DangerousRoundedIcon color="error"/></td>
                        }

                        <td>
                          <Link to={`/admin/contact/${item._id}`}>
                            <Button variant="contained">
                              <LastPageIcon/>
                            </Button>
                          </Link>
                          {/* <Button variant="contained" color="error" onClick={() => deleteCompany(item._id)}>
                            <DeleteRoundedIcon />
                          </Button> */}
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
  
  export default ListingContact;
