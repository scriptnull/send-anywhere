var fs = require('fs');
var request = require('request');
module.exports = (function (API_KEY, PROFILE_NAME) {

	var sendFile = function (FILE_PATH, sendConfigCb, sendCompletedcb) {
		var KEY_REQ_URL = 'https://send-anywhere.com/web/v1/device?api_key=' + API_KEY + '&profile_name=' + PROFILE_NAME;
		var SEND_URL = 'https://send-anywhere.com/web/v1/key';
		bridge.cookieInit(KEY_REQ_URL, function (cookie) {
			var keyGenOptions = bridge.getRequestOptionsWithCookie(SEND_URL, cookie);
			request.get(keyGenOptions, function (err, response, body) {
				if (err) sendConfigCb({ error: err, response: response }, null);
				else sendConfigCb(null, JSON.parse(body));
				if (response.statusCode == 200) {
					var formData = {
						file: fs.createReadStream(FILE_PATH)
					}
					body = JSON.parse(body);
					var sendUrl = body.weblink;
					request.post({ url: sendUrl, formData: formData }, function (err, response, body) {
						if (err) sendCompletedcb({ error: err, response: response }, null);
						else sendCompletedcb(null, JSON.parse(body));
					});
				} else {
					sendConfigCb({ error: err, response: response }, null);
				}
			});
		});
	};

	var receiveAsData = function ( KEY, cb) {
		var KEY_REQ_URL = 'https://send-anywhere.com/web/v1/device?api_key=' + API_KEY + '&profile_name=' + PROFILE_NAME;
		var RECEIVE_URL = 'https://send-anywhere.com/web/v1/key/' + KEY;
		bridge.cookieInit(KEY_REQ_URL, function (cookie) {
			var KeyGenOptions = bridge.getRequestOptionsWithCookie(RECEIVE_URL, cookie);
			request.get(KeyGenOptions, function (err, response, body) {
				if (err) cb({ error: err, response: response }, null);
				else if (response.statusCode == 200) {
					var fileLink = JSON.parse(body).weblink;
					request.get(fileLink, function (err, response, body) {
						if (err) cb({ error: err, response: response }, null);
						else cb(null, body , response);
					});
				} else {
					cb({ error: err, response: response }, null);
				}
			});
		});
	};

	var bridge = (function (request) {
		var cookieInit = function (KEY_REQ_URL, cb) {
			request
				.get(KEY_REQ_URL)
				.on('response', function (response) {
					var cookie = response.headers['set-cookie'].join(';');
					cb(cookie);
				});
		};
		var getRequestOptionsWithCookie = function (url, cookie) {
			return {
				url: url,
				headers: {
					'cookie': cookie
				}
			};
		}
		return {
			cookieInit: cookieInit,
			getRequestOptionsWithCookie: getRequestOptionsWithCookie
		};
	})(request);
	
	return {
		sendFile : sendFile  ,
		receiveAsData : receiveAsData
	};
}).bind(this);