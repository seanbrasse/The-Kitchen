import React from 'react';
import RecipeHeader from '../recipe-components/RecipeHeader'
import IngredientsList from '../recipe-components/IngredientsList'
import Recipe from '../recipe-components/Recipe'
import Description from '../recipe-components/Description'
import Title from '../recipe-components/Title'
import {parseRecipe} from 'components/parseRecipe.js'

export default class EditRecipePage extends React.Component{

  constructor(props){
    super(props);
    var content = "";

    this.state = {
      title: "",
      mainImage: "",
      description: "",
      ingredients: [[], [], []],
      recipe: [[], []],
      postID: 0,
      editMode: true
		}
  }


  componentDidMount() {
    if(this.props.postID != 0){
      this.setState({postID: this.props.postID})
      this.loadData(this.props.postID);
    }
  }

  loadData(postID){
      fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php', {
          method: 'post',
          body: JSON.stringify({
              action: 'getPosts',
              postid: postID
          })
          }).then(res => res.json()).then(parsedRes => {
              this.content = parsedRes.posts[0].post_text;
              this.setState({
                mainImage: parsedRes.posts[0].post_pic_url
              })
              var recipe = parseRecipe(this.content);
              this.setState({title: recipe.title});
              this.setState({description: recipe.description});
              this.setState({ingredients: recipe.ingredients});
              this.setState({recipe: recipe.recipe});
      })
  }

  saveData(){
    this.combineData();
    if(this.state.postID != 0){
    fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php', {
        method: 'post',

        body: JSON.stringify({
            action: 'addOrEditPosts',
            postid: this.state.postID,
            user_id: sessionStorage.getItem('userID'),
            session_token: sessionStorage.getItem('token'),
            posttype: "Recipe",
            posttext: this.content,
            postpicurl: this.state.mainImage,
            parentid: null
            })
        })
    }else{
      fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php', {
          method: 'post',

          body: JSON.stringify({
              action: 'addOrEditPosts',
              user_id: sessionStorage.getItem('userID'),
              session_token: sessionStorage.getItem('token'),
              posttype: "Recipe",
              posttext: this.content,
              postpicurl: this.state.mainImage,
              parentid: null
              })
          }).then(res => res.json()).then(parsedRes => {
                this.setState({postID: parsedRes['Record Id']});
          })
    }
  }

  combineData(){
    var len = 0;
    var i;
    var str = "";

    //title
    str = this.state.title;
    //description
    str += "\0" + this.state.description;

    //ingredients
    len = this.state.ingredients[0].length;
    str += "\0" + len;
    for(i = 0; i < len; i++){
      str += "\0" + this.state.ingredients[0][i];
    }
    for(i = 0; i < len; i++){
      str += "\0" + this.state.ingredients[1][i];
    }
    for(i = 0; i < len; i++){
      str += "\0" + this.state.ingredients[2][i];
    }

    //recipe
    len = this.state.recipe[0].length;
    str += "\0" + len;
    for(i = 0; i < len; i++){
      str += "\0" + this.state.recipe[0][i];
    }
    for(i = 0; i < len; i++){
      str += "\0" + this.state.recipe[1][i];
    }

    this.content = str;
  }

  uploadDataPublic = (event) => {
    this.saveData();
	}

  uploadDataPrivate = (event) => {
    this.saveData();
	}

  addIngredient = (event, i) => {
    var array;
    var arrayEnd;

    if(event.target.name === "Ingredients"){
      array = this.state.ingredients.slice();
      array[0][i] = event.target.value;
  		this.setState({ingredients: array});
    }else if(event.target.name === "Amount"){
      array = this.state.ingredients.slice();
      array[1][i] = event.target.value;
      this.setState({ingredients: array});
    }else if(event.target.name === "Units"){
      array = this.state.ingredients.slice();
      array[2][i] = event.target.value;
      this.setState({ingredients: array});
    }else if(event.target.name === "button"){
      array = this.state.ingredients.slice();
      array[0][this.state.ingredients[0].length] = "";
      array[1][this.state.ingredients[1].length] = "0";
      array[2][this.state.ingredients[2].length] = "";
      this.setState({ingredients: array});
    }else{
      array = this.state.ingredients.slice();

      arrayEnd = array[0].splice(i);
      arrayEnd.shift()
      array[0] = array[0].concat(arrayEnd);

      arrayEnd = array[1].splice(i);
      arrayEnd.shift()
      array[1] = array[1].concat(arrayEnd);

      arrayEnd = array[2].splice(i);
      arrayEnd.shift()
      array[2] = array[2].concat(arrayEnd);

      this.setState({ingredients: array});
    }
  }

  addRecipeElement = (event) => {
    var array;

    if(event.target.name === "0"){
      array = this.state.recipe.slice();
      array[0][this.state.recipe[0].length] = "header";
      this.setState({recipe: array});
    }else if(event.target.name === "1"){
      array = this.state.recipe.slice();
      array[0][this.state.recipe[0].length] = "text";
      this.setState({recipe: array});
    }else if(event.target.name === "2"){
      array = this.state.recipe.slice();
      array[0][this.state.recipe[0].length] = "image";
      this.setState({recipe: array});
    }
    array = this.state.recipe.slice();
    array[1][this.state.recipe[1].length] = "";
    this.setState({recipe: array});
  }

  updateRecipe = (event, i) => {
    var array;
    var arrayEnd;

    if(event.target.name === "update"){
      array = this.state.recipe.slice();
      array[1][i] = event.target.value;
      this.setState({recipe: array});
    }else{
      array = this.state.recipe.slice();

      arrayEnd = array[0].splice(i);
      arrayEnd.shift()
      array[0] = array[0].concat(arrayEnd);

      arrayEnd = array[1].splice(i);
      arrayEnd.shift()
      array[1] = array[1].concat(arrayEnd);

      this.setState({recipe: array});
    }
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
      <div class="recipe-page">
      <div class="recipe-content">
      <h1>{this.recipeID}</h1>
      <Title type={this.state.editMode ? "edit" : "display"} title={this.state.title} image={this.state.mainImage} handle={this.updateTitle}/>
      <RecipeHeader>Description</RecipeHeader>
      <Description type={this.state.editMode ? "edit" : "display"} handle={this.updateDesc} description={this.state.description}/>
      <RecipeHeader>Ingredients</RecipeHeader>
      <IngredientsList type={this.state.editMode ? "edit" : "display"} ingredients={this.state.ingredients} handle={this.addIngredient}/>
      <RecipeHeader type={this.state.editMode ? "edit" : "display"} buttons={["add Header", "add Textbox", "add Image"]} handle={this.addRecipeElement}>Recipe</RecipeHeader>
      <Recipe type={this.state.editMode ? "edit" : "display"} recipe={this.state.recipe} handle={this.updateRecipe}/>
      <button id="smallButton" onClick={this.uploadDataPublic}>Upload Public</button>
      <button id="smallButton" onClick={this.uploadDataPrivate}>Upload Private</button>
      <h3>{"PostID: " + this.state.postID}</h3>
      </div>
      </div>
    )
  }
}
