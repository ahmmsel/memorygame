import React from "react";
import "./Card.css";

import Cover from "./Cover";

function Card({ data, onChoice, flipped }) {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={data.src} alt={data.name} className="front" />
        <Cover className="cover" onClick={onChoice} />
      </div>
    </div>
  );
}

export default Card;
