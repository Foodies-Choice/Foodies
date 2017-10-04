
  script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
  script type="text/javascript"

var category = $("")
var location = $("#location").val.trim();

  	$("#submit").on(click,function(){ 
  var queryURL = "https://developers.zomato.com/api/v2.1/location?query=" + location + "&apikey=0ddbf041422a995ae2524fc0caca1ab8"

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
       
  		
  		}).done(function(response) {
        console.log(response);
      });


  	})



