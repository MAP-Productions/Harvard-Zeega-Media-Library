//Adds a function to the javascript date object.
//Didn't really know where to put this so I put it here...(Catherine)
Date.prototype.getMonthAbbreviation = function() {
   return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][this.getMonth()];
}
jQuery(function($)
{
	// Shorthand the application namespace
	zeega = zeega || {};
	var ZeegaDashboard = zeega.dashboard.app;
	ZeegaDashboard.init();
	initHeaderUX();
});
