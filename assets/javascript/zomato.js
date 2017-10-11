$(document).ready(function() {
    var cities = [];

    $("#search").on("click", function() {
        var city = $("#location").val().trim();
        var typeFood = $("#cuisine").val().trim();
        var queryURL =
            "https://developers.zomato.com/api/v2.1/cities?q=" +
            city + "&apikey=0ddbf041422a995ae2524fc0caca1ab8";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).done(function(response) {
            var results = response.location_suggestions;
            console.log(response);

            function createArrays() {
                for (var i = 0; i < results.length; i++) {
                    cities.push(results[i].name);

                    $('#restaurants').append('<a href=# class="links" cityID="' + results[i].id + '"><br>' + results[i].name + '</a>');

                };
            };
            createArrays();

            $('.links').on("click", function() {
                var ID = $(this).attr('cityid');


                var secondQueryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" +
                    ID + "&entity_type=cityq=" + typeFood + "&apikey=0ddbf041422a995ae2524fc0caca1ab8";

                $.ajax({
                    url: secondQueryURL,
                    method: "GET"

                }).done(function(response) {
                    $('.links').remove();
                    console.log(response);
                    var restResults = response.restaurants;
                    console.log(restResults)

                    for (var i = 0; i < restResults.length; i++) {;
                       
                        var restDiv = $("<div><br>");
                        var name = $("<p id=>").text("Restaurant: " + restResults[i].restaurant.name);
                        var avgCost = $("<p>").text("Average Cost for Two: " + restResults[i].restaurant.average_cost_for_two);
                        var expense = $("<p>").text("Cost: " + restResults[i].restaurant.currency);
                        var menu = $('<a href="' + restResults[i].restaurant.menu_url + '"target="_blank">' + "Menu" + '</a>');
                        restDiv.append(name);
                        restDiv.append(avgCost);
                        restDiv.append(expense);
                        restDiv.append(menu);

                        $("#restaurants").append(restDiv);

                    };

                });



            });
        });
    });
})