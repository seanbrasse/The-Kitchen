import React from 'react'
import RecipeHeader from '../recipe-components/RecipeHeader'
import IngredientsList from '../recipe-components/IngredientsList'
import Recipe from '../recipe-components/Recipe'
import Description from '../recipe-components/Description'
import Title from '../recipe-components/Title'
import {parseRecipe} from 'util/parseRecipe.js'

export default class ViewRecipePage extends React.Component{
  constructor(props){
    super(props);
    this.tagIDs = [];

    this.state = {
      title: "",
      mainImage: "",
      description: "",
      ingredients: [[], [], []],
      recipe: [[], []],
      content: "",
      editMode: false,
      userid: null,
      tags: "",
      prepTime: 0,
      cookTime: 0
		}
  }

  componentDidMount() {
    this.loadData(this.props.postID);
    this.loadTags(this.props.postID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.postID !== this.props.postID) {
      this.setState({
        title: "",
        mainImage: "",
        description: "",
        ingredients: [[], [], []],
        recipe: [[], []],
        content: "",
        editMode: false,
        userid: null
      });
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
          this.setState({
            content: parsedRes.posts[0].post_text,
            mainImage: parsedRes.posts[0].post_pic_url,
            userid: parsedRes.posts[0].user_id
          });
          var recipe = parseRecipe(this.state.content);
          this.setState({title: recipe.title});
          this.setState({description: recipe.description});
          this.setState({ingredients: recipe.ingredients});
          this.setState({recipe: recipe.recipe});
      })
  }

  /*
    Loads all the tags and time for the recipe
  */
  loadTags(postID){
    fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
        method: 'post',

        body: JSON.stringify({
            action: 'getPostTags',
            postid: "" + postID,
            tagtype: "Tag"
            })
        }).then(res => res.json()).then(parsedRes => {
              var tagsArray = parsedRes['post_tags'];
              var tagIDs = [];
              var tags = "";
              var len;
              var i;

              if(tagsArray !== undefined){
                len =  tagsArray.length;
                tags += tagsArray[0].tag;
                tagIDs[0] = tagsArray[0].post_tag_id;

                for(i = 1; i < len; i++){
                  tags += ", " + tagsArray[i].tag;
                  tagIDs[i] = tagsArray[i].post_tag_id;
                }
              }

              this.setState({
                tags: tags
              });
              this.tagIDs = this.tagIDs.concat(tagIDs);
        })
    fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
        method: 'post',

        body: JSON.stringify({
            action: 'getPostTags',
            postid: "" + postID,
            tagtype: "PrepTime"
            })
        }).then(res => res.json()).then(parsedRes => {
              var tagsArray = parsedRes['post_tags'];
              var tagIDs = [];
              var prepTime = 0;

              if(tagsArray !== undefined){
                prepTime = tagsArray[0].tag;
                tagIDs[0] = tagsArray[0].post_tag_id;
              }

              this.setState({
                prepTime: prepTime
              });
              this.tagIDs = this.tagIDs.concat(tagIDs);
        })
    fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
        method: 'post',

        body: JSON.stringify({
            action: 'getPostTags',
            postid: "" + postID,
            tagtype: "CookTime"
            })
        }).then(res => res.json()).then(parsedRes => {
              var tagsArray = parsedRes['post_tags'];
              var tagIDs = [];
              var cookTime = 0;

              if(tagsArray !== undefined){
                cookTime = tagsArray[0].tag;
                tagIDs[0] = tagsArray[0].post_tag_id;
              }

              this.setState({
                cookTime: cookTime
              });
              this.tagIDs = this.tagIDs.concat(tagIDs);
        })
    fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
        method: 'post',

        body: JSON.stringify({
            action: 'getPostTags',
            postid: "" + postID,
            tagtype: "TotalTime"
            })
        }).then(res => res.json()).then(parsedRes => {
              var tagsArray = parsedRes['post_tags'];
              var tagIDs = [];

              if(tagsArray !== undefined){
                tagIDs[0] = tagsArray[0].post_tag_id;
              }

              this.tagIDs = this.tagIDs.concat(tagIDs);
        })

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
    this.setState({content: str});
  }

  parseData(){
    var len = 0;
    var index = 0;
    var data = this.state.content.split('\0');
    var array;
    var i;

    //title
    this.setState({title: data[index++]});
    //description
    this.setState({description: data[index++]});

    //ingredients
    len = data[index++];
    for(i = 0; i < len; i++){
      array = this.state.ingredients.slice();
      array[0][i] = data[index++];
      this.setState({ingredients: array});
    }
    for(i = 0; i < len; i++){
      array = this.state.ingredients.slice();
      array[1][i] = data[index++];
      this.setState({ingredients: array});
    }
    for(i = 0; i < len; i++){
      array = this.state.ingredients.slice();
      array[2][i] = data[index++];
      this.setState({ingredients: array});
    }

    //recipe
    len = data[index++];
    for(i = 0; i < len; i++){
      array = this.state.recipe.slice();
      array[0][i] = data[index++];
      this.setState({recipe: array});
    }
    for(i = 0; i < len; i++){
      array = this.state.recipe.slice();
      array[1][i] = data[index++];
      this.setState({recipe: array});
    }
  }

  render(){
    return(
      <div class="recipe-page">
      <div class="recipe-content">
      <Title
        title={this.state.title} image={this.state.mainImage}
        canEdit={this.state.userid === sessionStorage.getItem('userID')}
        postID={this.props.postID}
      />

      <div className="tagsContainer">
        <div className="totalTime">
          <label for="textbox">Tags</label><br></br>
          <a>{this.state.tags}</a>
        </div>
      </div>
      <div className="tagsContainer">
        <div className="totalTime">
          <label for="textbox">Prep Time</label><br></br>
          <a>{parseInt(this.state.prepTime) + " min"}</a>
        </div>
        <div className="totalTime">
          <label for="textbox">Cook Time</label><br></br>
          <a>{parseInt(this.state.cookTime) + " min"}</a>
        </div>
        <div className="totalTime">
          <label for="paragraph">Total Time</label><br></br>
          <a>{parseInt(this.state.prepTime) + parseInt(this.state.cookTime) + " min"}</a>
        </div>
      </div>

      <RecipeHeader>Description</RecipeHeader>
      <Description description={this.state.description}/>
      <RecipeHeader>Ingredients</RecipeHeader>
      <IngredientsList ingredients={this.state.ingredients}/>
      <RecipeHeader>Recipe</RecipeHeader>
      <Recipe recipe={this.state.recipe}/>
      </div>
      </div>
    )
  }
}
