import app from '../app';

app.service('ApplicationService', ['$http', '$routeParams', '$mdDialog', '$mdToast', function($http, $routeParams, $mdDialog, $mdToast){
  console.log('Application service loaded');
  var self = this;

  self.applicationList = {list: []};
  self.recruiters = {list: []};
  self.newRecruiter = {};

  self.getApplications = function () {
    $http({
      method: 'GET',
      url: '/application/view'
    })
      .then(function(response) {
        self.applicationList.list = response.data;
        $mdToast.show(
          $mdToast.simple()
            .textContent('TOASTY')
        )
      })
      .catch(function(error) {
        console.log('Error in GET /application:', error);
      })
  }

  self.getRecruiters = function () {
    $http({
      method: 'GET',
      url: '/recruiter'
    })
      .then(function(response) {
        self.recruiters.list = response.data;
      })
      .catch(function(error) {
        console.log('Error in GET /recruiter:', error);
      })
  }

  self.followUp = function (id) {
    $http({
      method: 'PUT',
      url: `/application/followUp/${id}`,
      data: {followedUp: true}
    })
      .then(function () {
        self.getApplications();
      })
      .catch(function(error) {
        console.log('Error in PUT /application/followUp/id', error)
      })
  }

  self.addRecruiter = function () {
    $http({
      method: 'POST',
      url: '/recruiter',
      data: self.newRecruiter
    })
      .then(function () {
        self.getRecruiters();
        self.clearNewRecruiter();
      })
      .catch(function(error) {
        console.log('Error in POST /rectuiter:', error);
      })
  }

  self.clearNewRecruiter = function () {
    self.newRecruiter.name = '';
    self.newRecruiter.company = '';
    self.newRecruiter.email = '';
    self.newRecruiter.phone = '';
  }
}])