import React, { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import LeftBoard from "./LeftBoard/LeftBoard";
import { Routes, Route } from "react-router-dom";
import NewCompany from "./Main/Company/NewCompany/NewCompany";
import ListingCompany from "./Main/Company/ListingCompany/ListingCompany";
import DetailCompany from "./Main/Company/DetailCompany/DetailCompany";

import MenuMobile from "./Menu/MenuMobile";
import LeftBoardMobile from "./LeftBoard/LeftBoardMobile";
import CompanyNotFound from "./Error/404/CompanyNotFound";

const Admin = () => {
  const [openLeftBoardMobile, setOpenLeftBoardMobile] = useState(false);
  const [windowSize, setWindowSize] = useState(window.screen.width);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.screen.width));
  }, []);

  return (
    <>
      <div className={styles.container}>
        {windowSize < 1330 ? (
          <MenuMobile setOpen={setOpenLeftBoardMobile} />
        ) : (
          <></>
        )}
        <div className={styles.container_board}>
          {windowSize < 1330 ? (
            <LeftBoardMobile
              open={openLeftBoardMobile}
              setOpen={setOpenLeftBoardMobile}
            />
          ) : (
            <div className={styles.container_left_board}>
              <LeftBoard />
            </div>
          )}
          <div className={styles.container_main_board}>
            <Routes>
              <Route index element={<ListingCompany />} />
              <Route path="/company/list" element={<ListingCompany />} />
              <Route path="/company/new" element={<NewCompany />} />
              <Route path="/company/:id" element={<DetailCompany />} />
              <Route path="/company/not-found" element={<CompanyNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
