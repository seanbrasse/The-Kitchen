import React from 'react';
import RecipeHeader from '../recipe-components/RecipeHeader'
import IngredientsList from '../recipe-components/IngredientsList'
import Recipe from '../recipe-components/Recipe'
import Description from '../recipe-components/Description'
import Title from '../recipe-components/Title'
import {parseRecipe} from 'util/parseRecipe.js'

export default class EditRecipePage extends React.Component{

  constructor(props){
    super(props);
    this.content = "";
    this.ingredientIDs = [];

    this.state = {
      title: "",
      mainImage: "",
      description: "",
      ingredients: [[], [], []],
      recipe: [[], []],
      postID: 0,
      editMode: true,
      messageID: 0,
      titleID: 0
		}
  }

//-----------------------------------Functions----------------------------------
  /*
    Loads the page with a recipe
  */
  componentDidMount() {
    if(this.props.postID !== 0 && this.props.postID !== undefined){
      this.setState({postID: this.props.postID})
      this.loadData(this.props.postID);
    }
  }

  /*
    Fetches the recipe parses it and updates the content on the page
  */
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
              this.setState({titleID: recipe.titleID});
              this.ingredientIDs = recipe.ingredientIDs;
              this.setState({title: recipe.title});
              this.setState({description: recipe.description});
              this.setState({ingredients: recipe.ingredients});
              this.setState({recipe: recipe.recipe});
              this.setState({messageID: recipe.messageID});
      })
  }

  /*
    Combines data of recipe for uploading to the server
  */
  combineData(){
    var len = 0;
    var i;
    var str = "";

    //titleID
    str = this.state.titleID;

    //messageID
    str += "\0" + this.state.messageID;

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

  /*
    This adds title and ingredient tags to the recipe for searching and filtering recipes
  */
  addFilters(){
    var len = 0;
    var index = 0;
    var arrayTagPromises = [];

    arrayTagPromises[index++] = this.addTag(this.state.titleID, this.state.title, "title");

    len = this.state.ingredients[0].length;
    for(var i = 0; i < len; i++){
      arrayTagPromises[index++] = this.addTag(this.ingredientIDs[i], this.state.ingredients[0][i], "ingredient", i);
    }
    return Promise.all(arrayTagPromises).then(res => {
      var id = res[0];
      var len = res.length;

      this.setState({titleID: id[0]});

      for(var i = 1; i < len; i++){
        id = res[i]
        this.ingredientIDs[id[1]] = id[0];
      }
    })
  }

/*
  This deletes a single tag
  This is meant for if a ingredient gets deleted the tag gets deleted as well
*/
  deleteTag(tagID){
    if(tagID !==0){
      fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
          method: 'post',

          body: JSON.stringify({
              action: 'deletePostTags',
              user_id: sessionStorage.getItem('userID'),
              userid: sessionStorage.getItem('userID'),
              session_token: sessionStorage.getItem('token'),
              posttagid: tagID
              })
        })
    }
  }

  /*
    adds a tag to the recipe
    For new tag tagID = 0;
  */
  addTag(tagID, tag, tagType, i){
    if(tagID !==0){
      const returnID = async recordID => {
        await fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
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

  /*
    Uploads the data to the stark server
  */
  uploadData(postType){
    if(this.state.postID === 0){
      return fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php', {
          method: 'post',

          body: JSON.stringify({
              action: 'addOrEditPosts',
              user_id: sessionStorage.getItem('userID'),
              userid: sessionStorage.getItem('userID'),
              session_token: sessionStorage.getItem('token'),
              posttype: postType,
              posttext: this.content,
              postpicurl: this.state.mainImage,
              parentid: null
              })
          }).then(res => res.json()).then(parsedRes => {
              this.setState({postID: parsedRes['Record Id']});
      })
    } else {
      return fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php', {
          method: 'post',

          body: JSON.stringify({
              action: 'addOrEditPosts',
              user_id: sessionStorage.getItem('userID'),
              userid: sessionStorage.getItem('userID'),
              postid: this.state.postID,
              session_token: sessionStorage.getItem('token'),
              posttype: postType,
              posttext: this.content,
              postpicurl: this.state.mainImage,
              parentid: null
              })
          })
    }
  }

  /*
    This sends a recipeID in a message to the users follower group
  */
  sendAsMessage(postID){
    if(this.state.messageID === undefined || this.state.messageID === 0){
      return fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/messagecontroller.php', {
        method: 'post',

        body: JSON.stringify({
          action: "addOrEditMessages",
          user_id: sessionStorage.getItem('userID'),
          userid: sessionStorage.getItem('userID'),
          session_token: sessionStorage.getItem('token'),
          groupid: sessionStorage.getItem('groupID'),
          message: postID,
        })
      }).then(res => res.json()).then(parsedRes => {
          this.setState({messageID: parsedRes['Record Id']});
      })
    }else{
     return fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/messagecontroller.php', {
        method: 'post',

        body: JSON.stringify({
        	action: "addOrEditMessages",
        	user_id: sessionStorage.getItem('userID'),
        	userid: sessionStorage.getItem('userID'),
        	session_token: sessionStorage.getItem('token'),
        	groupid: sessionStorage.getItem('groupID'),
        	message: postID,
          messageid: this.state.messageID
        })
      })
    }
  }

  /*
    finds all the tags under a postID and deletes them
    This is meant for deleting a recipe or making a recipe private
  */
  deleteTags(postID){
    return fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
        method: 'post',

        body: JSON.stringify({
            action: 'getPostTags',
            postid: postID
            })
        }).then(res => res.json()).then(parsedRes => {
              var tags = parsedRes['post_tags'];
              var len;
              var i;

              if(tags !== undefined){
                len =  tags.length;
                for(i = 0; i < len; i++){
                  fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
                      method: 'post',

                      body: JSON.stringify({
                          action: 'deletePostTags',
                          user_id: sessionStorage.getItem('userID'),
                          userid: sessionStorage.getItem('userID'),
                          session_token: sessionStorage.getItem('token'),
                          posttagid: tags[i].post_tag_id
                          })
                  })
                }
              }
              this.setState({titleID: 0});
              len = this.ingredientIDs.length;
              for(i = 0; i < len; i++){//ingredient
                this.ingredientIDs[i] = 0;
              }
        })
  }

