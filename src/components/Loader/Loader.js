import React from 'react';
import './Loader.css';

const loader = (props) => (
  <div className="loader">
    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
);

export default loader;