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
				
				// build code to insert values from popup
				variableInsertionCode += 'var gender = "' + request.gender + '"; '
				variableInsertionCode += 'var defaultSalutation = "' + request.defaultSalutation + '"; '
				variableInsertionCode += 'var url = "' + url + '"; '

				chrome.tabs.executeScript(tab.id, {
					file: "myDetails.js"
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
