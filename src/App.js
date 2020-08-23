import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Redirect, Switch } from "react-router-dom";
import ProtectedRoute from "./common/protectedRoute";
import NavBar from "./components/navbar";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import auth from "./services/authService";
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
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="content container">
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/register" component={RegisterForm} />
            <Route
              exact
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <ProtectedRoute path="/movies/new" component={MovieForm} />
            <Route exact path="/customers" render={() => <h1>Customers</h1>} />
            <Route exact path="/rentals" render={() => <h1>Rentals</h1>} />
            <Route exact path="/not-found" render={() => <h1>Not Found</h1>} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
