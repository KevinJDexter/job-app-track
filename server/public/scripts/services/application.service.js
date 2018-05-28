import app from '../app';

app.service('ApplicationService', ['$http', '$routeParams', '$mdDialog', '$mdToast', function($http, $routeParams, $mdDialog, $mdToast){
  console.log('Application service loaded');
  var self = this;

  self.applicationList = {list: []};

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
}])