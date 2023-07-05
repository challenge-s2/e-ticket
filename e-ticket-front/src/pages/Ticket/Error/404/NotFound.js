import React, { useState } from "react";
import styles from "./NotFound.module.scss";
import Footer from "../../Default/Footer/Footer";
import Menu from "../../Default/Menu/Menu";
import PageNotFound from "./PageNotFound";

const TicketNotFound = () => {
    const [page, setPage] = useState("home")

    const handleChangePage = (pageChanged) => {
      setPage(pageChanged)
    }

    return (
    <>
      <div className={styles.container}>
        <div className={styles.main}>
        <Menu/>
        <PageNotFound/>
        </div>
        <Footer handleChangePage={handleChangePage}/>
      </div>
    </>
  );
};

export default TicketNotFound;
