import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import axios from "axios";

import ShowCase from "./pages/Vitrine/ShowCase";
import Auth from "./pages/Auth/Auth";
import Application from "./pages/Application/Application";
import ListOldCommand from "./pages/Application/Main/Command/ListOldCommand/ListOldCommand";
import NewCommand from "./pages/Application/Main/Command/NewCommand/NewCommand";
import ListOfProducts from "./pages/Application/Main/Product/ListOfProducts/ListOfProducts";
import NewProduct from "./pages/Application/Main/Product/NewProduct/NewProduct";
import EditProduct from "./pages/Application/Main/Product/EditProduct/EditProduct";
import DetailOldCommand from "./pages/Application/Main/Command/DetailOldCommand/DetailOldCommand";
import MyInformations from "./pages/Application/Main/Settings/MyInformations/MyInformations";
import ProductNotFound from "./pages/Application/Error/404/ProductNotFound";
import CommandNotFound from "./pages/Application/Error/404/CommandNotFound";
import Ticket from "./pages/Ticket/Ticket";
import MyTickets from "./pages/Ticket/Main/MyTickets/MyTickets";
import MyProfil from "./pages/Ticket/Main/MyProfil/MyProfil";
import TicketPage from "./pages/Ticket/Main/MyTickets/TicketPage/TicketPage";
import Admin from "./pages/Admin/Admin";
import ListingCompany from "./pages/Admin/Main/Company/ListingCompany/ListingCompany";
import NewCompany from "./pages/Admin/Main/Company/NewCompany/NewCompany";
import DetailCompany from "./pages/Admin/Main/Company/DetailCompany/DetailCompany";
import CompanyNotFound from "./pages/Admin/Error/404/CompanyNotFound";
import TicketPageCompany from "./pages/Ticket/Main/MyTickets/TicketPageCompany/TicketPageCompany";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ListingUsers from "./pages/Admin/Main/Users/ListingUsers/ListingUsers";
import DetailUser from "./pages/Admin/Main/Users/DetailUser/DetailUser";
import NotFound from "./pages/Vitrine/Error/404/NotFound";
import NotFoundTicket from "./pages/Ticket/Error/404/NotFound";
import NotFoundAdmin from "./pages/Admin/Error/404/NotFound";
import NotFoundApp from "./pages/Application/Error/404/NotFound";
import ListingContact from "./pages/Admin/Main/Company/ListingContact/ListingContact";
import DetailContact from "./pages/Admin/Main/Company/DetailContact/DetailContact";
import { TrackingProvider } from "./sdk.es";

axios.defaults.baseURL = process.env.REACT_APP_URL_API;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Router>
      <TrackingProvider
        appId="8f8b0fa4-0d75-4af9-9b28-3d77f016d46b"
        withTrackingSession={true}
        withTrackingMouse={false}
      >
        <div className="App">
          <ToastContainer />
          <Routes>
            <Route path="/" exact element={<ShowCase />} />

            <Route path="/auth/:path" exact element={<Auth />} />

            <Route path="/app" element={<Application />}>
              <Route path="list-old-commands" element={<ListOldCommand />} />
              <Route path="new-command" element={<NewCommand />} />
              <Route
                path="detail-old-command/:id"
                element={<DetailOldCommand />}
              />
              <Route
                path="detail-old-command/not-found"
                element={<CommandNotFound />}
              />
              <Route path="list-products" element={<ListOfProducts />} />
              <Route path="new-product" element={<NewProduct />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
              <Route
                path="edit-product/not-found"
                element={<ProductNotFound />}
              />
              <Route path="my-informations" element={<MyInformations />} />
            </Route>

            <Route path="/ticket" exact element={<Ticket />}>
              <Route path="my-tickets" element={<MyTickets />} />
              <Route path="my-tickets/page/:id" element={<TicketPage />} />
              <Route
                path="my-tickets/company/:idCompany"
                element={<TicketPageCompany />}
              />
              <Route path="my-profil" element={<MyProfil />} />
            </Route>

            <Route path="/admin" exact element={<Admin />}>
              <Route path="company/list" element={<ListingCompany />} />
              <Route path="company/new" element={<NewCompany />} />
              <Route path="company/:id" element={<DetailCompany />} />
              <Route path="company/not-found" element={<CompanyNotFound />} />
              <Route path="contact/list" element={<ListingContact />} />
              <Route path="contact/:id" element={<DetailContact />} />{" "}
              {/*TODO change*/}
              <Route path="users/list" element={<ListingUsers />} />
              <Route path="users/:id" element={<DetailUser />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </TrackingProvider>
    </Router>
  );
};

export default App;
