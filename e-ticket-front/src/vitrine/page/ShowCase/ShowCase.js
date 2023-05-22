import { React } from "react";
import Menu from "./Default/Menu/Menu";
import Footer from "./Default/Footer/Footer";
import Homepage from "./HomePage/Homepage";
import styles from "./ShowCase.module.scss";

const ShowCase = () => {

  return (
    <>
      <header>
        <Menu/>
      </header>

      <main className={styles.main_container}>
        {/* {page === "homepage" ? <Homepage/> : page === "about-us" ? <AboutUs /> : <Footer/>} */}
        <Homepage/>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default ShowCase;
