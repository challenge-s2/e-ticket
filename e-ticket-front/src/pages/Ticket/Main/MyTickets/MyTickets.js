import React, { useState, useEffect } from "react";
import styles from "./MyTickets.module.scss";
import TicketItem from "../Home/TicketItem/TicketItem";
import axios from "axios";

const MyTickets = () => {
  const [users, setUserInfo] = useState([])
  const [allTickets, setAllTickets] = useState([])


  const fetchUser = async () => {
    await axios.get(`/users/${localStorage.getItem('userId')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
     .then((res) => {
        setUserInfo(res.data.message)
        res.data.message.ticketsScanned.reverse().map((item) => {
          axios.get('/ticket/'+ item, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('user')}`
            }
          })
            .then((res) => setAllTickets((prev) => ([...prev, res.data.message])))
        })
      })
  }

  useEffect(() => {
    fetchUser();
  }, [])


  return (
    <>
      <div className={styles.container}>
      <div className={styles.item_home}>
          <h3>Mes tickets</h3>
          {allTickets.map((item, index) => (
            <TicketItem key={index} name={item.companyInformations} date={item.creationDate} id={item._id}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyTickets;
