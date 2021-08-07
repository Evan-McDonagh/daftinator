// this is the code which will be injected into a given page...

(function() {
	var details = getDetails(url);

	var address = details.address;
	var name = details.name;
	var salutation = "Dear ";

	if (gender === "None") {
		salutation = defaultSalutation;
	} else {
		name = name.split(' ')
		name = name[name.length-1];
		name = name.charAt(0).toUpperCase() + name.slice(1);
		salutation += gender + " " + name;
	}

	eval(data.message_code);

	openMessenger(url);

	// Wait a moment for popup to laod and insert data
	setTimeout(
		function() {
			var elements = setElements(url);
			insertElements(elements,data);
		},
		100
	);
	
	function insertElements(elements,data) {
		// Insert provided and gathered data
		insert(elements.name,data.name);
		insert(elements.email,data.email);
		insert(elements.phone,data.phone);
		elements.terms.click();
		insert(elements.message,data.message);
	}

	function openMessenger(url) {
		// open input popup on Daft
		if (url.includes('daft')) document.querySelector('[data-testid="message-btn"]').click();
		else if (url.includes('rent.ie')) return;
	}

	function insert(element,value) {
		// insert a value into particular element and bubble input event up through DOM
		setNativeValue(element,value);

		element.dispatchEvent(new Event('input', { bubbles: true }));
	}

	function setElements(url) {
		// Insert elements for a given site
		if (url.includes('daft')) {
			elements = {
				name:document.getElementsByName("name")[0],
				email:document.getElementsByName("email")[0],
				phone:document.getElementsByName("phone")[0],
				terms:document.getElementsByName("tcAccepted")[0],
				message:document.getElementsByName("message")[0],
			}
		}
		else if (url.includes('rent.ie')) {
			elements = {
				name:document.getElementById('fname'),
				email:document.getElementById('femail'),
				phone:document.getElementById('fcontact_number'),
				terms:document.getElementById('terms'),
				message:document.getElementById('fcontact_textarea')
			}
		}
		return elements;
	}

	function getDetails(url) {
		// Scrape house address and landlord name
		if (url.includes('daft')) {
			address = document.querySelector('[class*=TitleBlock__Address]').textContent;
			name = document.querySelector('[class*=ContactPanel__ImageLabel]').textContent;
		} else if (url.includes('rent.ie')) {
			address = document.querySelector('h1').textContent
			name = "Placeholder";
		}
		return {"address":address,"name":name};
	} 

	function setNativeValue(element, value) {
		// Insert text in React-friendly way
		let lastValue = element.value;
		element.value = value;
		let event = new Event("input", { target: element, bubbles: true });
		// React 15
		event.simulated = true;
		// React 16
		let tracker = element._valueTracker;
		if (tracker) {
			tracker.setValue(lastValue);
		}
		element.dispatchEvent(event);
	}
	
	function scrollDown(url) {
		// Scroll down to bottom of relevant div
		var overlay;
		if (url.includes('daft')){
			overlay = document.querySelector('div[class*="ReactModal__Overlay"]');
		}
		if (url.contains('rent.ie')) {
			return;
		}
		overlay.scrollTop = overlay.scrollHeight;
	}
})();