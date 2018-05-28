import app from '../app';
import '../services/application.service';
import '../services/details.service'

app.controller('DetailsController', ['DetailsService', function(DetailsService) {
  console.log('Details controller loaded');

  var self = this;

  self.routeParams = DetailsService.routeParams;
  self.application = DetailsService.application;
  self.disableEditFields = DetailsService.disableEditFields;
  self.newContact = DetailsService.newContact;
  self.hideAddContact = DetailsService.hideAddContact;

  self.getRouteParams = DetailsService.getRouteParams;
  self.getApplication = DetailsService.getApplication;
  self.getContacts = DetailsService.getContacts;
  self.getRecruiter = DetailsService.getRecruiter;

  self.toggleEdit = DetailsService.toggleEdit;
  self.saveEdit = DetailsService.saveEdit;

  self.updateFollowedUp = DetailsService.updateFollowedUp;
  self.toggleAddContact = DetailsService.toggleAddContact;
  self.addContact = DetailsService.addContact;

  self.init = function () {
    self.getRouteParams();
    self.getApplication();
    self.getContacts();
    self.getRecruiter();
  }

  self.init();
}])
