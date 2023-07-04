import React, { useState, useEffect } from "react";
import styles from "./MyTickets.module.scss";
import TicketItem from "../Home/TicketItem/TicketItem";
import axios from "axios";

const MyTickets = () => {
  const [users, setUsers] = useState([])
  const [tickets, setTickets] = useState([])
  const [allTickets, setAllTickets] = useState([])


  const fetchData = async () => {
    await axios.get('/ticket/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    }).then((res) => setAllTickets(res.data.message))
  }


  const fetchUsers = async () => {
    await axios.get('/company/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
     .then((res) => setUsers(res.data.message))
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [allTickets])
  return (
    <>
      <div className={styles.container}>
      <div className={styles.item_home}>
          <h3>Mes tickets</h3>
          {allTickets.map((item, index) => (
            <TicketItem key={index} name={users.filter((u) => u._id === item.companyId)[0]?.name} place={'Paris'} date={item.creationDate} id={item._id}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyTickets;
