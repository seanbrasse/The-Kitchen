import React from 'react'
import RecipeHeader from '../recipe-components/RecipeHeader'
import IngredientsList from '../recipe-components/IngredientsList'
import Recipe from '../recipe-components/Recipe'
import Description from '../recipe-components/Description'
import Title from '../recipe-components/Title'
import Comment from './comment'
import { MdStar } from 'react-icons/md';
import {parseRecipe} from 'util/parseRecipe.js'

export default class ViewRecipePage extends React.Component{
  constructor(props){
    super(props);
    this.tagIDs = [];

    this.state = {
      postID: 0,
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
      cookTime: 0,
      numberOfRatingsID: 0,
      numberOfRatings: 0,
      userRatingID: 0,
      userRating: 0,
      ratingID: 0,
      rating: 0,
      hover: 0,
      header: ["title", "description", "ingredients", "recipe", "comments"],
      headerIndex: 0
		}
  }

  componentDidMount() {
    this.loadData(this.props.postID);
    this.loadTags(this.props.postID);
    this.loadRating(this.props.postID);
    this.setState({postID: this.props.postID});
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

  loadRating(postID){
    fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
        method: 'post',

        body: JSON.stringify({
            action: 'getPostTags',
            postid: "" + postID,
            tagtype: "Rating"
            })
        }).then(res => res.json()).then(parsedRes => {
            var tagsArray = parsedRes['post_tags'];
            var ratingID = 0;
            var rating = 0;

            if(tagsArray !== undefined){
              rating = tagsArray[0].tag;
              ratingID = tagsArray[0].post_tag_id;
            }

            this.setState({
              ratingID: ratingID,
              rating: rating
            });
    })
    fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
        method: 'post',

