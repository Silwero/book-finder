import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import FavoritesList from '../../components/Favorites/FavoritesList';
import BookInfo from '../../components/Favorites/BookInfo';

import {Row, Col} from 'react-bootstrap';
import './Favorites.css';

export class Favorites extends Component {
  state = {
    activeBook: {},
    loading: false,
    error: null
  }

  setActive = (bookId) => {
    if (bookId === this.state.activeBook.id) return;
    if (bookId === null) {
      this.setState({
        activeBook: {}
      });
      return;
    }
    this.setState({
      loading: true,
      activeBook: {}
    });
    axios.get('https://www.googleapis.com/books/v1/volumes/' + bookId)
      .then(resp => {
        this.setState({
          activeBook: resp.data,
          loading: false,
          error: null
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: err.message,
          loading: false
        });
      })
  }

  render() {
    let favorite = <p className="view-empty">No favorite books</p>

    if (Object.keys(this.props.books).length) {
      favorite = (
        <Row>
           <Col xs={12} sm={4}>
              <FavoritesList activeBook={this.state.activeBook.id} setActive={(bookId) => this.setActive(bookId)} />
           </Col>
           <Col xs={12} sm={8}>
              <BookInfo
                book={this.state.activeBook}
                loading={this.state.loading}
                error={this.state.error}/>
           </Col>
        </Row>
      )
    }

    return (
      <div className="favorites">
        <h2>Favorites</h2>
        {favorite}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.favoriteBooks
  }
}

export default connect(mapStateToProps)(Favorites);
