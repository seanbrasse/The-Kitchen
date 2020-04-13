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

    this.state = {
      title: "",
      mainImage: "",
      description: "",
      ingredients: [[], [], []],
      recipe: [[], []],
      content: "",
      editMode: false,
      userid: null
		}
  }

  componentDidMount() {
    this.loadData(this.props.postID);
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
