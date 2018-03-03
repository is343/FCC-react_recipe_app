import React, { Component } from "react";
import Recipe from "./recipe";

const RecipeList = props => {
  const recipes = props.recipes.map(recipe => (
    <Recipe
      key={recipe.id}
      {...recipe}
      onEdit={props.onEdit}
      onDelete={props.onDelete}
    />
  ));
  return <div className="recipe-list">{recipes}</div>;
};

export default RecipeList;
