import app from '../app';

app.service('DetailsService', ['$http', '$routeParams', function ($http, $routeParams) {
  console.log('Details service loaded');

  var self = this;

  self.routeParams = { id: '' };
  self.application = {
    details: {},
    contacts: {
      primary: {},
      additional: []
    },
    recruiter: {}
  };
  self.disableEditFields = { 
    details: true,
    primaryContact: true,
    additionalContacts: true,
  };

  self.getRouteParams = function () {
    self.routeParams.id = $routeParams.id;
  }

  self.getApplication = function () {
    $http({
      method: 'GET',
      url: `/application/details/${self.routeParams.id}`
    })
      .then(function (response) {
        self.application.details = response.data[0];
      })
      .catch(function (error) {
        console.log('Error in GET /application/details/id', error);
      })
  }

  self.getContacts = function () {
    $http({
      method: 'GET',
      url: `/application/contacts/${self.routeParams.id}`
    })
      .then(function (response) {
        let primaryContact = response.data.filter(contact => contact.isPrimary == true);
        let additionalContacts = response.data.filter(contact => contact.isPrimary != true);
        self.application.contacts.primary = primaryContact[0];
        self.application.contacts.additional = additionalContacts;
      })
      .catch(function (error) {
        console.log('Error in GET /application/contacts/id', error);
      })
  }

  self.getRecruiter = function () {
    $http({
      method: 'GET',
      url: `/application/recruiter/${self.routeParams.id}`
    })
      .then(function (response) {
        self.application.recruiter = response.data[0];
      })
      .catch(function (error) {
        console.log('Error in GET /application/recruiter/id', error);
      })
  }

}])