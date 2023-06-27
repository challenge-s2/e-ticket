import React, { useState } from "react";
import styles from "./Ticket.module.scss";

import Menu from "./Default/Menu/Menu";
import Main from "./Main/Main";
import Footer from "./Default/Footer/Footer";

const Ticket = () => {
  const [page, setPage] = useState("home")

  const handleChangePage = (pageChanged) => {
    setPage(pageChanged)
    //link TODO
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
          <Menu page={page}/>
          <Main />
        </div>
        <Footer handleChangePage={handleChangePage}/>
      </div>
    </>
  );
};

export default Ticket;
