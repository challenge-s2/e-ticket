import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ShowCase from "./vitrine/page/ShowCase/ShowCase";
import Auth from "./vitrine/page/Auth/Auth";
import Application from "./vitrine/page/Application/Application";
import ListOldCommand from "./vitrine/page/Application/Main/Command/ListOldCommand/ListOldCommand";
import NewCommand from "./vitrine/page/Application/Main/Command/NewCommand/NewCommand";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/" exact element={<ShowCase />} />

          <Route path="/auth" exact element={<Auth />} />

          <Route path="/app" element={<Application />}>
            <Route path="list-old-commands" element={<ListOldCommand />} />
            <Route path="new-command" element={<NewCommand/>}/>
          </Route>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
