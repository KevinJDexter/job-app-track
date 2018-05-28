import app from '../app';
import '../services/recruiter.service';

app.controller('RecruiterDetailsController', ['RecruiterService', function (RecruiterService) {

  var self = this;

  self.routeParams = RecruiterService.routeParams;
  self.jobs = RecruiterService.jobs;
  self.recruiter = RecruiterService.recruiter
  self.recruiterEdit = RecruiterService.recruiterEdit;

  self.getRouteParams = RecruiterService.getRouteParams;
  self.getRecruiterInfo = RecruiterService.getRecruiterInfo;
  self.getApplications = RecruiterService.getApplications;

  self.toggleEdit = RecruiterService.toggleEdit;
  self.saveEdit = RecruiterService.saveEdit;

  self.init = function () {
    self.getRouteParams();
    self.getRecruiterInfo();
    self.getApplications();
  }

  self.init();
}])