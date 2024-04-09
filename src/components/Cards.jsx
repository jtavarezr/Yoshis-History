import React from "react";
import { useState } from "react";
import "./Card.css";
import more from "./more.png";
import { Link } from "react-router-dom";
import supabase from "../utils/clients";
const Card = (props) => {
  const [count, setCount] = useState(props.likesCount);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateCount = async () => {
    try {
      const { data, error } = await supabase
        .from("crewmates")
        .update({ likesCount: count + 1 })
        .eq("id", props.id)
        .select();

      if (error) {
        console.error("Error updating likes count:", error.message);
      } else {
        setCount((count) => count + 1);

        console.log(data[0]);
      }
    } catch (error) {
      console.error("Error updating likes count:", error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <div className="card mb-3">
        <div className="card-body bg-secondary">
          <Link to={"edit/" + props.id}>
            <img className="moreButton" alt="edit button" src={more} />
          </Link>
          <div className="card-header">
            <div className="title">{props.name}</div>
          </div>

          <div className="control-label">{props.role}</div>
          <div className="control-label">{props.specialty}</div>
          <h5 className="control-label">{props.experiencelevel}</h5>
        </div>

        <div className="card-footer">
          <p className="control-label bg-secondary">{props.description}</p>

          <button
            className="btn btn-primary"
            onClick={updateCount}
            disabled={isUpdating}
          >
            👍 Like: {count ? count : 0}
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
