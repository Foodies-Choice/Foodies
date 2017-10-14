$(document).ready(function() {
    var cities = "";
    var id = "";
    var effects = ["rotateInDownLeft", "rotateInDownRight", "slideInRight", "slideInLeft", "jackInTheBox", "rollIn", "zoomIn", "slideInDown", "lightSpeedIn", "tada", "rotateInDownLeft", "rotateInDownRight", "slideInRight", "slideInLeft", "jackInTheBox"]

    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
 
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];



    $("#search").on("click", function() {

        event.preventDefault();

        $(".food").remove();
        $(".food2").remove();

        var city = $("#location").val().trim();
        var typeFood = $("#cuisine").val().trim();
        var queryURL =
            "https://developers.zomato.com/api/v2.1/locations?query=" +
            city + "&apikey=0ddbf041422a995ae2524fc0caca1ab8";



        if (($.isNumeric($("#location").val()) === true) || ($.isNumeric($("#cuisine").val()) === true) || city === "" || typeFood === "" ) {

        
                modal.style.display = "block";
          

            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }



        } else {





            $.ajax({
                url: queryURL,
                method: "GET"

            }).done(function(response) {
                var results = response.location_suggestions;

                var secondQueryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=" +
                    id + "&entity_type=city&q=" + typeFood + "&apikey=0ddbf041422a995ae2524fc0caca1ab8";

                $.ajax({
                    url: secondQueryURL,
                    method: "GET"

                }).done(function(response) {

                    var restResults = response.restaurants;

                    for (var i = 0; i < 15; i++) {
                           
                        var restDiv = $("<div class='row food2 wow " + effects[i] + "'>");
                        var name = $("<H3 id=>").text(restResults[i].restaurant.name);
                        var rating = $("<p>").text("Rating: " + restResults[i].restaurant.user_rating.rating_text + " " + restResults[i].restaurant.user_rating.aggregate_rating);
                        var avgCost = $("<p>").text("Average Cost for Two: $" + restResults[i].restaurant.average_cost_for_two);
                        var expense = $("<p>").text("Cost on a scale from 1-4: " + restResults[i].restaurant.price_range);
                        var address = $("<p>").text(restResults[i].restaurant.location.address);
                        var menu = $('<a href="' + restResults[i].restaurant.menu_url + '"target="_blank">' + "Menu" + '</a>');
                        var inputImage = $("<img>");
                        inputImage.attr("src", restResults[i].restaurant.featured_image || "assets/images/restaurant.jpg");
                        inputImage.addClass("col-sm-5 input-image img-thumbnail");
                        restDiv.append(name);
                        restDiv.append(inputImage);
                        restDiv.append(rating);
                        restDiv.append(avgCost);
                        restDiv.append(expense);
                        restDiv.append(address);
                        restDiv.append(menu);

                        $("#restaurants").append(restDiv);

                    };

                });

                cities = "";
                id = "";
                $('#cuisine').val("");
                $("#location").val("");

            });
        };
    });

})