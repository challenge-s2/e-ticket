import React from "react";
import styles from "./MyTickets.module.scss";
import TicketItem from "../Home/TicketItem/TicketItem";

const content = [
  {
    id: 1,
    name: "Big Burgers",
    place: "Paris",
    date: "2023-05-02 12:20:00",
  },
  {
    id: 2,
    name: "Ensuite",
    place: "Paris",
    date: "2023-05-17 03:15:00",
  },
  {
    id: 3,
    name: "FNAC",
    place: "Bordeaux",
    date: "2023-05-10 17:00:00",
  },
];


// for (let it = 0; it < content.length; it++) {
//   const year = new Date().getFullYear()
//   itemByYear[year]: { content[it]}
  
// }

const MyTickets = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.item_home}>
          <h3>Mes tickets</h3>
          {content.map((item, index) => (
            <TicketItem
              key={index}
              name={item.name}
              place={item.place}
              date={item.date}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyTickets;
