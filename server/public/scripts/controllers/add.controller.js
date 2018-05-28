import app from '../app';
import '../services/application.service';

app.controller('AddController', ['ApplicationService', function(ApplicationService) {
  console.log('Add controller loaded');

  var self = this;
}])