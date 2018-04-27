import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';

import { FormGroup, FormControl, ControlLabel, Button, ButtonToolbar } from 'react-bootstrap';
import './Auth.css';

export class Auth extends Component {
  state = {
    login: '',
    password: '',
    isSignup: false,
    isValidEmail: false,
    isValidPassword: false
  }

  handleChangeName = (e) => {
    this.setState({login: e.target.value});
  }

  handleChangePassword = (e) => {
    this.setState({password: e.target.value});
  }

  checkValidaty = (e) => {
    let isValid = false;
    if (e.target.type === 'email') {
      let reg = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = reg.test(String(e.target.value).toLowerCase());
      this.setState({isValidEmail: isValid});
    }
    if (e.target.type === 'password') {
      isValid = e.target.value.length >= 6 ? true : false;
      this.setState({isValidPassword: isValid});
    }

    if (isValid) {
      e.target.classList.remove('vaildation-error');
    } else {
      e.target.classList.add('vaildation-error');
    }
  }

  changeType = () => {
    this.setState(state => ({
      isSignup: !state.isSignup
    }));
  }

  submitHandler = (e) => {
    e.preventDefault();

    if (this.state.isValidEmail && this.state.isValidPassword) {
      this.props.auth(this.state.login, this.state.password, this.state.isSignup);
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHandler} className="login-form">
          <h2 className="auth-header">{this.state.isSignup ? 'Register' : 'Login'}</h2>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              value={this.state.login}
              placeholder="Login"
              onChange={this.handleChangeName}
              onBlur={this.checkValidaty}
              required
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChangePassword}
              onBlur={this.checkValidaty}
              required
            />
          </FormGroup>
          <ButtonToolbar className="text-center">
            <Button type="submit">{this.state.isSignup ? 'Register' : 'Login'}</Button>
          </ButtonToolbar>
          <div className="change-type">
            <span onClick={this.changeType}>{this.state.isSignup ? 'I want to login' : 'I want to register'}</span>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    auth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
}

export default connect(null, mapDispatchToProps)(Auth);
