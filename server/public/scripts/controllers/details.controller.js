import app from '../app';
import '../services/application.service';
import '../services/details.service'

app.controller('DetailsController', ['DetailsService', function(DetailsService) {
  console.log('Details controller loaded');

  var self = this;

  self.routeParams = DetailsService.routeParams;
  self.application = DetailsService.application;
  self.disableEditFields = DetailsService.disableEditFields;

  self.getRouteParams = DetailsService.getRouteParams;
  self.getApplication = DetailsService.getApplication;
  self.getContacts = DetailsService.getContacts;
  self.getRecruiter = DetailsService.getRecruiter;

  self.init = function () {
    self.getRouteParams();
    self.getApplication();
    self.getContacts();
    self.getRecruiter();
  }

  self.init();
}])
