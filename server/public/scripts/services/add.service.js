import app from '../app';

app.service('AddService', ['$http', function($http) {
  console.log('Add service connected');

  var self = this;

  self.newApplication = {recruiter_id: 1};
  self.primaryContact = {isPrimary: true};
  self.additionalContacts = {list: []};
  self.newContact = {};

  self.addContact = function () {
    self.additionalContacts.list.push({...self.newContact});
    self.clearNewContact();
  }

  self.removeContact = function (contactToRemove) {
    self.additionalContacts.list = self.additionalContacts.list.filter(contact => contact !== contactToRemove);
  }

  self.submitApplication = function () {
    self.primaryContact.company = self.newApplication.company;
    $http({
      method: 'POST',
      url: '/application',
      data: self.newApplication
    })
      .then(function (response) {
        console.log(response);
        self.getLatestApplicationId();
      })
      .catch(function (error) {
        console.log('Error in POST /application', error);
      })
  }

  self.getLatestApplicationId = function () {
    $http({
      method: 'GET',
      url: '/application/latest'
    })
      .then(function (response) {
        self.setContactApplicationIdAndSubmit(response.data[0].id);
      })
      .catch(function (error) {
        console.log('Error in GET /application/latest', error);
      })
  }

  self.setContactApplicationIdAndSubmit = function (id) {
    self.primaryContact.application_id = id;
    const allContacts = [{...self.primaryContact}, ...self.additionalContacts.list];
    allContacts.forEach(contact => {
      contact.application_id = id;
      self.httpPostContact(contact);
    });
    self.resetForm();
  }

  self.httpPostContact = function (contact) {
    $http({
      method: 'POST',
      url: '/contact',
      data: contact
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log('Error in POST /contact', error);
      })
  }

  self.resetForm = function () {
    self.clearNewApplication();
    self.clearNewContact();
    self.clearPrimaryContact();
    self.additionalContacts.list = [];
  }

  self.clearNewContact = function () {
    self.newContact.name = '';
    self.newContact.company = '';
    self.newContact.job = '';
    self.newContact.relation = '';
    self.newContact.email = '';
    self.newContact.phone = '';
    self.newContact.notes = '';
    self.newContact.isPrimary = false;
  }

  self.clearNewApplication = function () {
    self.newApplication.jobTitle = '';
    self.newApplication.jobId = '';
    self.newApplication.jobDescription = '';
    self.newApplication.date = '';
    self.newApplication.followUpDate = '';
    self.newApplication.recruiter_id = 1;
    self.newApplication.company = '';
    self.newApplication.companyUrl = '';
    self.newApplication.resume = '';
    self.newApplication.coverLetter = '';
    self.newApplication.notes = '';
  }

  self.clearPrimaryContact = function () {
    self.primaryContact.name = '';
    self.primaryContact.company = '';
    self.primaryContact.job = '';
    self.primaryContact.relation = '';
    self.primaryContact.email = '';
    self.primaryContact.phone = '';
    self.primaryContact.notes = '';
    self.primaryContact.isPrimary = true;

  }


}])