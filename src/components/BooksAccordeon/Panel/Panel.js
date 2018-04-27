import React, {Component} from 'react';
import {Panel, Row, Col, Image, ListGroup, ListGroupItem} from 'react-bootstrap';
import './Panel.css';

export class PanelItem extends Component {

  toggleFavorite(title, id) {
    let userId = this.props.userId;
    if (this.props.favorite) {
      title = null;
      userId = null;
    }
    this.props.toggleFavorite(title, id, this.props.token, userId);
  }

  render() {
    return (
      <Panel className={this.props.favorite ? 'favorite' : ''} eventKey={this.props.book.id}>
        <Panel.Heading>
          <Panel.Title toggle>{this.props.book.volumeInfo.title}</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <Row>
            <Col xs={12} sm={2}>
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
            <Col xs={12} sm={10}>
              <div className="panels-header">
                <div className="book-info-heaader">
                  Book info:
                </div>
                {
                  this.props.token
                  ? <div
                  className="add-to-favorite"
                  onClick={() => this.toggleFavorite(this.props.book.volumeInfo.title, this.props.book.id)}>{this.props.favorite ? 'Remove from favorite' : 'Add to favorite'}</div>
                  : null
                }
              </div>
              <ListGroup>
                <ListGroupItem><strong>Authors: </strong> {this.props.book.volumeInfo.authors ? this.props.book.volumeInfo.authors.join(', ') : "No info"}</ListGroupItem>
                <ListGroupItem><strong>Published Date: </strong> {this.props.book.volumeInfo.publishedDate || "No info"}</ListGroupItem>
                <ListGroupItem><strong>Pages: </strong> {this.props.book.volumeInfo.pageCount || "No info"}</ListGroupItem>
                <ListGroupItem><strong>Categories: </strong> {this.props.book.volumeInfo.categories ? this.props.book.volumeInfo.categories.join(', ') : "No info"}</ListGroupItem>
                <ListGroupItem><strong>Rating: </strong> {this.props.book.volumeInfo.averageRating || "No info"}</ListGroupItem>
                <ListGroupItem><strong>Language: </strong> {this.props.book.volumeInfo.language || "No info"}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col xs={12}>
              {this.props.book.volumeInfo.description || "No info"}
            </Col>
          </Row>
        </Panel.Body>
      </Panel>
    )
  }
};

export default PanelItem;