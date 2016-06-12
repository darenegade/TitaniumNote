var platform = Ti.Platform.osname;

//A window object which will be associated with the stack of windows
exports.ListWindow = function(args) {
	var AddWindow = require('ui/AddWindow').AddWindow;
	var self = Ti.UI.createWindow(args);
	var tableview = Ti.UI.createTableView();

	//tableview.setBackgroundImage('images/bg.jpg');
	tableview.setData(getTableData());

	// Need to add a special 'add' button in the 'Todo' window for Mobile Web
	if ( platform !== 'mobileweb') {
		self.add(tableview);
	}

	var perfBtn = Titanium.UI.createButton({
			title: 'X'
		});
	perfBtn.addEventListener('click', function () {

			var count = 10000;

		    var start = new Date().getTime();
		
		    var a = [];
		
		    for(var y = 0; y < count; y++){
		        a.push(Math.random());
		    }
		
		    var swapped;
		    do {
		        swapped = false;
		        for (var i=0; i < a.length-1; i++) {
		            if (a[i] > a[i+1]) {
		                var temp = a[i];
		                a[i] = a[i+1];
		                a[i+1] = temp;
		                swapped = true;
		            }
		        }
		    } while (swapped);
		
		    alert("Done for "+count+" Elements after: " + (new Date().getTime() - start) + "ms");
		});
	
	var addBtn;
	if(platform == "iphone"){
		
		addBtn = Ti.UI.createButton({
			systemButton: Ti.UI.iPhone.SystemButton.ADD		
		});
	} else {
		
		addBtn = Titanium.UI.createButton({
			title: '+'
		});
	}
	
	addBtn.addEventListener('click', function() {
		new AddWindow().open();
	});
	if (platform === 'mobileweb') {
		self.layout = 'vertical';
		addBtn.height = 40;
		addBtn.width = 40;
		addBtn.top = 0;
		addBtn.right = 10;
		self.add(addBtn);
		
		perfBtn.height = 40;
		perfBtn.width = 40;
		perfBtn.top = 0;
		perfBtn.left = 10;
		self.add(perfBtn);
		
		self.add(tableview);
	} else {
		self.rightNavButton = addBtn;
		self.leftNavButton = perfBtn;
	}
	

	tableview.addEventListener('click', function(e) {
		createConfirmDialog(e.row.id, e.row.title).show();
	});

	Ti.App.addEventListener('app:updateTables', function() {
		tableview.setData(getTableData());
	});

	return self;
};

var getTableData = function() {
	var db = require('db');
	var data = [];
	var row = null;
	var todoItems = db.selectItems();
	
	var size = Titanium.Platform.displayCaps.platformHeight/30;

	for (var i = 0; i < todoItems.length; i++) {
		
		row = Ti.UI.createTableViewRow({
			id: todoItems[i].id,
			layout:'vertical',
			backgroundColor: '#FFF'
		});
		var title = Ti.UI.createLabel({
                text:   todoItems[i].item,
                font: {
				fontSize: size
			},
                color:'#000',
                left:10
            });
		var pos = Ti.UI.createLabel({
                text:   'lat: ' + todoItems[i].lat + ' long:' + todoItems[i].lon,
                font: {
				fontSize: size/2
			},
                color:'#000',
                top: 5,
                left:20
        });
		
		row.add(title);
		row.add(pos);
		
		data.push(row);
	}
	return data;
};

var createConfirmDialog = function(id, title) {
	var db = require('db');
	var buttons, doneIndex, clickHandler;

	buttons = ['Done', 'Cancel'];
	clickHandler = function(e) {
		if (e.index === 0) {
			db.deleteItem(id, 1);
			Ti.App.fireEvent('app:updateTables');
		}
	};

	var confirm = Ti.UI.createAlertDialog({
		title: 'Change Task Status',
		message: title,
		buttonNames: buttons
	});
	confirm.addEventListener('click', clickHandler);

	return confirm;
};
