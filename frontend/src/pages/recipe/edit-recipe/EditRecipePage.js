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
    var titleID = 0;
    var ingredientIDs = [];

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
              this.titleID = recipe.titleID;
              this.ingredientIDs = recipe.ingredientIDs
              this.setState({title: recipe.title});
              this.setState({description: recipe.description});
              this.setState({ingredients: recipe.ingredients});
              this.setState({recipe: recipe.recipe});
      })
  }

  saveData(){
    this.combineData();
    this.addFilters();
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

    //titleID
    str = this.titleID;

    //title
    str += "\0" + this.state.title;

    //description
    str += "\0" + this.state.description;

    //ingredients
    len = this.state.ingredients[0].length;
    str += "\0" + len;
    for(i = 0; i < len; i++){//ingredientIDs
      str += "\0" + this.ingredientIDs[i];
    }
    for(i = 0; i < len; i++){//ingredients
      str += "\0" + this.state.ingredients[0][i];
    }
    for(i = 0; i < len; i++){//Amount
      str += "\0" + this.state.ingredients[1][i];
    }
    for(i = 0; i < len; i++){//Units
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

  addFilters(){
    var len = 0;
    var i;

    //Adds title filter
    this.addTag(this.titleID, this.state.title, "title").then(
      id => {
        this.titleID  = id[0];
    });;

    //adds ingredients filter
    len = this.state.ingredients[0].length;

    console.log(this.ingredientIDs)

    for(i = 0; i < len; i++){
      this.addTag(this.ingredientIDs[i], this.state.ingredients[0][i], "ingredient", i).then(
        id => {
          this.ingredientIDs[id[1]] = id[0];
      });
    }
  }

  deleteTag(tagID){
    if(tagID != 0){
      fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
          method: 'post',

          body: JSON.stringify({
              action: 'deletePostTags',
              user_id: sessionStorage.getItem('userID'),
              session_token: sessionStorage.getItem('token'),
              posttagid: tagID
              })
        })
    }
  }

  /*
    For new tag tagID = 0;
  */
  addTag(tagID, tag, tagType, i){
    if(tagID != 0){
      const returnID = async recordID => {
        const res = await fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
            method: 'post',

            body: JSON.stringify({
                action: 'addOrEditPostTags',
                user_id: sessionStorage.getItem('userID'),
                userid: sessionStorage.getItem('userID'),
                session_token: sessionStorage.getItem('token'),
                postid: this.state.postID,
                tagtype: tagType,
                tag: tag,
                posttagid: tagID
              })
            })
        return [tagID, i];
      }
      return returnID();
    }else{
      const returnID = async recordID => {
        const res = await fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
            method: 'post',

            body: JSON.stringify({
                action: 'addOrEditPostTags',
                user_id: sessionStorage.getItem('userID'),
                userid: sessionStorage.getItem('userID'),
                session_token: sessionStorage.getItem('token'),
                postid: this.state.postID,
                tagtype: tagType,
                tag: tag
              })
            })
        const json = await res.json();
        return [json['Record Id'], i];
      }
      return returnID();
    }
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
      //new ingredientID
      this.ingredientIDs[this.state.ingredients[0].length] = 0;

      //new ingredient
      array = this.state.ingredients.slice();
      array[0][this.state.ingredients[0].length] = "";
      array[1][this.state.ingredients[1].length] = "0";
      array[2][this.state.ingredients[2].length] = "";
      this.setState({ingredients: array});
    }else{
      //deletes ingredientID
      this.deleteTag(this.ingredientIDs[i]);
      arrayEnd = this.ingredientIDs.splice(i);
      arrayEnd.shift();
      this.ingredientIDs = this.ingredientIDs.concat(arrayEnd);


      //deletes one ingredient
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
