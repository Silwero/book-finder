import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './store/actions/actions';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Header from './components/Header/Header';
import asyncComponent from './hoc/asyncComponent';
import Loader from './components/Loader/Loader';
import Message from './components/Message/Message';
import Logout from './containers/Auth/Logout';

import { Grid } from 'react-bootstrap';
import './App.css';

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncFavorites = asyncComponent(() => {
  return import('./containers/Favorites/Favorites');
});

const asyncBookFinder = asyncComponent(() => {
  return import('./containers/BookFinder/BookFinder');
});


class App extends Component {
  state = {
    isAuth: localStorage.getItem('userId')
  }

  componentWillMount() {
    this.props.checkAuth();
  }

  render() {
    let loader = null;

    if (this.props.loading) {
      loader = <Loader />;
    }

    let route = <Switch>
      <Route exact path="/" component={asyncBookFinder} />
      <Route exact path="/auth" component={asyncAuth} />
      <Redirect to="/" />
    </Switch>

    let message = null;
    if (this.props.message) {
      message = <Message message={this.props.message} />;
    }

    if (this.props.auth || this.state.isAuth) {
      route = <Switch>
        <Route exact path="/" component={asyncBookFinder} />
        <Route exact path="/favorites" component={asyncFavorites} />
        <Route exact path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    }

    return (
      <div className="App">
        <Header auth={this.props.auth} />
        <Grid className="main-container">
          {route}
        </Grid>
        {loader}
        {message}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    auth: state.token !== null,
    token: state.token,
    message: state.message
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
