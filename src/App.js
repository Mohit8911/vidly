import "./App.css";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Customers from "./components/pages/customers";
import Movies from "./components/movies";
import Rentals from "./components/pages/rentals";
import NotFound from "./components/pages/notFound";
import LoginForm from "./components/pages/loginForm";
import RegisterForm from "./components/pages/registerForm";
import MovieForm from "./components/pages/movieForm";
import Logout from "./components/pages/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <main className="container">
        <ToastContainer />
        <NavBar user={user} />
        <div className="content">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    );
  }
}

export default App;
