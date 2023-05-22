
import "./App.css";
import ShowCase from "./vitrine/page/ShowCase/ShowCase";
import Auth from "./vitrine/page/Auth/Auth";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<ShowCase />} />
          <Route path="/auth" exact element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
