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
  self.newContact = {}
  self.hideAddContact = {
    hide: true
  }

  // Gets route param to collect correct application
  self.getRouteParams = function () {
    self.routeParams.id = $routeParams.id;
  }

  // Gets the applications associated with the route id
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

  // gets the contacts associated with the application
  // saves primary contact seperate from the additional contacts
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

  // Gets the recruiter associated with the post
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

  // Toggles whether a form is editable
  self.toggleEdit = function (field) {
    if (field === "details") {
      self.disableEditFields.details = !self.disableEditFields.details;
    } else if (field === "primary") {
      self.disableEditFields.primaryContact = !self.disableEditFields.primaryContact;
    } else if (field === "additional") {
      self.disableEditFields.additionalContacts = !self.disableEditFields.additionalContacts;
    }
  }

  // Saves changes to database and toggles field back to being disabled
  self.saveEdit = function (field) {
    let data = {};
    let path = '';
    if (field === "details") {
      $http({
        method: 'PUT',
        url: `/application/${self.routeParams.id}`,
        data: self.application.details
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
    } else if (field === "primary") {
      $http({
        method: 'PUT',
        url: `application/contacts/${self.application.contacts.primary.id}`,
        data: self.application.contacts.primary
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
    } else if (field === "additional") {
      self.application.contacts.additional.forEach(contact => {
        $http({
          method: 'PUT',
          url: `application/contacts/${contact.id}`,
          data: contact
        })
          .then(function(response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
      });
    }
    self.toggleEdit (field);
  }

  // updates the followed up field. This is run when the FollowUpDate is changed
  self.updateFollowedUp = function () {
    self.application.details.followedUp = false;
  }

  self.toggleAddContact = function () {
    self.hideAddContact.hide = !self.hideAddContact.hide;
  }

  self.addContact = function () {
    self.newContact.application_id = self.routeParams.id;
    $http({
      method: 'POST',
      url: '/application/contacts',
      data: self.newContact
    })
      .then(function (response) {
        console.log(response);
        self.toggleAddContact();
        self.clearNewContact();
        self.getContacts();
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  self.clearNewContact = function () {
    self.newContact.name = '';
    self.newContact.company = '';
    self.newContact.job = '';
    self.newContact.email = '';
    self.newContact.phone = '';
    self.newContact.relation = '';
    self.newContact.notes = '';
  }

}])