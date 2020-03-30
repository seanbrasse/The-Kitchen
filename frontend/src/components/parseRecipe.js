
export function parseRecipe(data){
  var len = 0;
  var index = 0;
  var array;
  var i;
  var recipe = new Object();

  data = data.split('\0');

  //title
  recipe.title = data[index++];
  //description
  recipe.description = data[index++];

  //ingredients
  len = data[index++];
  array = [[], [], []];
  for(i = 0; i < len; i++){
    array[0][i] = data[index++];
  }
  for(i = 0; i < len; i++){
    array[1][i] = data[index++];
  }
  for(i = 0; i < len; i++){
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
