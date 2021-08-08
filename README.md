# daftinator

**daftinator** is a simple chrome extension for injecting personal details and a pre-written message into the contact section of an Irish online rental property listing. 

The script will parse the name of the lister and the address of the property from the site and can inject it into your prewritten spiel wherever you want, with basic built in logic to fill a default salutation or a gendered name-specific salutation. 

It works pretty well for [daft.ie](https://www.daft.ie/) at the moment, and does most of its jobs on [rent.ie](https://www.rent.ie/) with some more kinks to work out.

## Usage

The use of the extension is simple following installation. Following navigating to the relevant listing there are four things to worry about:

1. Default salutation indicated what salutation to use in the event of a nameless lister such as a letting agency. 
2. The gender radio button determines whether the extension inserts Dear Mr." or "Dear Ms." with the letting agent name or if it uses the default salutation with the selection of "None".
3. The "Insert Details" button will open the email popup and insert all relevant data.
4. Unfortunately due to a yet to be worked out bug you will need to click or tab through each field to allow for submission. Should hopefully fix that soon.
5. You'll have to manually click the reCAPTCHA and submit, beacause if I could solve that I'd probably have better things to do than automate away typing under 50 words. 

## Installation

There are two steps to setting up the extension:

1. Navigate to chrome://extensions/, enable developer mode, and add the extension to the chrome via the "Load Unpacked Extension" button, selecting the directory containing the downloaded extension.
2. Follow the "Edit User Details" button in the extension popup to access the options page and enter and save your details (name, email, phone number, and your message)

You can include the follow values in your message to allow for the program to parse a given page for data to include in your message:

 - **${salutation}** - this will fill as one of the following options:
    - If gender is selected as male: *Dear Mr. [PARSED AGENT NAME]*
    - If gender is selected as female: *Dear Ms. [PARSED AGENT NAME]*
    - If gender is selected as None: *[SELECTED DEFAULT SALUTAION]*

 - **${address}** - this will auto-fill as the address parsed from the webpage.

For example, given a listing posted by Martha Louise Hudson at 221B Baker street, the entry 

>${salutation},
>
>I am writing to enquire about the listed apartment at ${address}.

will be posted to the website message textbox as 

>Dear Ms. Hudson,
>
>I am writing to enquire about the listed apartment at 221B Baker Street.