import React from "react";
import { useState } from "react";
import "./poke.css";
import { Link } from "react-router-dom";
import supabase from "../utils/clients";


const Card = ({
  likesCount,
  id,
  role,
  experiencelevel,
  name,
  image,
  attack,
  defense,
  speed,
  category,
  TypeColors,
}) => {
  
  const [count, setCount] = useState(likesCount);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateCount = async () => {
    try {
      const { data, error } = await supabase
        .from("crewmates")
        .update({ likesCount: count + 1 })
        .eq("id", id)
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
    <div className="containers">
        <span className="edit">
          {" "}
          <Link to={`/edit/${id}`}>Edit</Link>
        </span>
      <div
        className="cards "
        style={{
          background: `radial-gradient(circle at 50% 0%, ${TypeColors[role]} 36%, #ffffff 36%)`,
        }}
      >
        <div className="title">
          <p onClick={updateCount} className="like">
            👍 Like: {count ? count : 0}
          </p>
          <p className="hp">
            <span>XP</span>
            {experiencelevel}
          </p>
        </div>
        <h2 className="poke-name">{name}</h2>
        <img className="cards-img" src={image} alt="N/A" />
        <div className="types">
          <span style={{ backgroundColor: TypeColors[role] }}>{role}</span>
        </div>
        <span>{category}</span>
        <div className="stats">
          <div>
            <h3>{attack}</h3>
            <p>Attack</p>
          </div>
          <div>
            <h3>{defense}</h3>
            <p>Defense</p>
          </div>
          <div>
            <h3>{speed}</h3>
            <p>Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
