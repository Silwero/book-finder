import React, { Component } from 'react';
import BooksAccordeon from '../../components/BooksAccordeon/BooksAccordeon';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';

import {FormControl, FormGroup, Button} from 'react-bootstrap';
import './BookFinder.css';

export class BookFinder extends Component {
  state = {
    textToFind: ''
  }

  handleChangeFindText = (e) => {
    this.setState({textToFind: e.target.value});
  }

  getBooks = (e) => {
    e.preventDefault();
    this.props.getBooks(this.state.textToFind);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.getBooks}>
          <FormGroup className="book-find-form">
            <FormControl
              type="text"
              value={this.state.textToFind}
              placeholder='Input text to find results e.g. "Harry Potter"'
              onChange={this.handleChangeFindText}
              />
              <Button onClick={this.getBooks}>Find</Button>
          </FormGroup>
          <BooksAccordeon />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getBooks: (text) => dispatch(actions.getBooks(text))
  }
}

export default connect(null, mapDispatchToProps)(BookFinder);
