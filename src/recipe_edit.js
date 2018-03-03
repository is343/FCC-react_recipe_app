import React, { Component } from "react";
import "./recipe.css";

class RecipeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.recipes.name,
      ingredients: this.props.recipes.ingredients,
      id: this.props.recipes.id
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIng = this.handleChangeIng.bind(this);
    this.handleNewIngredient = this.handleNewIngredient.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteIngredient = this.handleDeleteIngredient.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeIng(e) {
    // gets the index from the name of input and applies
    // change to correct ingredient index in state
    const targetIndex = Number(e.target.name.split("-")[1]);
    const ingredients = this.state.ingredients.map(
      (ing, index) =>
        // only alter the correct box
        // return target value if index === target, else return ing
        index === targetIndex ? e.target.value : ing
    );
    this.setState({ ingredients });
  }

  handleNewIngredient(e) {
    // makes ingredients array in state grow by one
    const { ingredients } = this.state;
    // reset state and add extra ingredient space
    this.setState({ ingredients: [...ingredients, ""] });
  }

  handleSubmit(e) {
    e.preventDefault();
    // invoke onSave and pass a copy of all values in state
    this.props.onSave({ ...this.state });
    this.setState({
      name: "",
      ingredients: [""],
      id: ""
    });
  }

  handleDeleteIngredient(e) {
    // removes ingredient when ingredient delete button is clicked
    const targetIndex = Number(e.target.name.split("-")[1]);
    let { ingredients } = this.state;
    ingredients.splice(targetIndex, 1);
    this.setState({ ingredients });
  }

  render() {
    let ingredients = this.state.ingredients.map((ing, index) => (
      <div key={`ingredient-${index}`}>
        <label>
          {" "}
          {index + 1}.
          <input
            type="text"
            name={`ingredient-${index}`}
            value={ing}
            autoComplete="off"
            placeholder="Ingredient"
            onChange={this.handleChangeIng}
          />
          <button
            type="button"
            onClick={this.handleDeleteIngredient}
            name={`ingredient-${index}`}
          >
            X
          </button>
        </label>
      </div>
    ));

    return (
      <div className="recipe-form-container">
        <form className="recipe-form" onSubmit={this.handleSubmit}>
          <button
            type="button"
            onClick={this.props.onClose}
            className="close-button"
          >
            Close
          </button>
          <div className="recipe-form-line">
            <label htmlFor="recipe-title-input">Name: </label>
            <input
              id="recipe-title-input"
              key="name"
              name="name"
              type="text"
              value={this.state.name}
              size={42}
              autoComplete="off"
              onChange={this.handleChange}
            />
          </div>
          {ingredients}
          <button
            type="button"
            className="buttons"
            onClick={this.handleNewIngredient}
          >
            +
          </button>
          <div className="recipe-form-line" />
          <button
            type="submit"
            className="buttons"
            style={{ alignSelf: "flex-end", marginRight: 0 }}
          >
            SAVE
          </button>
        </form>
      </div>
    );
  }
}

export default RecipeEdit;
