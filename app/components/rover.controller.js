    (function() {
        "use strict";

        angular
            .module('app')
            .controller('RoverCtrl', ['RoverService', roverController]);

        function roverController(roverService) {

            let vm = this;

            vm.rover = {};
            vm.click = clickHandler;
            vm.loadCameras = populateCameraList;
            vm.date = getDate(moment().subtract(1, "day"));
            vm.noImages = false;
            vm.loading = false;


            function getDate(dateString) {
                let date = moment();
                let day = moment(dateString).format("DD");
                let month = moment(dateString).format("MM");
                let year = moment(dateString).format("YYYY");

                date = year + '-' + month + '-' + day;
                return date;
            }

            function populateCameraList() {
                roverService.queryCameras().then(cameraResponse, errorHandler);
            }

            function cameraResponse(result) {
                debugger;
            }



            function clickHandler() {
                vm.loading = true;
                roverService.queryRoverData(vm.date, vm.camera).then(successfulResponse, errorHandler);
            }

            function successfulResponse(result) {
                vm.loading = false;
                vm.noImages = false;

                let response = result.data.photos;
                vm.data = mapRoverPhotos(response);

                vm.roverName = response[0].rover.name;
                vm.martianSol = response[0].sol;
                vm.earthDate = response[0].earth_date;
                vm.totalPhotos = response[0].rover.total_photos;
                vm.landingDate = response[0].rover.landing_date;
                vm.launchDate = response[0].rover.launch_date;
                vm.status = response[0].rover.status;
            }

            function errorHandler(error) {
                vm.noImages = true;
                console.log(error);
            }

            function mapRoverPhotos(photos) {
                return _.map(photos, function(photo){
                    return {
                        name: photo.camera.full_name,
                        abbreviation: photo.camera.name,
                        img: photo.img_src
                    }
                });
            }
        }
    })();