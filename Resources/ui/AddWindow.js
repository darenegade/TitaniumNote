Ti.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
Titanium.Geolocation.PROVIDER_PASSIVE = Titanium.Geolocation.ACCURACY_LOW;
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;
var platform = Ti.Platform.osname;

exports.AddWindow = function() {

	var db = require('db');
	var self = Ti.UI.createWindow({
		modal: true,
		title: 'Add Item',
		backgroundColor: '#fff'
	});
	var itemField = Ti.UI.createTextField({
		width: '300dp',
		height: '45dp',
		top: '20dp',
		color: '#000',
		hintText: 'New Item',
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		returnKeyType: Ti.UI.RETURNKEY_DONE
	});
	itemField.addEventListener('return', function(e) {
		addTask(itemField.value, self);
	});

	var addButton = Ti.UI.createButton({
		title: 'Add',
		width: '300dp',
		height: '40dp',
		top: '80dp'
	});
	addButton.addEventListener('click', function() {
		addTask(itemField.value, self);
	});

	var cancelButton = Ti.UI.createButton({
		title: 'Cancel',
		width: '300dp',
		height: '40dp',
		top: '130dp'
	});
	cancelButton.addEventListener('click', function(e) {
		self.close();
	});

	self.add(itemField);
	self.add(addButton);
	self.add(cancelButton);

	return self;
};

var addTask = function(value, win) {
	if (value === '') {
		alert('Please enter a task first');
		return;
	}
	if (Titanium.Geolocation.locationServicesEnabled === false){
		Titanium.UI.createAlertDialog({title:'Kitchen Sink', message:'Your device has geo turned off - turn it on.'}).show();
	} else {

		
		Titanium.Geolocation.getCurrentPosition(function(e)
		{
			if (!e.success || e.error)
			{
				alert('error gps');
				return;
			}
	
			var longitude = e.coords.longitude;
			var latitude = e.coords.latitude;
		
			require('db').addItem(value, longitude, latitude);
			Ti.App.fireEvent('app:updateTables');
			win.close();
		});
	}
};