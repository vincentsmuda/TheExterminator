/*

	CallTheExterminator
	A lightweight QA reporter that sends through much needed informations.

*/

// Grab Platform.js
import Platform from 'platform';

// Grab our set fields
import Fields from '../settings/fields.js';

// The class
module.exports = class CallTheExterminator {

	/**
	 *	Construct
	 */
	constructor (args) {

		// Add arguments to the object
		Object.assign(this, {

			// Set the base class of the elements
			base_class: 'exterminator',

			// Sets the submit button text
			submit_text: 'Report',

			// Set the project name
			project: 'Project Name',

			// Set the Subject formatting
			subject_format: '%project% | Bug Report | %date_time%',

			// Sets the form's method
			action: 'mailto:',

			// Set the method
			method: 'GET',

			// Set the pm
			email: 'somepm@someagency.com',

			// Set up ccd emails
			cc: [],

			// Show labels
			labels: false,

			// Set the minimum browser
			min_browser: 'ie10'

		}, args);

		// Check if the version of browser is supported
		this.checkSupport();

		// Set the mailto flag
		this.is_mailto = this.action.indexOf('mailto:') > -1;

		// Set the action up
		this.action = this.is_mailto
			? this.action + this.email
			: this.action ;

		// Set up the field map
		this.fields_map = {};

		// Builds the form
		this.form = this.generateFormElement();

		// Set up the field mapping
		this.fields = this.processFields(Fields);

		// Set up the submit button holder
		this.button = null;

		// Set up the wrapper
		this.wrapper = this.buildWrapper();

		// Build the form
		this.form = this.buildForm();

		// Set the adblock status
		this.ad_blocked = this.detectAdBlock();

		// Set up the events
		this.events();

	}

	/**
	 *	Check to see if you support the current testing browser
	 */
	checkSupport () {
		if (
			Platform.name == 'IE' &&
			+ parseFloat(Platform.version) < this.min_browser
		) alert(
			'The current browser is not supported by '
			+ this.project
		);
	}

	/**
	 *	Applies needed transformations on the set fields
	 */
	processFields (fields) {

		// Add subject and body fields
		fields = fields.concat([
			{
		    name: 'subject',
		    el_type: 'input',
		    type: 'hidden'
		  },
		  {
		    name: 'body',
		    el_type: 'input',
		    type: 'hidden'
		  }
		]);

		// return the fields
		return fields;

	}

	/**
	 *	Builds a wrapper that will hold our form
	 */
	buildWrapper () {

		// create the wrapper element
		let wrapper = document.createElement('div');

		// add appropriate classes
		wrapper.classList.add(this.base_class + '__wrapper');

		// return the wrapper
		return wrapper;

	}

	/**
	 *	Builds the HTML form
	 */
	buildForm () {

		// Store the form for local use
		let form = this.form;

		// Loop through the required fields
		for (let i = 0, l = this.fields.length; i < l; i++) {

			// Make sure the field has a type
			this.fields[i].el_type = this.fields[i].el_type || 'input';

			// Generate the field element
			let field = this.buildField(this.fields[i]);

			// Store the newly created field element
			this.fields[i].el = field;

			// Add the field to a name map
			this.fields_map[this.fields[i].name] = field;

			// Add Filed's params
			this.addFiledParams(this.fields[i]);

			// Add the field to the form
			form.appendChild(field.wrapper);

		}

		// Adds the submit button
		this.button = this.addSubmit();

		// Now write the form to the body
		this.writeForm();

		// return the form
		return form;

	}

	/**
	 *	Adds a submit button to the form
	 */
	addSubmit () {

		// Create the button element
		let button = document.createElement('button');

		// Set the button to submit
		button.setAttribute('type', 'submit');

		// Add the submit value to button so it can post the form
		button.value = 'Submit';

		// Add the text to the button
		button.innerHTML = this.submit_text;

		// Add the button to the form
		this.form.appendChild(button);

		return button

	}

	/**
	 *	Adds necessary paramaters to the field
	 */
	addFiledParams (field) {

		// Set the textarea's placeholder
		field.el.input.setAttribute('placeholder', field.placeholder || '');

		// Set the field's name
		field.el.input.setAttribute('name', field.name || '');

		// Set the field's type
		field.el.input.setAttribute('type', field.type || '');

		// Set the field's value
		field.el.input.value = field.value || '';

	}

	/**
	 *	Writes the generated html to the body
	 */
	writeForm () {

		// Add the form to the wrapper
		this.wrapper.appendChild(this.form);

		// Add the wrapper to the body
		document.body.appendChild(this.wrapper);

	}

	/**
	 *	Builds a field including it's wrapper element and label
	 */
	buildField (field) {

		// Generate field
		// Wrapper element
		// and label
		let field_el = this.buildElement(field.el_type),
				field_wrapper = this.buildElement('div', 'field'),
				field_label = this.buildElement('label');

		// Add class to field
		field_el.classList.add(this.base_class + '__input');

		// Add text to the label
		if(field.label && this.label) field_label.innerHTML = field.label;

		// Add the elements to the wrapper
		if(field.label && this.label) field_wrapper.appendChild(field_label);
		field_wrapper.appendChild(field_el);

		// return the wrapper
		return {
			input: field_el,
			wrapper: field_wrapper
		}

	}

	/**
	 *	Generates the form's markup (including extra params)
	 */
	generateFormElement () {

		// Generate the form element
		let form = this.buildElement('form');

		// Add extra params here
		form.setAttribute('action', this.action);

		// Set the method
		form.setAttribute('method', this.method);

		// Add extra params here
		form.setAttribute('enctype', 'text/plain');

		// return it
		return form;

	}

	/**
	 *	Build Element
	 */
	buildElement (type = 'input', i_class = '') {

		// Store the element
		let el = document.createElement(type),
				el_class = i_class || type;

		// Give the element a class
		el.classList.add(this.base_class + '__' + el_class);

		// return the built element
		return el;

	}

	/**
	 *	Generates the subject line of the email
	 */
	generateSubjectLine () {

		// Create the subject var
		let subject = this.subject_format;

		// add the project to the
		subject = subject.replace('%project%', this.project);

		// Add datetime to the string
		subject = subject.replace('%date_time%', new Date());

		// return the formatted subject
		return subject;

	}

	/**
	 *	Generates the body of the message
	 */
	generateMessageBody () {

		// Set up our body
		let body = '',
				extra_info = [
					{label:'Page',fn:this.detectURL},
					{label:'Envirnoment',fn:this.detectEnvirnoment},
					{label:'Resolution',fn:this.detectResolution},
					{label:'Scroll Position',fn:this.detectScrollPosition},
					{label:'Locale',fn:this.detectLocale},
					{label:'AdBlock',fn:this.detectAdBlock},
					{label:'Cookies',fn:this.detectCookiesEnabled}
				];

		// Loop through all fields
		for (var i = 0; i < this.fields.length; i++) {

			// Jump out if subject or body fields
			if(~['body','subject'].indexOf(this.fields[i].name))
				continue;

			// Add new line to the body
			body +=
				(!body ? '' : "\r\n\r\n") +
				this.fields[i].label + ':';

			// Add the value of the new line to the body
			body += "\r\n" + this.fields[i].el.input.value;

		}

		// Loop through our extra informations
		// for dev purposes
		for (var i = 0; i < extra_info.length; i++) {
			body += (!body ? '' : "\r\n\r\n")
				+ extra_info[i].label + ":\r\n"
				+ extra_info[i].fn();
		}


		return body;

	}

	/**
	 *	This event gets fired before the form is submitted
	 */
	onSubmit () {

		// generate our subject line
		this.fields_map.subject.input.value =
			this.generateSubjectLine();

		// generate our message body
		this.fields_map.body.input.value =
			this.generateMessageBody();

	}

	/**
	 *	Detects the user's Envirnoment
	 */
	detectEnvirnoment () {
		return Platform.description;
	}

	/**
	 *	Get the current page's URL
	 */
	detectURL () {
		return window.location.href;
	}

	/**
	 *	Detect's the user's current browser language
	 */
	detectLocale () {
		return
			navigator.browserLanguage
			|| navigator.language
			|| navigator.languages[0];
	}

	/**
	 *	Detect the browser's current resolution
	 */
	detectResolution () {

		// Set up some basic vars
		let w = window,
		    d = document,
		    e = d.documentElement,
				s = typeof screen !== 'undefined' ? screen : false,
		    g = d.getElementsByTagName('body')[0],
				x = w.innerWidth || e.clientWidth || g.clientWidth,
    		y = w.innerHeight|| e.clientHeight|| g.clientHeight,
				sx = s ? s.width : 0,
				sy = s ? s.height : 0;

		// Return the resolution
		return `(${x} x ${y}) of (${sx} x ${sy})`;

	}

	/**
	 *	Detects how far down the user had scrolled
	 */
	detectScrollPosition () {

		// init the vars
		let doc = document.documentElement,
				x = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
				y = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

		// return the scroll positions
		return `${x} x ${y}`;

	}

	/**
	 *	Detects if adblock is enabled
	 */
	detectAdBlock () {

		// if we already detected the adblock, return it
		if(!!this.ad_blocked) return this.ad_blocked > 0 ? 'Enabled' : 'Disabled' ;

		// Create our bait
		let bait = document.createElement('div');

		// give it some innards
		bait.innerHTML = '&nbsp;';

		// give it a baity classname
		bait.className = 'adsbox';

		// Add it to the end of the body
		document.body.appendChild(bait);

		// Check to see if it was removed
		setTimeout(() => {

			// check to see if it has height
			this.ad_blocked = !bait.offsetHeight ? 1 : -1;

			// remove the bait
			bait.remove();

		}, 100);

		return -1;

	}

	/**
	 *	Detects wheather a browser's cookies are enabled
	 */
	detectCookiesEnabled () {

		// Do the detecting
		let d = document,
				enabled = ("cookie" in d && (d.cookie.length > 0 || (d.cookie = "test").indexOf.call(d.cookie, "test") > -1));

		// return a string
		return enabled ? 'Enabled' : 'Disabled or legacy browser' ;

	}

	/**
	 *	Submits the form as a mailto link
	 */
	triggerMailto () {

		// Send the form via email mailto link
		let win = window.open(
			//this.form.getAttribute('action')
			'mailto:'
				+ '?subject=' + encodeURI(this.generateSubjectLine())
				+ '&body=' + encodeURI(this.generateMessageBody())
				+	(this.cc.length ? '&cc=' + this.cc.concat`,` : ''),
			'_blank'
		);

		// Set close after 1 second
		setTimeout(() => {

			// Set the successful state
			this.triggerSuccess();

			// close the window
			win.close();

		}, 1000);

	}

	/**
	 *	Sets up the events associated with the form
	 */
	events () {

		// Set up a form submission callback
		this.form.addEventListener('submit', (e) => {

			// prevent form from submitting
			e.preventDefault();

			if(this.is_mailto) {

				// Trigger the mailto
				this.triggerMailto();

			}else{

				// do ajax request
				this.triggerAjax((successful) => {

					// If it fails, fallback to mailto
					if(!successful) this.triggerMailto();

					// Trigger the success state
					else this.triggerSuccess();

				});

			}

		});

	}

	/**
	 *	This is what happens when the message is sent
	 */
	triggerSuccess () {

		// Clear the form out
		this.clearForm();

		// Set the form to success
		this.wrapper.classList.add(this.base_class + '__wrapper--success');

		// After 10 seconds remove success state
		setTimeout(() => {
			this.wrapper.classList.remove(this.base_class + '__wrapper--success');
		},10000);

	}

	/**
	 *	Makes an ajax request to an endpoint
	 */
	triggerAjax (cb) {

		// Set up the request
		let r = new XMLHttpRequest(),
				data = 'subject=' + encodeURI(this.generateSubjectLine())
				+ '&body=' + encodeURI(this.generateMessageBody())
				+ '&email=' + this.email
				+	(this.cc.length ? '&cc=' + this.cc.concat`,` : '');

		// Do subject and body construction
		this.onSubmit();

		// Set up the post
		r.open(this.method, this.action, true);

		// Set up the content type
		r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

		// Do a check
		r.onreadystatechange = function() {

			// if is ready?? lolz
			if (this.readyState === 4) {


				// if response was successful
				if (this.status >= 200 && this.status < 400) {

					// Get the response
					let resp = JSON.parse(this.responseText);

					// return the status of the request
					cb(resp.status);

				} else {

					// return false to the callback
					cb(false);

				}
			}
		};

		// Send the request
		r.send(data);

	}

	/**
	 *	Clears out the form
	 */
	clearForm () {

		// Store the fields for easy access
		let fields = this.fields;

		// Loop through the fields
		for (var i = 0; i < fields.length; i++) {

			// Store the field in the block scope
			let field = this.fields[i];

			// Skip if is hidden
			if(field.type && field.type == 'hidden') continue;

			// Store the value in case we need to retreive it
			this.fields[i].previous_value = this.fields[i].el.value;

			// Clear the field's value
			this.fields[i].el.value = '';

		}

	}

}