        body: JSON.stringify({
            action: 'getPostTags',
            postid: "" + postID,
            tagtype: "NumberOfRatings"
            })
        }).then(res => res.json()).then(parsedRes => {
            var tagsArray = parsedRes['post_tags'];
            var numberOfRatingsID = 0;
            var numberOfRatings = 0;

            if(tagsArray !== undefined){
              numberOfRatings = tagsArray[0].tag;
              numberOfRatingsID = tagsArray[0].post_tag_id;
            }

            this.setState({
              numberOfRatingsID: numberOfRatingsID,
              numberOfRatings: numberOfRatings
            });
    })
    fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/uacontroller.php', {
        method: 'post',

        body: JSON.stringify({
        	action: "getUserArtifacts",
        	userid: sessionStorage.getItem('userID'),
        	artifactcategory: "" + postID
        })
        }).then(res => res.json()).then(parsedRes => {
            var array = parsedRes['user_artifacts'];
            var userRatingID = 0;
            var userRating = 0;

            if(array !== undefined){
              userRatingID = array[0].artifact_id;
              userRating = array[0].artifact_url;
            }

            this.setState({
              userRatingID: userRatingID,
              userRating: userRating
            });
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

  StarRating(){
    return <div className="starRatingContainer">
      <div>
        <form className="starRatingForm">
          <input type="radio" id="1Star" name="rating" value="1" onClick={this.addRating}></input>
          <label for="1Star">
          <MdStar
            color={1 <= (this.state.hover || this.state.userRating || this.state.rating) ? "#fd0" : "lightgrey"}
            onMouseEnter={() => this.setState({hover: 1})}
            onMouseLeave={() => this.setState({hover: 0})}
          />
          </label>
          <input type="radio" id="2Star" name="rating" value="2" onClick={this.addRating}></input>
          <label for="2Star">
          <MdStar
            color={2 <= (this.state.hover || this.state.userRating || this.state.rating) ? "#fd0" : "lightgrey"}
            onMouseEnter={() => this.setState({hover: 2})}
            onMouseLeave={() => this.setState({hover: 0})}
          />
          </label>
          <input type="radio" id="3Star" name="rating" value="3" onClick={this.addRating}></input>
          <label for="3Star">
          <MdStar
            color={3 <= (this.state.hover || this.state.userRating || this.state.rating) ? "#fd0" : "lightgrey"}
            onMouseEnter={() => this.setState({hover: 3})}
            onMouseLeave={() => this.setState({hover: 0})}
          />
          </label>
          <input type="radio" id="4Star" name="rating" value="4" onClick={this.addRating}></input>
          <label for="4Star">
          <MdStar
            color={4 <= (this.state.hover || this.state.userRating || this.state.rating) ? "#fd0" : "lightgrey"}
            onMouseEnter={() => this.setState({hover: 4})}
            onMouseLeave={() => this.setState({hover: 0})}
          />
          </label>
          <input type="radio" id="5Star" name="rating" value="5" onClick={this.addRating}></input>
          <label for="5Star">
          <MdStar
            color={5 <= (this.state.hover || this.state.userRating || this.state.rating) ? "#fd0" : "lightgrey"}
            onMouseEnter={() => this.setState({hover: 5})}
            onMouseLeave={() => this.setState({hover: 0})}
          />
          </label>
        </form>
      </div>
    </div>;
  }

  nextHeader = () => {
    if(this.state.headerIndex != 4){
      this.setState({
        headerIndex: this.state.headerIndex + 1
      });
    }else{
      this.setState({
        headerIndex: 0
      });
    }
  }

  addRating = (event) => {
    var numberOfRatings = parseInt(this.state.numberOfRatings);
    var userRating = parseInt(event.target.value);
    var rating = parseFloat(this.state.rating);

    if(this.state.userRating == 0){
      rating = rating * numberOfRatings;
      numberOfRatings++;
      rating += userRating;
      rating = rating / numberOfRatings;
    }else{
      rating = rating * numberOfRatings;
      rating -= this.state.userRating;
      rating += userRating;
      rating = rating / numberOfRatings;
    }

    this.setState({
      numberOfRatings: numberOfRatings,
      userRating: userRating,
      rating: rating
    })

    if(this.state.numberOfRatingsID != 0){
      fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
          method: 'post',

          body: JSON.stringify({
            action: 'addOrEditPostTags',
            user_id: sessionStorage.getItem('userID'),
            userid: sessionStorage.getItem('userID'),
            session_token: sessionStorage.getItem('token'),
            postid: this.state.postID,
            tagtype: "NumberOfRatings",
            tag: numberOfRatings,
            posttagid: this.state.numberOfRatingsID
          })
      })
    }else{
      fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
          method: 'post',

          body: JSON.stringify({
            action: 'addOrEditPostTags',
            user_id: sessionStorage.getItem('userID'),
            userid: sessionStorage.getItem('userID'),
            session_token: sessionStorage.getItem('token'),
            postid: this.state.postID,
            tagtype: "NumberOfRatings",
            tag: numberOfRatings
          })
      }).then(res => res.json()).then(parsedRes => {
        this.setState({
          numberOfRatingsID: parsedRes['Record Id']
        })
      })
    }

    if(this.state.ratingID != 0){
      fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
          method: 'post',

          body: JSON.stringify({
            action: 'addOrEditPostTags',
            user_id: sessionStorage.getItem('userID'),
            userid: sessionStorage.getItem('userID'),
            session_token: sessionStorage.getItem('token'),
            postid: this.state.postID,
            tagtype: "Rating",
            tag: rating,
            posttagid: this.state.ratingID
          })
      })
    }else{
      fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/ptcontroller.php', {
          method: 'post',

          body: JSON.stringify({
            action: 'addOrEditPostTags',
            user_id: sessionStorage.getItem('userID'),
            userid: sessionStorage.getItem('userID'),
            session_token: sessionStorage.getItem('token'),
            postid: this.state.postID,
            tagtype: "Rating",
            tag: rating,
          })
      }).then(res => res.json()).then(parsedRes => {
        this.setState({
          ratingID: parsedRes['Record Id']
        })
      })
    }

    if(this.state.userRatingID != 0){
      fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/uacontroller.php', {
          method: 'post',

          body: JSON.stringify({
          	action: "addOrEditUserArtifacts",
          	userid: sessionStorage.getItem('userID'),
          	user_id: sessionStorage.getItem('userID'),
          	artifactid: this.state.userRatingID,
          	session_token: sessionStorage.getItem('token'),
          	artifacturl: userRating,
          	artifactcategory: "" + this.state.postID,
          	artifacttype: "userRating"
          })
      })
    }else{
        fetch('http://stark.cse.buffalo.edu/cse410/deldev/api/uacontroller.php', {
            method: 'post',

            body: JSON.stringify({
            	action: "addOrEditUserArtifacts",
            	userid: sessionStorage.getItem('userID'),
            	user_id: sessionStorage.getItem('userID'),
            	session_token: sessionStorage.getItem('token'),
            	artifacturl: userRating,
            	artifactcategory: "" + this.state.postID,
            	artifacttype: "userRating"
            })
            }).then(res => res.json()).then(parsedRes => {
              this.setState({
                userRatingID: parsedRes['Record Id']
              })
        })
    }
  }

  render(){
    return(
      <div class="recipe-page">
      <div class="recipe-content">
      <div id={"/recipe/" + this.state.postID + "/#title"}></div>

      <div className="bottomCorner">
        <a href={"#/recipe/" + this.state.postID + "/#title"}><button>Top</button></a>
        <a href={"#/recipe/" + this.state.postID + "/#" + this.state.header[this.state.headerIndex]}><button onClick={this.nextHeader}>Next</button></a>
      </div>

      <Title
        title={this.state.title} image={this.state.mainImage}
        canEdit={this.state.userid === sessionStorage.getItem('userID')}
        postID={this.props.postID}
      />

      <div className="container">
        <div className="tagsItem">
          <label for="textbox">Tags</label><br></br>
          <a>{this.state.tags}</a>
        </div>

        <div className="ratingItem">
          <label for="textbox">Rating</label><br></br>
          {this.StarRating()}
        </div>

      </div>
      <div className="container">
        <div className="prepTime">
          <label for="textbox">Prep Time</label><br></br>
          <a>{parseInt(this.state.prepTime) + " min"}</a>
        </div>
        <div className="cookTime">
          <label for="textbox">Cook Time</label><br></br>
          <a>{parseInt(this.state.cookTime) + " min"}</a>
        </div>
        <div className="totalTime">
          <label for="paragraph">Total Time</label><br></br>
          <a>{parseInt(this.state.prepTime) + parseInt(this.state.cookTime) + " min"}</a>
        </div>
      </div>

      <div id={"/recipe/" + this.state.postID + "/#description"}></div>
      <RecipeHeader>Description</RecipeHeader>
      <Description description={this.state.description}/>

      <div id={"/recipe/" + this.state.postID + "/#ingredients"}></div>
      <RecipeHeader>Ingredients</RecipeHeader>
      <IngredientsList ingredients={this.state.ingredients}/>

      <div id={"/recipe/" + this.state.postID + "/#recipe"}></div>
      <RecipeHeader>Recipe</RecipeHeader>
      <Recipe recipe={this.state.recipe}/>

      <div id={"/recipe/" + this.state.postID + "/#comments"}></div>
      <Comment/>
      </div>
      </div>
    )
  }
}
