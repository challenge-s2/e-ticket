import React from "react";
import styles from "./Main.module.scss";
import { Route, Routes } from "react-router-dom";
import MyTickets from "./MyTickets/MyTickets";
import MyProfil from "./MyProfil/MyProfil";
import Home from "./Home/Home"
import TicketPage from "./MyTickets/TicketPage/TicketPage";

const Main = () => {
  return (
    <>
      <div className={styles.container}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/my-tickets/page/:id" element={<TicketPage />} />
          <Route path="/my-profil" element={<MyProfil />} />
        </Routes>
      </div>
    </>
  );
};

export default Main;
