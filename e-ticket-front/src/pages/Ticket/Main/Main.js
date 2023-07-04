import React from "react";
import styles from "./Main.module.scss";
import { Route, Routes } from "react-router-dom";
import MyTickets from "./MyTickets/MyTickets";
import MyProfil from "./MyProfil/MyProfil";
import Home from "./Home/Home"
import TicketPage from "./MyTickets/TicketPage/TicketPage";
import TicketPageCompany from "./MyTickets/TicketPageCompany/TicketPageCompany";

const Main = ({handleOpenModalConnection}) => {
  return (
    <>
      <div className={styles.container}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/my-tickets/page/:id" element={<TicketPage />} />
          <Route path="/my-tickets/company/:idCompany" element={<TicketPageCompany />} />
          <Route path="/my-profil" element={<MyProfil handleOpenModalConnection={handleOpenModalConnection}/>} />
        </Routes>
      </div>
    </>
  );
};

export default Main;
