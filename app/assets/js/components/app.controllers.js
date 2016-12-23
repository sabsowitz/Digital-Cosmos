// explore controller
CosmosApp.controller('ExploreController', function($scope, $http) {

  // load particles JSON
  particlesJS.load('particles-js', 'app/assets/particles.json', function() {
      console.log('callback - particles.js config loaded');
  });

  // api call for nasa apod
  let url = "https://api.nasa.gov/planetary/apod?";
  let key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

  $.ajax({
      url: url + key,
      success: handleResult
  });

  function handleResult(result) {
      if ("copyright" in result) {
          $("#copyright").text("Image Credits: " + result.copyright);
      } else {
          $("#copyright").text("Image Credits: " + "Public Domain");
      }
      if (result.media_type == "video") {
          $("#apod_img_id").css("display", "none");
          $("#apod_vid_id").attr("src", result.url);
      } else {
          $("#apod_vid_id").css("display", "none");
          $("#apod_img_id").attr("src", result.url);
      }
      $("#reqObject").text(url);
      $("#returnObject").text(JSON.stringify(result, null, 4));
      $("#explaination").text(result.explanation);
      $("#title").text(result.title);
  }
});

CosmosApp.controller('MarsController', function($scope, $http) {

    // get date
    let today = new Date();
    let dd = today.getDate()-1;
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = yyyy+ '-' +mm+ '-' +dd;

    // set variables
    $scope.baseUrl = "https://api.nasa.gov/mars-photos/api/v1/rovers/";
    $scope.curiosity_rover = ["Curiosity"];
    $scope.opportunity_rover = ["Opportunity"];
    $scope.date_params = "/photos?earth_date=" + today;
    $scope.searchParams = $scope.rover + $scope.date_params;
    $scope.key = "&api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";

    // request for curiosity
    $http.get($scope.baseUrl + $scope.searchParams +  $scope.key)
        .success(function(result) {
            $scope.photos = result.photos;
            console.log($scope.photos);
        })
        .error(function(error){
            console.log(error);
        });
});

// art controller
CosmosApp.controller('artController', function($scope) {
  $scope.message = 'Original Artwork';
  $scope.slides = [{
      image: 'app/assets/images/Om.jpg',
      description: 'Om'
  }, {
      image: 'app/assets/images/atalanta.jpg',
      description: 'Atalanta'
  }, {
      image: 'app/assets/images/founders.jpg',
      description: 'Founders'
  }];

  $scope.currentIndex = 0;
  $scope.setCurrentSlideIndex = function(index) {
      $scope.currentIndex = index;
  };

  $scope.isCurrentSlideIndex = function(index) {
      return $scope.currentIndex === index;
  };

  $scope.prevSlide = function() {
      $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
  };

  $scope.nextSlide = function() {
      $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
  };
});