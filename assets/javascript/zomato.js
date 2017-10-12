$(document).ready(function() {
    var cities = "";
    var id = "";
    var effects = ["rotateInDownLeft", "rotateInDownRight", "slideInRight", "slideInLeft", "jackInTheBox", "rollIn", "zoomIn", "slideInDown", "lightSpeedIn", "tada", "rotateInDownLeft", "rotateInDownRight", "slideInRight", "slideInLeft", "jackInTheBox"]


    $("#search").on("click", function() {

        event.preventDefault();

        $(".food").remove();
        $(".food2").remove();


        var city = $("#location").val().trim();
        var typeFood = $("#cuisine").val().trim();
        var queryURL =
            "https://developers.zomato.com/api/v2.1/locations?query=" +
            city + "&apikey=0ddbf041422a995ae2524fc0caca1ab8";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).done(function(response) {
            var results = response.location_suggestions;
            console.log(response);

            function createArrays() {
                for (var i = 0; i < 1; i++) {
                    cities = results[i].city_name;
                    id = results[i].entity_id;
                    console.log(cities);
                    console.log(id);


                    // $('#restaurants').append('<a href=# class="links" cityID="' + results[i].id + '"><br>' + results[i].name + '</a>');

                };
            };
            createArrays();

            // $('.links').on("click", function() {
            //     var ID = $(this).attr('cityid');


            var secondQueryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" +
                id + "&entity_type=city&q=" + typeFood + "&apikey=0ddbf041422a995ae2524fc0caca1ab8";
console.log(secondQueryURL);
            $.ajax({
                url: secondQueryURL,
                method: "GET"

            }).done(function(response) {
                // $('.links').remove();
                // console.log(response);
                var restResults = response.restaurants;
                // console.log(restResults)

                for (var i = 0; i < 15; i++) {;

                    var restDiv = $("<div class='row food2 wow " + effects[i] + "'>");
                    var name = $("<H3 id=>").text(restResults[i].restaurant.name);
                    var avgCost = $("<p>").text("Average Cost for Two: " + restResults[i].restaurant.average_cost_for_two);
                    var expense = $("<p>").text("Cost on a scale from 1-4: " + restResults[i].restaurant.price_range);
                    var menu = $('<a href="' + restResults[i].restaurant.menu_url + '"target="_blank">' + "Menu" + '</a>');
                    var inputImage = $("<img>");
            inputImage.attr("src", restResults[i].restaurant.featured_image);
            inputImage.addClass("col-sm-5 input-image img-thumbnail");
                    restDiv.append(name);
                    restDiv.append(inputImage);
                    restDiv.append(avgCost);
                    restDiv.append(expense);
                    restDiv.append(menu);

                    $("#restaurants").append(restDiv);

                };

            });
            console.log()
            cities = "";
            id = "";
            $('#cuisine').val("");
            $("#location").val("");

            // });
        });
    });
})