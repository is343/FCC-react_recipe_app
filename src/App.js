import React, { Component } from "react";
import RecipeList from "./recipe_list";
import RecipeEdit from "./recipe_edit";
import RecipeAdd from "./recipe_add";

class App extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("state") && JSON.parse(localStorage.getItem("state")).recipes.length > 0) {
      this.state = JSON.parse(localStorage.getItem("state"));
    } else {
      this.state = {
        recipes: [
          {
            name: "pasta",
            ingredients: ["noodles", "sauce"],
            id: 0
          },
          {
            name: "grilled cheese",
            ingredients: ["bread", "cheese", "butter"],
            id: 1
          }
        ],
        nextRecipeId: 2,
        //current_id_to_show: 0,
        showAddForm: false,
        showEditForm: false,
        editId: 0,
        editIndex: 0
      };
    }

    this.handleAddSave = this.handleAddSave.bind(this);
    this.handleEditSave = this.handleEditSave.bind(this);
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.findIndexforEdit = this.findIndexforEdit.bind(this);
  }

  handleAddSave(recipe) {
    this.setState((prevState, props) => {
      const newRecipe = { ...recipe, id: this.state.nextRecipeId };
      return {
        nextRecipeId: prevState.nextRecipeId + 1,
        recipes: [...this.state.recipes, newRecipe],
        showAddForm: false
      };
    });
  }

  handleEditSave(recipe) {
    // finds the correct recipe and replaces the old one
    const updatedRecipes = this.state.recipes.map(
      rec => (rec.id === recipe.id ? recipe : rec)
    );
    this.setState({
      recipes: updatedRecipes,
      showEditForm: false
    });
  }

  handleEditButton(id) {
    // updates the id and index to be edited
    const index = this.findIndexforEdit(id);
    this.setState({
      showEditForm: true,
      editId: id,
      editIndex: index
    });
  }

  handleAddButton(id) {
    this.setState({
      showAddForm: true
    });
  }

  handleDelete(id) {
    // takes in a given id and filters out from state
    const updatedRecipes = this.state.recipes.filter(rec => {
      return rec.id !== id;
    });
    this.setState({
      recipes: updatedRecipes
    });
  }

  findIndexforEdit(id) {
    // finds the index of the item with a given id
    const { recipes } = this.state;
    const index = recipes.findIndex(recipe => {
      return recipe.id === id;
    });
    return index;
  }

  componentDidUpdate() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  render() {
    return (
      <div>
        <button className="buttons" onClick={this.handleAddButton}>
          Add Recipe
        </button>
        <RecipeList
          recipes={this.state.recipes}
          onEdit={this.handleEditButton}
          onDelete={this.handleDelete}
        />
        {this.state.showAddForm ? (
          <RecipeAdd
            onSave={this.handleAddSave}
            onClose={() => this.setState({ showAddForm: false })}
          />
        ) : null}
        {this.state.showEditForm ? (
          <RecipeEdit
            onSave={this.handleEditSave}
            onClose={() => this.setState({ showEditForm: false })}
            recipes={this.state.recipes[this.state.editIndex]}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
