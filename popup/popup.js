let fillButton = document.getElementById('fillButton');

var gender;
var defaultSalutation;

fillButton.addEventListener("click", async () => {
    // for the current tab, inject the "inject.js" file & execute it
    gender = document.querySelector('input[name="gender"]:checked').value;
    defaultSalutation = document.getElementById('defaultSalutation').value;

    // fillButton.addEventListener("click", async () => {
    //     chrome.runtime.sendMessage({gender: gender}, function(response) {
    //         console.log(response.farewell);
    //     });
    // });"

    chrome.runtime.sendMessage(
        {
            "gender": gender, 
            "defaultSalutation": defaultSalutation
        }, 
        function(response) {
            console.log(response.farewell);
      });
});