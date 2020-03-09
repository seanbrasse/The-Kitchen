import React from 'react'
//import Board from './tictac'
import RecipeHeader from './RecipeHeader'
import Tags from './Tags'
import PrepTime from './PrepTime'
import IngredientsList from './IngredientsList'
import StarRating from './StarRating'
import Recipe from './Recipe'
import Author from './Author'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
			name1: "Add Header",
			name2: "Add Textbox",
      name3: "Add Image",
      tags: ["tag1", "tag2", "tag3"],
      prepTime: 50,
      units: "min",
      ingredients: ["Flour", "Tomatos", "Vanilla Extract"],
      ingredientsUnits: ["Cups", "", "Tbsp"],
      ingredientsAmount: [2, 1, 1],
      rating: 2,
      newRating: 0,
      recipeElements:["Header", "This is a Description", "/logo192.png", "Header2", "more words"],
      recipeTypes: ["header", "text", "image" ,"header", "text"],
      authorImage: "/logo192.png",
      authorUsername: "The name"
		}
  }

  handleClickA = (event) =>{
    this.setState({name1: this.state.name1 + " was clicked"});
  }
  handleClickB = (event) =>{
    this.setState({name2: this.state.name2 + "B was clicked"});
  }
  handleClickC = (event) =>{
    this.setState({name3: this.state.name3 + "C was clicked"});
  }
  updateRating = (event) =>{
    this.setState({newRating: event.target.r});
    console.log(this.newRating);
  }

  render(){

    return(
      <div>
      <div><Author username={this.state.authorUsername} profileImage={this.state.authorImage}/></div>
      <div><Tags tags={this.state.tags}/></div>
      <div><PrepTime time={this.state.prepTime} units={this.state.units}/></div>
      <div><RecipeHeader buttons={[this.state.name1, this.state.name2, this.state.name3]} onClick={[this.handleClickA, this.handleClickB, this.handleClickC]} >The Kitchen</RecipeHeader></div>
      <div><RecipeHeader>Ingredients</RecipeHeader></div>
      <div><IngredientsList ingredients={this.state.ingredients} amount={this.state.ingredientsAmount} units={this.state.ingredientsUnits}/></div>
      <div><RecipeHeader>Recipe</RecipeHeader></div>
      <div><Recipe elements={this.state.recipeElements} types={this.state.recipeTypes}/></div>
      <div><RecipeHeader>Comments</RecipeHeader></div>
      </div>
    )
  }
  /*
  <div><StarRating newRating={this.state.newRating} rating={this.state.rating} updateRating={this.updateRating}/></div>
  */

}


export default App;
