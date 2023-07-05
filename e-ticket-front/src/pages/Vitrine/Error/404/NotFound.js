import { React } from "react";
import Menu from "../../Default/Menu/Menu";
import Footer from "../../Default/Footer/Footer";
import styles from "../../ShowCase.module.scss";
import PageNotFound from "./PageNotFound";

const NotFound = () => {

  return (
    <>
      <header>
        <Menu/>
      </header>

      <main className={styles.main_container}>
        <PageNotFound/>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default NotFound;
