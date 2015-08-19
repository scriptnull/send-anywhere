var sa = require('./index.js');
var API_KEY = "db61271267a777500b86290005fc16b346b34049";
var PROFILE_NAME = 'scriptnul2';
sa.receiveAsData(API_KEY , PROFILE_NAME , '475077' ,function(err , data){
	if(err)console.log(err.error);
	else console.log(data);
});