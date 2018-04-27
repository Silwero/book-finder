import React, { Component } from 'react';
import { NavLink, withRouter } from "react-router-dom";
import {connect} from 'react-redux';

export class Nav extends Component {
  render() {
    return (
      <nav>
        <ul className="nav">
          <li><NavLink to='/' exact activeClassName="active">Find Books</NavLink></li>
          { !this.props.auth ? <li><NavLink to='/auth' activeClassName="active">Login</NavLink></li> : null }
          { this.props.auth ? <li><NavLink to='/favorites' activeClassName="active">Favorites</NavLink></li> : null}
          { this.props.auth ? <li><NavLink to='/logout' activeClassName="active">Logout</NavLink></li> : null}
        </ul>
      </nav>
    );
  }
}

const stateToProps = state => {
  return {
    isAuth: state.isAuth
  }
}

export default withRouter(connect(stateToProps)(Nav));