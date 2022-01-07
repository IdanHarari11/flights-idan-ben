import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import Checkout from "./pages/Checkout";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Purchase from "./pages/Purchase";
import NavBar from "./UI/NavBar";

function App() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/login" component={Login} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/purchase" component={Purchase} />
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </>
    );
}

export default App;
