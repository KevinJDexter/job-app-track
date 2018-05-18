// const app = angular.module("JobTrackApp", ['ngRoute', 'ngMaterial']);
import app from '../app';

app.controller('DetailsController', ['$routeParams', function($routeParams) {
  console.log('Details controller loaded');

  var self = this;

  self.params = $routeParams.id;
}])
