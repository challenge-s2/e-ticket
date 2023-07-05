import React from "react";
import styles from "./TicketItem.module.scss";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Link } from "react-router-dom";
import Moment from "moment";

const TicketItem = ({ name, date, id }) => {

  return (
    <>
      <Link to={`/ticket/my-tickets/page/${id}`}>
        <div className={styles.ticket}>
          <div className={styles.content}>
            {/*<div className={styles.cl}>
              <img src="https://placehold.co/400" alt="imr" />
            </div>*/}
            <div className={styles.cm}>
              <div className={styles.cmt}>
                {name}
              </div>
              <div className={styles.cmb}>
                {/* Le {`${day}/${month}/${year}`} à {`${hours}h${minutes}`} */}
                Le {Moment(date).format("DD/MM/YYYY").toLocaleString('fr-FR')} à {Moment(date).format("HH").toLocaleString('fr-FR')}h{Moment(date).format("mm").toLocaleString('fr-FR')}
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
