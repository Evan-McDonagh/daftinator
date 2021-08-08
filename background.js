// Skeleton of code based on Dan Harpers Chrome JS injection extensionhttps://gist.github.com/danharper/8364399 

// this is the background code...
var tab;
var variableInsertionCode = "";

// Inject code in current tab on buttonclick
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		chrome.tabs.query(
			{currentWindow: true, active : true},
			function(tabs){
				tab = tabs[0];
				url = tab.url;
				
				chrome.storage.local.get(['name','email','phone','message'], function(response) {
					data = {
						name:response.name,
						email:response.email,
						phone:response.phone,
						message_code:"data.message = `" + response.message + "`"
					}
					// build code to insert values from popup
					variableInsertionCode += "data = " + JSON.stringify(data)+';';
					variableInsertionCode += 'var gender = "' + request.gender + '"; '
					variableInsertionCode += 'var defaultSalutation = "' + request.defaultSalutation + '"; '
					variableInsertionCode += 'var url = "' + url + '"; '
				});
				chrome.tabs.executeScript(tab.id ,{
					code: variableInsertionCode
				});
				chrome.tabs.executeScript(tab.id, {
					file: 'inject.js'
				});
			}
		);
		sendResponse({farewell: "goodbye"});
	}
);