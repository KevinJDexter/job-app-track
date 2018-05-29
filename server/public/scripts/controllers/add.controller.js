import app from '../app';
import '../services/add.service';
import '../services/application.service';

app.controller('AddController', ['AddService', 'ApplicationService', function(AddService, ApplicationService) {
  console.log('Add controller loaded');

  var self = this;

  self.newApplication = AddService.newApplication;
  self.recruiters = ApplicationService.recruiters;
  self.primaryContact = AddService.primaryContact;
  self.additionalContacts = AddService.additionalContacts;
  self.newContact = AddService.newContact;

  self.getRecruiters = ApplicationService.getRecruiters;
  self.submitApplication = AddService.submitApplication;
  self.initializeForm = AddService.resetForm;
  self.addContact = AddService.addContact;
  self.removeContact = AddService.removeContact;

  self.init = function () {
    self.getRecruiters();
    self.initializeForm();
  }

  self.init();
}])