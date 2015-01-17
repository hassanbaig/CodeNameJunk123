var app = angular.module('app', []);

app.directive('LoginHeader', function () {
    return {
        restrict: 'E',
        template: '<header class="row">' +
            '<div class="navbar navbar-default navbar-fixed-top">'+
                '<div class="container">'+
                    '<div class="navbar-header">'+
                        '<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'+
                            '<span class="icon-bar"></span>'+
                            '<span class="icon-bar"></span>'+
                            '<span class="icon-bar"></span>'+
                        '</button>'+
                        '<a class="navbar-brand" href="#" s><b>JunkCar</b></a>'+
                    '</div>'+
                    '<div class="navbar-collapse collapse">'+
                        '<ul class="nav navbar-nav navbar-right">'+
                            '<li><a href="#"><span></span>  Are you a Doctor?</a></li>'+
                            '<li><a href="#"><span class="glyphicon glyphicon-list"> </span>Get Listed Free</a></li>'+
                        '</ul>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</header>'
        }
    }
);