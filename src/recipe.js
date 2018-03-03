import React, { Component } from "react";
import "./recipe.css";

const Recipe = props => {
  const ingredients = props.ingredients.map((ingredient, index) => (
    <div key={index}> {ingredient} </div>
  ));
  return (
    <div className="recipe-box">
      <div className="recipe-box">
        {props.name}
        <button
          className="buttons" onClick={() => props.onEdit(props.id)}>Edit</button>
        <button
          className="delete-button" onClick={() => props.onDelete(props.id)}>Delete</button>
      </div>
      <div>{ingredients}</div>
    </div>
  );
};

export default Recipe;
