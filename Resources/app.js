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