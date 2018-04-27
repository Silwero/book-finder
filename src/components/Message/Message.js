import React from 'react';
import {Alert} from 'react-bootstrap';
import './Message.css';

const message = (props) => (
  <Alert bsStyle={props.message.messageType === "error" ? "danger" : "success"}>
    {
      props.message.messageType === "error"
      ? <h4>Ooops!</h4>
      : null
    }
    <p>
      {props.message.text}
    </p>
  </Alert>
);

export default message;