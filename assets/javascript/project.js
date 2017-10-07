var ingredient = ["Beef", "Chicken", "Pasta", "Pork", "Salmon"];

var searchTerm = "";

var protien = ($(this).text());

var queryURL = "https://api.edamam.com/search?q=" + protien + "&app_id=94a55592&app_key=a1ecb2c12ad4a867399b5e4506013a4d";

function renderButtons() {
    for (var i = 0; i < ingredient.length; i++) {
        var a = $("<button>");
        a.addClass("food-ingredient");
        a.attr("data-name", ingredient[i]);
        a.text(ingredient[i]);
        $("#recipes").append(a);
    }
}
renderButtons();


//
function runQuery() {


     $.ajax({
         url: queryURL,
         method: "GET"
     }).done(function(response) {


        var results = response.hits



        for (var i = 0; i < results.length; i++) {
            var searchDiv = $("<div class='search-item'>");
            var input = results[i].recipe.label;
            var inputDiet = results[i].recipe.dietLabels;
            var inputHealth = results[i].recipe.healthLabels;
            var inputCalories = Math.round(results[i].recipe.calories / results[i].recipe.yield);
            var inputLink = results[i].recipe.url;


            var onep = $("<h3><p>").text(input);
            var oneSummary = $("<p>").html("<p>Diet Label: " + inputDiet + "</p>" + "<p>Health Label: " + inputHealth  + "</p>" + 
                                        "<p>Calories: " + inputCalories + "</p>" + "<span><a href='" + inputLink + "'>Get Cooking</a></span></p>" );

            var inputImage = $("<img>");
            inputImage.attr("src", results[i].recipe.image);
            inputImage.addClass("input-image");



            searchDiv.append(onep);
            searchDiv.append(inputImage);
            searchDiv.append(oneSummary);

            $("#recipes").append(searchDiv);

         };
    });
 }


$("#search").on("click", function(event) {
        event.preventDefault();

     $(".inputImage").remove();
     $(".search-item").remove();

    searchTerm = $("#cuisine").val().trim();
    console.log(searchTerm)



    queryURL = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=94a55592&app_key=a1ecb2c12ad4a867399b5e4506013a4d";

    runQuery();

});

$("#recipes").on("click", ".food-ingredient", function() {


    protien = ($(this).text());

    $(".inputImage").remove();
    $(".search-item").remove();

    queryURL = "https://api.edamam.com/search?q=" + protien + "&app_id=94a55592&app_key=a1ecb2c12ad4a867399b5e4506013a4d";

    runQuery();
});














