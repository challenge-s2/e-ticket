import React, { useState, useEffect } from "react";
import styles from "./Home.module.scss";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import WaterDropRoundedIcon from "@mui/icons-material/WaterDropRounded";
import ParkRoundedIcon from "@mui/icons-material/ParkRounded";
import CloudRoundedIcon from "@mui/icons-material/CloudRounded";
import TicketItem from "./TicketItem/TicketItem";
import { Link } from "react-router-dom";
import axios from "axios";


const Home = () => {
  const [allTickets, setAllTickets] = useState([])


  const fetchUser = async () => {
    await axios.get(`/users/${localStorage.getItem('userId')}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('user')}`
      }
    })
     .then((res) => {
        res.data.message.ticketsScanned?.sort((d1, d2) => {
          let da = new Date(d1.creationDate);
          let db = new Date(d2.creationDate);
          return da - db;
        }).slice(0,4).map((item) => {
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
          {allTickets.length > 0 ?
            <>
                {allTickets.map((item, index) => (
                  <TicketItem key={index} name={item.companyInformations} date={item.creationDate} id={item._id}/>
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
            </>
          :
          <div>Vous n'avez pas encore de ticket enregistré</div>
          }

        </div>

        {allTickets.length > 0 ?
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
                <div className={styles.ml}>1.13L</div>
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
                <div className={styles.ml}>15</div>
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
                <div className={styles.ml}>26.4g</div>
                {/* <div className={styles.b}>En savoir plus</div> */}
              </div>
            </div>
          </div>
        :
          <></>
        }
      </div>
    </>
  );
};

export default Home;
