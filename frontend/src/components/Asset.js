import React from "react";
import { Spinner } from "react-bootstrap";


const Asset = ({ spinner, src, message }) => {
  return (
    <div className="Asset">
      {spinner && <Spinner animation="border" />}
      {src && <img src={src} alt={message} />}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Asset;