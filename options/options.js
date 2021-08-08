let submitButton = document.getElementById('submit');

let fields = {
    name:document.getElementById('name'),
    email:document.getElementById('email'),
    phone:document.getElementById('phone'),
    message:document.getElementById('message')
}

chrome.storage.local.get(["name","email","phone","message"], function(response) {
    for (field in fields) {
        if (typeof response[field] === 'undefined'){} 
        else{ 
            fields[field].value = response[field];
        }
    }
});

submitButton.addEventListener("click", async () => {
    chrome.storage.local.set(
        {
            name:fields.name.value,
            email:fields.email.value,
            phone:fields.phone.value,
            message:fields.message.value
        },
        function() {
            window.close();
        }
    );
});