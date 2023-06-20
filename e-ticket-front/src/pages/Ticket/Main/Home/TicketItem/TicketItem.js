import React, { useEffect, useState } from "react";
import styles from "./TicketItem.module.scss";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Link } from "react-router-dom";

const TicketItem = ({ name, place, date, id }) => {
  let realDate = new Date(date);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  useEffect(() => {
    setDay(
      realDate.getDate() < 10 ? "0" + realDate.getDate() : realDate.getDate()
    );
    setMonth(
      realDate.getMonth().toString.length === 1
        ? "0" + realDate.getMonth()
        : realDate.getMonth()
    );
    setYear(realDate.getFullYear());
    setHours(realDate.getHours() < 10 ? "0" + realDate.getHours() : realDate.getHours());
    setMinutes(realDate.getMinutes() < 10 ? "0" + realDate.getMinutes() : realDate.getMinutes());
  });

  return (
    <>
      <Link to={`/ticket/my-tickets/page/${id}`}>
        <div className={styles.ticket}>
          <div className={styles.content}>
            <div className={styles.cl}>
              <img src="https://placehold.co/400" alt="imr" />
            </div>
            <div className={styles.cm}>
              <div className={styles.cmt}>
                {name} - {place}
              </div>
              <div className={styles.cmb}>
                Le {`${day}/${month}/${year}`} à {`${hours}h${minutes}`}
              </div>
            </div>
            <div className={styles.cr}>
              <ArrowForwardIosRoundedIcon
                fontSize="small"
                sx={{ marginLeft: "5px" }}
              />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default TicketItem;
