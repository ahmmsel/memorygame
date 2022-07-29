import React from "react";
import "./Card.css";

function Card({ data, onChoice, flipped }) {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={data.src} alt="front" className="front" />
        <img
          src="/images/cover.svg"
          alt="cover"
          className="cover"
          role="button"
          onClick={onChoice}
        />
      </div>
    </div>
  );
}

export default Card;
