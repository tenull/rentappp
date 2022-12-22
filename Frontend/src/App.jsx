import Navbar from "./components/Navbar";
import Calculator from "./components/Calculator";
import Renthouse from "./components/Renthouse";
import Create from "./components/Create";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from "./Home";
import AppBar from "./components/AppBar"
import SavedRents from "./components/SavedRent";
import HouseList from "./components/HouseList";

function App() {
  return (
    <Router >
      <AppBar />
      <div className="App">
     <div className="content">
        <Switch>
        <Route exact path="/">
              <Home />
            </Route>
        <Route path="/calculator">
            <Calculator/>
          </Route>
          <Route path="/rent">
           <Renthouse /> 
          </Route>
          
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/saved">
            <SavedRents />
          </Route>
          <Route path="/houses/:id">
            <Renthouse />
            </Route>
        </Switch>
        </div>
      </div>

    </Router>
  );
}

export default App;
