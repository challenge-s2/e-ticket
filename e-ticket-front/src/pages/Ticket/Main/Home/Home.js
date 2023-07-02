import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import ParkRoundedIcon from "@mui/icons-material/ParkRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import TicketItem from "./TicketItem/TicketItem";
import { Link } from "react-router-dom";
import axios from "axios";

const content = [
  {
    id: 1,
    name: 'Big Burgers',
    place: 'Paris',
    date: '2023-05-02 12:20:00',
  },
  {
    id: 2,
    name: 'Ensuite',
    place: 'Paris',
    date: '2023-05-17 03:15:00',
  },
  {
    id: 3,
    name: 'FNAC',
    place: 'Bordeaux',
    date: '2023-05-10 17:00:00',
  },

]

const Home = () => {
  const [users, setUsers] = useState([])
  const [tickets, setTickets] = useState([])

  const fetchUsers = async () => {
    await axios.get('/company/')
     .then((res) => setUsers(res.data.message))
  }

  const fetchTickets = async () => {
    await axios.get('/ticket/')
     .then((res) => setTickets(res.data.message))
  }

  useEffect(() => {
    fetchUsers();
    fetchTickets();
  }, [])
  return (
    <>
      <div className={styles.container}>
        <div className={styles.item_home}>
          <h3>Mes tickets</h3>
          {content.map((item, index) => (
            <TicketItem key={index} name={users.filter((u) => u._id === item.companyId).name} place={item.place} date={item.date} id={item.id}/>
          ))}

          <div className={styles.ticket}>
            <Link to="/ticket/my-tickets">
              <div className={styles.wrapper}>
                <div className={styles.text}>Voir plus</div>
                <ArrowForwardIosRoundedIcon
                  fontSize="small"
                  sx={{ marginLeft: "5px" }}
                />
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.item_home}>
          <h3>Ce que eTickets a économisé</h3>
          <div className={styles.wrapper}>
            <div className={styles.left}>
              <div className={styles.t}>
                <WaterDropRoundedIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", marginRight: "5px" }}
                />
                Eau
              </div>
              <div className={styles.ml}>0.03L</div>
              {/* <div className={styles.b}>En savoir plus</div> */}
            </div>
            <div className={styles.middle}>
              <div className={styles.t}>
                <ParkRoundedIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", marginRight: "5px" }}
                />
                Arbre
              </div>
              <div className={styles.ml}>0.03L</div>
              {/* <div className={styles.b}>En savoir plus</div> */}
            </div>
            <div className={styles.right}>
              <div className={styles.t}>
                <CloudRoundedIcon
                  fontSize="small"
                  sx={{ verticalAlign: "middle", marginRight: "5px" }}
                />
                Co2
              </div>
              <div className={styles.ml}>0.03L</div>
              {/* <div className={styles.b}>En savoir plus</div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
