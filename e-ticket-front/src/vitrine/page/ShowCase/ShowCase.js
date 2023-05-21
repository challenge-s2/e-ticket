import { React, useState } from "react";
import Menu from "./Default/Menu/Menu";
import Footer from "./Default/Footer/Footer";
import Homepage from "./HomePage/Homepage";
import AboutUs from "./AboutUs/AboutUs";
import styles from "./ShowCase.module.scss";

const ShowCase = () => {
  const [page, setPage] = useState("homepage");

  const handleChangePage = (e) => {
    setPage(e);
    console.log(e);
  }



  return (
    <>
      <header>
        <Menu handleChangePage={handleChangePage}/>
      </header>

      <main className={styles.main_container}>
        {page === "homepage" ? <Homepage/> : page === "about-us" ? <AboutUs /> : <Footer/>}
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default ShowCase;
