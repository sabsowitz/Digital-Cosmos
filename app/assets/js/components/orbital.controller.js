(function() {
    "use strict";

    angular
        .module('app')
        .controller('OrbitalController',

            function($http) {

                const key = "api_key=NeHYhGtJMXT1kJ9jSP8bnRF2t1IpYShALfGkSKoz";
                const url = "https://api.nasa.gov/neo/rest/v1/";

                let vm = this;

                vm.retrieveOrbitalData = retrieveOrbitalData;

                function getDate() {

                    let date = new Date();
                    let day = date.getDate();
                    let month = date.getMonth() + 1;
                    let year = date.getFullYear();

                    if (day < 10) {
                        day = '0' + day;
                    }
                    if (month < 10) {
                        month = '0' + month;
                    }

                    date = year + '-' + month + '-' + day;
                    return date;
                }

                function retrieveOrbitalData() {

                    let date = getDate();
                    let query = "feed?start_date=";

                    $http.get(url + query + date + "&" + key)
                        .then(function(data) {

                            let response = data["near_earth_objects"][date];
                            debugger;
                            vm.data = mapOrbitals(response);
                            vm.count = data["element_count"];

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            });

    function mapOrbitals(data) {
        return _.map(data, function(orbital) {
            return {
                name: orbital.name,
                magnitude: orbital.absolute_magnitude_h,
                diameterMin: orbital.estimated_diameter.kilometers.estimated_diameter_min,
                diameterMax: orbital.estimated_diameter.kilometers.estimated_diameter_max,
                hazardous: orbital.is_potentially_hazardous_asteroid,
                orbitingBody: orbital.close_approach_data[0].orbiting_body,
                approachDate: orbital.close_approach_data[0].close_approach_date,
                distance: orbital.close_approach_data[0].miss_distance.kilometers
            }
        });
    }
})();