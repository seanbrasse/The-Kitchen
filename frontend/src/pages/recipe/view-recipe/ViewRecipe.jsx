import React from 'react'
//import Board from './tictac'
import RecipeHeader from './RecipeHeader'
//import Tags from './Tags'
//import PrepTime from './PrepTime'
import IngredientsList from './IngredientsList'
//import StarRating from './StarRating'
import Recipe from './Recipe'
//import Author from './Author'
//import Comment from './Comment'
import Description from './Description'
import Title from './Title'

export default class ViewRecipe extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      title: "Title",
      mainImage: "",
      description: "Write description here.",
      ingredients: [[], [], []],
      recipe: [[], []],
      editMode: false
		}
  }

  changeMode = (event) => {
		this.setState({editMode: !this.state.editMode})
	}

  addIngredient = (event) => {
    const target = event.target;
    if(target.name === "Ingredients"){

      this.setState(({ ingredients }) => ({
        ingredients: ingredients.map((row, i) => {
          return target.i === null && i===0 ?
            [...row, target.value] : 
            row.map((cell, j) => (i===0 && target.i === j) ? target.value : cell)
        })
      }));

    }else if(target.name === "Amount"){
      this.setState(({ ingredients }) => ({
        ingredients: ingredients.map((row, i) => {
          return target.i === null && i===1 ?
            [...row, target.value] : 
            row.map((cell, j) => (i===1 && target.i === j) ? target.value : cell)
        })
      }));

    }else if(target.name === "Units"){

      this.setState(({ ingredients }) => ({
        ingredients: ingredients.map((row, i) => {
          return target.i === null && i===2 ?
            [...row, target.value] : 
            row.map((cell, j) => (i===2 && target.i === j) ? target.value : cell)
        })
      }));
    }
  }

  addRecipeElement = (event) => {
    const target = event.target;
    if(target.name === "0"){
      this.setState(({ recipe }) => ({
        recipe: recipe.map((row, i) => {
          return i===0 ? [...row, "header"] : row
        })
      }));
    }else if(target.name === "1"){
      this.setState(({ recipe }) => ({
        recipe: recipe.map((row, i) => {
          return i===0 ? [...row, "text"] : row
        })
      }));
    }else if(target.name === "2"){
      this.setState(({ recipe }) => ({
        recipe: recipe.map((row, i) => {
          return i===0 ? [...row, "image"] : row
        })
      }));
    }
    this.setState(({ recipe }) => ({
      recipe: recipe.map((row, i) => {
        return i===1 ? [...row, ""] : row
      })
    }));
  }

  updateRecipe = (event) => {
    const target = event.target;
    this.setState(({ recipe }) => ({
      recipe: recipe.map((row, i) => {
        return i===1 ? row.map((cell, i) => i === target.name ? target.value : cell) : row
      })
    }));
  }

  updateDesc = (event) => {
    this.setState({description: event.target.value});
  }

  updateTitle = (event) => {
    if(event.target.name === "title"){
      this.setState({title: event.target.value});
    }else{
      this.setState({mainImage: event.target.value});
    }
  }

  render(){
    return(
      <div>
      <Title type={this.state.editMode ? "edit" : "display"} title={this.state.title} image={this.state.mainImage} handle={this.updateTitle}/>
      <RecipeHeader>Description</RecipeHeader>
      <Description type={this.state.editMode ? "edit" : "display"} handle={this.updateDesc} description={this.state.description}/>
      <RecipeHeader>Ingredients</RecipeHeader>
      <IngredientsList type={this.state.editMode ? "edit" : "display"} ingredients={this.state.ingredients} handle={this.addIngredient}/>
      <RecipeHeader type={this.state.editMode ? "edit" : "display"} buttons={["add Header", "add Textbox", "add Image"]} handle={this.addRecipeElement}>Recipe</RecipeHeader>
      <Recipe type={this.state.editMode ? "edit" : "display"} recipe={this.state.recipe} handle={this.updateRecipe}/>
      <button onClick={this.changeMode}>Change Mode</button>
      </div>
    )
  }
}
