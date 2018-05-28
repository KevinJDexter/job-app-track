import app from '../app';
import '../services/application.service';

app.controller('RecruiterController', ['ApplicationService', function(ApplicationService) {

  var self = this;

  self.recruiters = ApplicationService.recruiters;
  self.newRecruiter = ApplicationService.newRecruiter;
  
  self.getRecruiters = ApplicationService.getRecruiters;
  self.addRecruiter = ApplicationService.addRecruiter;

  self.init = function () {
    self.getRecruiters();
  }

  self.init();
}])