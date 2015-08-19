A sweet layer on top of [Send-Anywhere](https://send-anywhere.com/) API to use it with node.js

# Installation 

```bash
npm install send-anywhere
```

# API 

## Initialize SDK
You can get the API key by requesting it from Send-Anywhere team.
```javascript
var config = {
	API_KEY  : "XXXXXXXXXXXXXXXXXXXXXXXX" ,
	PROFILE_NAME :  'YYYYYY'	 	
};

var sa = require('./index.js')(config);
```

## sendFile(SRC_FILE , detailsCallback , completedCallback)
```javascript
sa.sendFile('package.json' , function(err , details){
	console.log(details);
} , function(err , completedObj){
	console.log(completedObj);
});
```
- ``detailsCallback`` - Use this to fetch the details that are required for receiving the file. check out ``details`` object for further information.
- ``completedCallback`` - Use this to execute something after the transfer of file is complete.

## receiveAsData(KEY , receivedCallback)
```javascript
sa.receiveAsData(KEY ,function(err , data , reponse){
  console.log(data);
  console.log(response); //contains headers and other meta data
});
```
## Error Handling
Use the ``err`` objects in the callback to handle errors. ``err`` has two objects ``err.error`` and ``err.response``. In case you would want to dig deep on your errors , a knowledge about this may come handy.

# Resources 
- check out https://github.com/estmob for more on Send-Anywhere development stuffs.
- This repo is based mainly on https://github.com/estmob/SendAnywhere-Web-API . 

# Contributing
Anything ! More than welcomed.

# License
![](https://raw.githubusercontent.com/scriptnull/bagpack/master/GPL.png)
