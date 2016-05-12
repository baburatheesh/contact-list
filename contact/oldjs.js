'use strict';

angular.module('myContact.contact', ['ngRoute','firebase','angular-cloudinary'])

.config(['$routeProvider', 'cloudinaryProvider', function($routeProvider,cloudinaryProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'contact/contact.html',
    controller: 'ContactCtrl'
  });
  cloudinaryProvider.config({
    upload_endpoint: 'https://api.cloudinary.com/v1_1/', // default
    cloud_name: 'babu7nodes' // required

  });
}])


//contacts controller
.controller('ContactCtrl', ['$scope', '$firebaseArray', 'cloudinary',  function($scope, $firebaseArray, cloudinary) {
	
	//init firbase database
	var ref = new Firebase("https://contact2016.firebaseio.com/contacts");
	$scope.contacts = $firebaseArray(ref);
	// console.log($scope.contacts);
	//show add form
	$scope.showAddForm = function(){
		$scope.addFormShow = true;
	}

	// edit form 

	$scope.editFormShow = function(contact){
		$scope.ShoweditForm  = true;
		$scope.id = contact.$id;
		$scope.name = contact.name;
		$scope.company = contact.company;
		$scope.email = contact.email;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.home_phone = contact.phones[0].home;
		$scope.work_phone = contact.phones[0].work;
		$scope.street = contact.address[0].street;
		$scope.city = contact.address[0].city;
		$scope.state = contact.address[0].state;
		$scope.zip_code = contact.address[0].zip;
	}

	//hide add form
	$scope.hide = function(){
		$scope.addFormShow = false;
		$scope.contactShow= false;
		// $scope.ShoweditForm = false;
	}
	//form submit 
	  $scope.$watch('myFile', function(myFile) {
    // Use the service to upload the file
    cloudinary.upload(myFile, { 
    	  public_id: 'thOvQubTY7CDDuQiymoViSoOGIg',
    })
    // This returns a promise that can be used for result handling
    // .then(function (resp)) {
    //   alert('all done!');
    // };
  })
	$scope.addFormSubmit = function(){
		console.log('Form Adding');

		// // adding values
		if($scope.name) { var name = $scope.name } else { var name = null; }
		if($scope.company) { var company = $scope.company} else { var company = null; }
		if($scope.email) { var email = $scope.email} else { var email = null; } 
		if($scope.image) { var image = $scope.image } else { var image = null; }
		if($scope.mobile_phone) { var mobile_phone = $scope.mobile_phone} else { var mobile_phone = null; } 
		if($scope.home_phone) { var home_phone = $scope.home_phone} else { var home_phone = null; }
		if($scope.work_phone) { var work_phone = $scope.work_phone } else { var work_phone = null; }
		if($scope.street) { var street = $scope.street} else { var street = null; }
		if($scope.city) { var city = $scope.city} else { var city = null; } 
		if($scope.state) { var state = $scope.state} else { var state = null; } 
		if($scope.zip_code) { var zip_code = $scope.zip_code} else { var zip_code = null; }
		$scope.contacts.$add({
			name : name,
			company : company,
			email : email,
			image : image,
			phones : [
				{	mobile : mobile_phone,
					home : home_phone,
					work : work_phone					
				}
			],
			address : [
				{
					street : street,
					city : city,
					state : state,
					zip :zip_code
				}
			]
		}).then (function(ref){
			var id = ref.key();
			console.log('Database Adding...'+id);

			//clear forms
			clearFields();

			// hide form

			$scope.addFormShow = false;

			// send message 

			$scope.msg = "Contact Added";
		});
	}

	$scope.editFormSubmit = function  () {
		console.log('Form Editing');

		// getting id 

		var id = $scope.id;

		// getting record

		var record = $scope.contacts.$getRecord(id);

		// assign value

		record.name 	= $scope.name;
		record.company = $scope.company;
		record.email = $scope.email;
		record.phones[0].mobile = $scope.mobile_phone;
		record.phones[0].home = $scope.home_phone;
		record.phones[0].work = $scope.work_phone;
		record.address[0].street = $scope.street;
		record.address[0].city = $scope.city;
		record.address[0].state = $scope.state;
		record.address[0].zip = $scope.zip_code;
		$scope.contacts.$save(record).then (function(ref){
			console.log(ref.key);
		});

		clearFields();

		// hide the edit form

		$scope.ShoweditForm = false;
		$scope.msg = "Contact Updated";

	}
	
	$scope.ShowContact = function(contact){
		console.log('Form show');
		$scope.name = contact.name;
		$scope.company = contact.company;
		$scope.email = contact.email;
		$scope.image = contact.image;
		$scope.mobile_phone = contact.phones[0].mobile;
		$scope.home_phone = contact.phones[0].home;
		$scope.work_phone = contact.phones[0].work;
		$scope.street = contact.address[0].street;

		$scope.contactShow = true;

	}

	// remove or delete contact or database content 

	$scope.removeContact = function(contact){
		console.log('Contact Removed');
		$scope.contacts.$remove(contact);
		$scope.msg = "contact succesfully removed";
	}
	// clearing fields after submit

	function clearFields(){
		console.log('clearFields...');
		$scope.name = '';
		$scope.email = '';
		$scope.image = '';
		$scope.mobile_phone = '';
		$scope.home_phone = '';
		$scope.work_phone = '';
		$scope.street = '';
		$scope.city = '';
		$scope.state = '';
		$scope.zip_code = '';



	}

}]);