//----------------------------------Event Handlers------------------------------

  /*
    Uploads a recipe to be viewed by anyone
    -uploads recipe
    -update/adds tags
  */
  uploadDataPublic = (event) => {
    if(this.state.postID === 0){
      this.uploadData("Empty").then(() => {
        this.addFilters().then(() => {
          this.combineData();
          this.uploadData("Recipe");
        });
      });
    }else{
      this.addFilters().then(() => {
        console.log("yes")
        this.combineData();
        this.uploadData("Recipe");
      });
	  }
  }


  /*
    Uploads a recipe privatly
    -uploads recipe
    -deletes tags
    -sends private message
  */
  uploadDataPrivate = (event) => {
    if(this.state.postID === 0){
      this.uploadData("Empty").then(() => {
        this.deleteTags().then(() => {
          this.sendAsMessage(this.state.postID).then(() => {
            this.combineData();
            this.uploadData("Private");
          })
        })
      });
    }else{
      this.deleteTags().then(() => {
        this.sendAsMessage(this.state.postID).then(() => {
          this.combineData();
          this.uploadData("Private");
        })
      })
	  }
	}

  /*
    adds an ingredient when the ingredient button is pressed
    updates ingredient if box is changed
    deletes ingredient if delete button is pressed
  */
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

  /*
    adds a recipe step when any of the buttons on the recipe header are pressed
  */
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

  /*
    Updates the recipe steps when a box is changed
    delete the recipe element if button is pressed
  */
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

  /*
    Updates the description when the description box is changed
  */
  updateDesc = (event) => {
    this.setState({description: event.target.value});
  }

  /*
    Updates the title when title box is changed
  */
  updateTitle = (event) => {
    if(event.target.name === "title"){
      this.setState({title: event.target.value});
    }else{
      this.setState({mainImage: event.target.value});
    }
  }

//----------------------------------Render--------------------------------------
  render(){
    return(
      <div className="recipe-page">
      <div className="recipe-content">
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
      <h3>{"TitleID: " + this.state.titleID}</h3>
      <h3>{"PostID: " + this.state.postID}</h3>
      <h3>{"MessageID: " + this.state.messageID}</h3>
      </div>
      </div>
    )
  }
}
