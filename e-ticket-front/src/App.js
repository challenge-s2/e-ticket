import logo from './logo.svg';
import './App.css';
import Homepage from './vitrine/page/Homepage/Homepage';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Routes,
// } from "react-router-dom"

const App = () => {
  return (
    // <Router>
      <div className="App">
        {/* <Routes> */}
          {/* <Route exact path="/" component={Homepage}/> */}
          <Homepage/>
        {/* </Routes> */}
      </div>
    // </Router>
  );
}

export default App;
