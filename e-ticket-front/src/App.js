
import "./App.css";
import ShowCase from "./vitrine/page/ShowCase/ShowCase";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<ShowCase />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
