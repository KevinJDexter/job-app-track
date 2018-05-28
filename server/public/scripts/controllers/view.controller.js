import app from '../app';
import '../services/application.service';

app.controller('ViewController', ['ApplicationService', function(ApplicationService) {
  console.log('View controller loaded');
  
  var self = this;

  self.applicationList = ApplicationService.applicationList;

  self.getApplications = ApplicationService.getApplications;
  self.followUp = ApplicationService.followUp;

  self.init = function () {
    self.getApplications();
  }

  self.init();

}])