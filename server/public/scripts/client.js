// Import angular
import angular from 'angular';
import 'angular-route';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'angular-messages';
import '../styles/angular-material.min.css';
import '../styles/style.css';
import './controllers/details.controller';
import './controllers/view.controller';
import './controllers/add.controller';

// const app = angular.module("JobTrackApp", ['ngRoute', 'ngMaterial']);
import app from './app';


app.config(['$routeProvider', function( $routeProvider ) {
  $routeProvider.when('/', {
    templateUrl: 'views/add.html',
    controller: 'AddController as vm'
  })
  .when('/view', {
    templateUrl: 'views/view.html',
    controller: 'ViewController as vm'
  })
  .when('/details/:id', {
    templateUrl: 'views/details.html',
    controller: 'DetailsController as vm'
  })
  .otherwise({
    template: '404'
  })
}])
