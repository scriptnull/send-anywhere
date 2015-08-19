var fs = require('fs');
var request = require('request');

module.exports.sendFile = function(API_KEY , PROFILE_NAME ,FILE_PATH , cb){
	var KEY_REQ_URL = 'https://send-anywhere.com/web/v1/device?api_key='+ API_KEY +'&profile_name=' + PROFILE_NAME;
	var SEND_URL = 'https://send-anywhere.com/web/v1/key';
	bridge.cookieInit(KEY_REQ_URL , function(cookie){
		var keyGenOptions = bridge.getRequestOptionsWithCookie(SEND_URL , cookie );
		request.get(keyGenOptions , function(err , response , body){
			if(err) return cb({ error : err , response : response } , null );
			if(response.statuseCode == 200){
				var formData = {
					file: fs.createReadStream(FILE_PATH)
				}			
				body = JSON.parse(body);
				var sendUrl = body.weblink;
				request.post({ url : sendUrl , formData :  formData} , function(err , response , body ){
					if(err) return cb({ error : err , response : response } , null );
					else return cb(null , JSON.parse(body));
				});
			}else{
				return cb({ error : err , response : response } , null )
			}
		});
	});
};

var bridge = (function(request){
	var cookieInit = function(KEY_REQ_URL , cb){
		request
			.get(KEY_REQ_URL)
			.on('response' , function(response){
				var cookie = response.headers['set-cookie'].join(';');
				cb(cookie);
			});
	};
	var getRequestOptionsWithCookie = function(url , cookie ){
		return {
			url: url ,
			headers: {
				'cookie': cookie
			}
		};
	}
	return {
		cookieInit : cookieInit	,
		getRequestOptionsWithCookie : getRequestOptionsWithCookie 
	};
})(request);