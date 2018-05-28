import app from '../app';

app.service('RecruiterService', ['$http', '$routeParams', '$mdToast', '$mdDialog', function ($http, $routeParams, $mdToast, $mdDialog) {
  console.log('Recruiter Service loaded');

  var self = this;

  self.routeParams = { id: '' };
  self.recruiter = {};
  self.jobs = { list: [] };
  self.recruiterEdit = { disabled: true };

  self.getRouteParams = function () {
    self.routeParams.id = $routeParams.id;
  }

  self.getRecruiterInfo = function () {
    $http({
      method: 'GET',
      url: `/recruiter/${self.routeParams.id}`
    })
      .then(function (response) {
        self.recruiter.info = response.data[0];
      })
      .catch(function (error) {
        console.log('Error in GET /recruiter/id', error);
      })
  }

  self.getApplications = function () {
    $http({
      method: 'GET',
      url: `/application/recruiter/${self.routeParams.id}`
    })
      .then(function (response) {
        self.jobs.list = response.data;
      })
      .catch(function (error) {
        console.log('Error in GET /applicaion/recruiter/id', error);
      })
  }

  self.toggleEdit = function () {
    self.recruiterEdit.disabled = !self.recruiterEdit.disabled;
  }

  self.saveEdit = function () {
    $http({
      method: 'PUT',
      url: `/recruiter/${self.routeParams.id}`,
      data: self.recruiter.info
    })
      .then(function (response) {
        console.log(response);
        self.toggleEdit();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

}])