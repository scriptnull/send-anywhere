var sa = require('./index.js');
var API_KEY = "db61271267a777500b86290005fc16b346b34049";
var PROFILE_NAME = 'scriptnul';
sa.sendFile(API_KEY , PROFILE_NAME , 'package.json' , function(err , details){
	console.log(details);
} , function(err , completedObj){
	console.log('completed');
	console.log(completedObj);
});
