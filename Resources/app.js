if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
else {
	//add a single variable to the global scope to which we may choose to
	//intentionally add items to
	var globals = {};
	
	var platform = Ti.Platform.osname;

	//create a private scope to prevent further polluting the global object
	(function() {
		var ListWindow = require('ui/ListWindow').ListWindow,
			AddWindow = require('ui/AddWindow').AddWindow;

		// Initialize local storage
		require('db').createDb();

		//create windows
		var win = new ListWindow({
					title: 'Todo',
					barColor: 'transparent',
					backgroundColor:'#fff',
					navTintColor: '#fff',
					activity: {
						onCreateOptionsMenu: function(e) {
							var menu = e.menu;
							var menuItem = menu.add({ title: "Add Task" });
							menuItem.setIcon("images/ic_menu_add.png");
							menuItem.addEventListener("click", function(e) {
								new AddWindow().open();
							});
							var menuItem2 = menu.add({ title: "Test" });
							menuItem2.setIcon("images/ic_menu_add.png");
							menuItem2.addEventListener("click", function () {
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
							    
							   	var db = require('db');
		    
							    for(var i = 0; i < count; i++){
							    	db.addItem("PerfTest", 0, 0);
							    } 
							    
							    var todoItems = db.selectItems();
							    
							    for(var i = 0; i < count; i++){
							    	if(todoItems[i].item = "PerfTest")
							    		db.deleteItem(todoItems[i].id);
							    }
							
							    alert("Done for "+count+" Elements after: " + (new Date().getTime() - start) + "ms");
							});
						}
					}
			});
			
		if(platform == "iphone"){
			globals.window = Titanium.UI.iOS.createNavigationWindow({
				backgroundColor:'#C04',
	   			window: win
			});
		} else {
			globals.window = win;
		}
			
		globals.window.open();
	})();
}