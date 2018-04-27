import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav/Nav';

import { Navbar } from 'react-bootstrap';

export class Header extends Component {
  render() {
    return (
      <header className="header">
        <Navbar>
          <Navbar .Header>
            <h1><Link to="/">Book Finder</Link></h1>
          </Navbar .Header>
          <Nav auth={this.props.auth} />
        </Navbar>
      </header>
    );
  }
}

export default Header;
