import React from 'react'
//import Board from './tictac'
import RecipeHeader from './RecipeHeader'
import Tags from './Tags'
import PrepTime from './PrepTime'
import IngredientsList from './IngredientsList'
import StarRating from './StarRating'
import Recipe from './Recipe'
import Author from './Author'
import Comment from './Comment'
import Description from './Description'
import Title from './Title'

class App extends React.Component{
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
    if(event.target.name == "Ingredients"){

      if(event.target.i == null){
        event.target.i = this.state.ingredients[0].length
      }
      this.state.ingredients[0][event.target.i] = event.target.value
  		this.setState({})

    }else if(event.target.name == "Amount"){

      if(event.target.i == null){
        event.target.i = this.state.ingredients[1].length
      }
      this.state.ingredients[1][event.target.i] = event.target.value
      this.setState({})

    }else if(event.target.name == "Units"){

      if(event.target.i == null){
        event.target.i = this.state.ingredients[2].length
      }
      this.state.ingredients[2][event.target.i] = event.target.value
      this.setState({})

    }
  }

  addRecipeElement = (event) => {
    if(event.target.name == "0"){
      this.state.recipe[0][this.state.recipe[0].length] = "header"
    }else if(event.target.name == "1"){
      this.state.recipe[0][this.state.recipe[0].length] = "text"
    }else if(event.target.name == "2"){
      this.state.recipe[0][this.state.recipe[0].length] = "image"
    }
    this.state.recipe[1][this.state.recipe[1].length] = ""
    this.setState({})
  }

  updateRecipe = (event) => {
    this.state.recipe[1][event.target.name] = event.target.value
    this.setState({})
  }

  updateDesc = (event) => {
    this.state.description = event.target.value
    this.setState({})
  }

  updateTitle = (event) => {
    if(event.target.name == "title"){
      this.state.title = event.target.value
    }else{
      this.state.mainImage = event.target.value
    }
    this.setState({})
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

export default App;
