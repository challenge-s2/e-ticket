import React, { useState, useEffect } from "react";
import styles from "./ListingUsers.module.scss";
import TablePagination from "@mui/material/TablePagination";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import LastPageIcon from "@mui/icons-material/LastPage";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { toast } from "react-toastify";


const ListingUsers = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    
    const fetchUsers = async () => {
      const usersRaw = await axios.get('/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      });
      setUsers(usersRaw.data.message)
      setTotalItems(usersRaw.data.message.length)
    }
  
    useEffect(() => {
      fetchUsers();
    },[])

  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value));
      setPage(0);
    };

    const deleteUser = async (id) => {
      await axios.delete(`/users/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('user')}`
        }
      })
        .then(() => 
        toast.success('Utilisateur supprimée !', {
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
        fetchUsers();
    }
  
    return (
      <>
        <div className={styles.container}>
          <div className={styles.container_commlist}>
            <h2>Liste des utilisateurs:</h2>
            <div className={styles.container_grid}>
              <table>
                <thead>
                  <tr>
                    {/* <th>ID</th> */}
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .map((item, index) => (
                      <tr key={index}>
                        {/* <td>{item._id}</td> */}
  
                        <td>{item.email}</td>
  
                        <td>{item.roles}</td>


                        {/*<td>{Moment(item.registerDate).format("DD/MM/YYYY").toLocaleString('fr-FR')}</td>*/}
  
                        <td>
                          <Link to={`/admin/users/${item._id}`}>
                            <Button variant="contained">
                              <LastPageIcon />
                            </Button>
                          </Link>
                          {
                            item._id === localStorage.getItem('userId') ?
                            <></>
                            :
                            <Button variant="contained" color="error" onClick={() => deleteUser(item._id)}>
                            <DeleteRoundedIcon />
                          </Button>
                          }
                          
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
  
  export default ListingUsers;
