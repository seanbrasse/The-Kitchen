import React from 'react'
import RecipeHeader from './RecipeHeader'
import IngredientsList from './IngredientsList'
import Recipe from './Recipe'
import Description from './Description'
import Title from './Title'

export default class ViewRecipe extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      title: "title",
      mainImage: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.izismile.com%2Fimg%2Fimg5%2F20120210%2F640%2Ffood_photos_which_will_make_you_drool_640_05.jpg&f=1&nofb=1",
      description: "description",
      ingredients: [[], [], []],
      recipe: [[], []],
      content: "",
      editMode: false
		}
  }


  componentDidMount() {
    this.loadData();
  }

  loadData(){
      fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php', {
          method: 'post',
          body: JSON.stringify({
              action: 'getPosts',
              postid: '65'
          })
          }).then(res => res.json()).then(parsedRes => {
              this.setState({
                content: parsedRes.posts[0].post_text,
                mainImage: parsedRes.posts[0].post_pic_url
              })
              this.parseData();


      })

  }

  saveData(){
    this.combineData();

    fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/postcontroller.php', {
        method: 'post',

        body: JSON.stringify({
            action: 'addOrEditPosts',
            postid: '65',
            user_id: sessionStorage.getItem('userID'),
            session_token: sessionStorage.getItem('token'),
            posttype: "Recipe",
            posttext: this.state.content,
            postpicurl: this.state.mainImage,
            parentid: null
            })
        })
  }

  combineData(){
    var len = 0;

    //title
    this.state.content = this.state.title;
    //description
    this.state.content += "\0" + this.state.description;

    //ingredients
    len = this.state.ingredients[0].length;
    this.state.content += "\0" + len;
    for(var i = 0; i < len; i++){
      this.state.content += "\0" + this.state.ingredients[0][i];
    }
    for(var i = 0; i < len; i++){
      this.state.content += "\0" + this.state.ingredients[1][i];
    }
    for(var i = 0; i < len; i++){
      this.state.content += "\0" + this.state.ingredients[2][i];
    }

    //recipe
    len = this.state.recipe[0].length;
    this.state.content += "\0" + len;
    for(var i = 0; i < len; i++){
      this.state.content += "\0" + this.state.recipe[0][i];
    }
    for(var i = 0; i < len; i++){
      this.state.content += "\0" + this.state.recipe[1][i];
    }
  }

  parseData(){
    var len = 0;
    var index = 0;
    var data = this.state.content.split('\0');

    //title
    this.setState({title: data[index++]});
    //description
    this.setState({description: data[index++]});

    //ingredients
    len = data[index++];
    for(var i = 0; i < len; i++){
      this.state.ingredients[0][i] = data[index++];
    }
    for(var i = 0; i < len; i++){
      this.state.ingredients[1][i] = data[index++];
    }
    for(var i = 0; i < len; i++){
      this.state.ingredients[2][i] = data[index++];
    }

    //recipe
    len = data[index++];
    for(var i = 0; i < len; i++){
      this.state.recipe[0][i] = data[index++];
    }
    for(var i = 0; i < len; i++){
      this.state.recipe[1][i] = data[index++];
    }

    this.setState({})
  }

  changeMode = (event) => {

    if(this.state.editMode == true){
      this.saveData();
    }

		this.setState({editMode: !this.state.editMode})
	}

  addIngredient = (event) => {

    if(event.target.name === "Ingredients"){
      this.state.ingredients[0][event.target.id] = event.target.value
  		this.setState({})
    }else if(event.target.name === "Amount"){
      this.state.ingredients[1][event.target.id] = event.target.value
      this.setState({})

    }else if(event.target.name === "Units"){
      this.state.ingredients[2][event.target.id] = event.target.value
      this.setState({})
    }else if(event.target.name === "button"){
      this.state.ingredients[0][this.state.ingredients[0].length] = "";
      this.state.ingredients[1][this.state.ingredients[1].length] = 0;
      this.state.ingredients[2][this.state.ingredients[2].length] = "";
      this.setState({})
    }
  }

  addRecipeElement = (event) => {
    if(event.target.name === "0"){
      this.state.recipe[0][this.state.recipe[0].length] = "header"
    }else if(event.target.name === "1"){
      this.state.recipe[0][this.state.recipe[0].length] = "text"
    }else if(event.target.name === "2"){
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
