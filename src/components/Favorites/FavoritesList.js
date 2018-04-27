import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/actions';

import {ListGroup, ListGroupItem} from 'react-bootstrap';

export class FavoritesList extends Component {

  removeBook = (e, id) => {
    this.props.toggleFavorite(null, id, this.props.token)
    this.props.setActive(null);
  }

  render() {
    let books = [];
    for (let book in this.props.books) {
      books.push(
        <div className="favorite-item-wrapper" key={book}>
          <ListGroupItem className={book === this.props.activeBook ? 'active' : null} onClick={() => this.props.setActive(book)}>
            {this.props.books[book].title}
          </ListGroupItem>
          <span className="delete" onClick={(e, id) => this.removeBook(e, book)}>
            X
          </span>
        </div>
      )
    }

    return (
      <ListGroup>
        {books}
      </ListGroup>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.favoriteBooks,
    token: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleFavorite: (title, id, token) => dispatch(actions.toggleFavorite(title, id, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList);
