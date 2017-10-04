var ingredient = ["Beef", "Chicken", "Pasta", "Pork", "Salmon"];

function renderButtons() {
	for (var i = 0; i < ingredient.length; i++) {
		var a = $("<button>");
		a.addClass("food-ingredient");
		a.attr("data-name", ingredient[i]);
		a.text(ingredient[i]);
		$("#food-button").append(a);
	}
}
renderButtons();

$("#food-button").on("click", ".food-ingredient", function() {
	
	for (var i = 0; i <ingredient.length; i++) {
	var queryURL = "https://api.edamam.com/search?q=" + ingredient[i] + "&app_id=94a55592&app_key=a1ecb2c12ad4a867399b5e4506013a4d";
}
	
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		
		var results = response.hits;

		
		for (var i = 0; i < results.length; i++) {
			var ingredientDiv = $("<div class='ingredient-Item'>");
			var recipe = results[i].recipe.label;
			var diet = results[i].recipe.dietLabels;
			var health = results[i].recipe.healthLabels;
			var calories = results[i].recipe.calories;


			var p = $("<h3><p>").text(recipe);
			var summary = $("<p>").html("<p>Diet Label - " + diet + "</p>" +  "<p>Health Label - " + health + "</p>" + "<p>Calories - " + calories + "</p>");

			var recipeImage = $("<img>");
			recipeImage.attr("src", results[i].recipe.image);
			recipeImage.addClass("recipe-image");



			ingredientDiv.append(p);
			ingredientDiv.append(recipeImage);
			ingredientDiv.append(summary);

			$("#recipe-display").append(ingredientDiv);
		};

	});
})