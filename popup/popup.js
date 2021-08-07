let fillButton = document.getElementById('fillButton');
let defaultSalutation = document.getElementById('defaultSalutation');

var gender;
var defaultSalutationValue;

getSettings(defaultSalutation);

fillButton.addEventListener("click", async () => {
    // for the current tab, inject the "inject.js" file & execute it
    gender = document.querySelector('input[name="gender"]:checked').value;
    defaultSalutationValue = document.getElementById('defaultSalutation').value;

    chrome.runtime.sendMessage(
        {
            "gender": gender, 
            "defaultSalutation": defaultSalutationValue
        }, 
        function(response) {
            console.log(response.farewell);
      });
});

defaultSalutation.addEventListener('change', async () => {
    chrome.storage.local.set({"defaultSalutation": defaultSalutation.value}, function() {
        console.log('Value is set to ' + defaultSalutation.value);
      });
    });

function getSettings(defaultSalutation) {
    chrome.storage.local.get(['defaultSalutation'], function(data) {
        if (data['defaultSalutation'] === undefined) {
            chrome.storage.local.set({"defaultSalutation": defaultSalutation.value}, function() {
                console.log('Value is set to ' + defaultSalutation.value);
              });
        }
        else {defaultSalutation.value = data['defaultSalutation']};
    });
}
  