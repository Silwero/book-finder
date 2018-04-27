import React, { Component } from 'react';

import {ListGroupItem, ListGroup, Row, Col, Image} from 'react-bootstrap';

export class BookInfo extends Component {
  render() {
    let bookInfo = <p className="view-empty">Select Item to see result</p>;

    if (this.props.loading) {
      bookInfo = <div className="cssload-container">
        <div className="cssload-whirlpool"></div>
      </div>
    }

    if (this.props.error) {
      bookInfo = <p className="view-empty error">{this.props.error}</p>
    }

    if (Object.keys(this.props.book).length && !this.props.loading) {
      bookInfo = (
          <Row>
            <Col xs={12} md={3}>
              <div className="img-wrapper">
                {
                  this.props.book.volumeInfo.imageLinks ?
                  <Image
                    src={this.props.book.volumeInfo.imageLinks.thumbnail}
                    title={this.props.book.volumeInfo.title}
                    thumbnail
                    alt={this.props.book.volumeInfo.title}/> :
                  'No image'
                }
              </div>
              <div className="text-center">
                <a className="btn btn-default google-btn" target="_blank" href={this.props.book.volumeInfo.infoLink}>See on Google Books</a>
              </div>
            </Col>
            <Col xs={12} md={9}>
              <h6>
                {this.props.book.volumeInfo.title}
              </h6>
              <ListGroup>
                <ListGroupItem><strong>Authors: </strong> {this.props.book.volumeInfo.authors ? this.props.book.volumeInfo.authors.join(', ') : "No info"}</ListGroupItem>
                <ListGroupItem><strong>Published Date: </strong> {this.props.book.volumeInfo.publishedDate || "No info"}</ListGroupItem>
                <ListGroupItem><strong>Pages: </strong> {this.props.book.volumeInfo.pageCount || "No info"}</ListGroupItem>
                <ListGroupItem><strong>Categories: </strong> {this.props.book.volumeInfo.categories ? this.props.book.volumeInfo.categories.join(', ') : "No info"}</ListGroupItem>
                <ListGroupItem><strong>Rating: </strong> {this.props.book.volumeInfo.averageRating || "No info"}</ListGroupItem>
                <ListGroupItem><strong>Language: </strong> {this.props.book.volumeInfo.language || "No info"}</ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
      );
    }

    return (
      <div className="favorit-book-info">
        {bookInfo}
      </div>
    );
  }
}

export default BookInfo;