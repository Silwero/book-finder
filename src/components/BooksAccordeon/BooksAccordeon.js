import React, { Component } from 'react';
import {connect} from 'react-redux';
import Panel from './Panel/Panel';
import * as actions from '../../store/actions/actions';

import {PanelGroup} from 'react-bootstrap';

import './BooksAccordeon.css';

export class BooksAccordeon extends Component {

  render() {
    let booksTitles = [];
    if (this.props.books) {
      booksTitles = this.props.books.map(book => {
        return (
          <Panel
            toggleFavorite={this.props.toggleFavorite}
            key={book.id}
            book={book}
            favorite={book.id in this.props.favoriteBooks}
            token={this.props.token}
            userId={this.props.userId}></Panel>
        );
      });
    }

    let accordeon = <p className="view-empty">No results!</p>

    if (booksTitles.length) {
      accordeon = <PanelGroup accordion id="accordion-example">
        {booksTitles}
      </PanelGroup>
    }

    return (
      accordeon
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
    favoriteBooks: state.favoriteBooks,
    token: state.token,
    userId: state.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleFavorite: (title, id, token, userId) => dispatch(actions.toggleFavorite(title, id, token, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksAccordeon);
