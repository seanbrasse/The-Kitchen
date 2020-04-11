
export function parseRecipe(data){
  var len = 0;
  var index = 0;
  var array;
  var i;
  var recipe = {};

  data = data.split('\0');

  if(data[index]){
    //titleID
    recipe.titleID = data[index++];

    //messageID
    recipe.messageID = data[index++];

    //title
    recipe.title = data[index++];

    //description
    recipe.description = data[index++];

    //ingredients
    len = data[index++];
    array = [];
    for(i = 0; i < len; i++){//ingredientIDs
      array[i] = data[index++];
    }
    recipe.ingredientIDs = array;

    array = [[], [], []];
    for(i = 0; i < len; i++){//ingredient
      array[0][i] = data[index++];
    }
    for(i = 0; i < len; i++){//Amount
      array[1][i] = data[index++];
    }
    for(i = 0; i < len; i++){//Units
      array[2][i] = data[index++];
    }
    recipe.ingredients = array;

    //recipe
    len = data[index++];
    array = [[], []];
    for(i = 0; i < len; i++){
      array[0][i] = data[index++];
    }
    for(i = 0; i < len; i++){
      array[1][i] = data[index++];
    }
    recipe.recipe = array;

    return recipe;

  }else{
    //titleID
    recipe.titleID = 0;

    //title
    recipe.title = data[index++];

    //description
    recipe.description = data[index++];

    //ingredients
    len = data[index++];
    array = [];
    for(i = 0; i < len; i++){//ingredientIDs
      array[i] = 0;
    }
    recipe.ingredientIDs = array;

    array = [[], [], []];
    for(i = 0; i < len; i++){//ingredient
      array[0][i] = data[index++];
    }
    for(i = 0; i < len; i++){//Amount
      array[1][i] = data[index++];
    }
    for(i = 0; i < len; i++){//Units
      array[2][i] = data[index++];
    }
    recipe.ingredients = array;

    //recipe
    len = data[index++];
    array = [[], []];
    for(i = 0; i < len; i++){
      array[0][i] = data[index++];
    }
    for(i = 0; i < len; i++){
      array[1][i] = data[index++];
    }
    recipe.recipe = array;

    return recipe;
  }
}
