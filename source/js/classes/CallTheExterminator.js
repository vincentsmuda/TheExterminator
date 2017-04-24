/*

	CallTheExterminator
	A lightweight QA reporter that sends through much needed informations.

*/

// Grab Platform.js for browser info
import Detective from './Detective';

// Grab html2canvas for screenshots
import html2canvas from 'html2canvas';

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
			submit_button_text: 'Report',

			// Set the project name
			project: 'Project Name',

			// Set the Subject formatting
			subject_format: '%project% - Bug Report - %date_time%',

			// Sets the form's method
			action: 'mailto:',

			// Set the method
			method: 'POST',

			// Set the pm
			email: 'somepm@someagency.com',

			// Set up ccd emails
			cc: [],

			// Show labels
			labels: false,

			// Set the minimum browser (IE)
			min_browser: 10,

			// Whether to send through a screenshot
			sends_screenshot: false,

			// Custom Logs to send through in report
			custom_logs: []

		}, args);

		// Instantiate our detective
		this.detective = new Detective();

		// Check if the version of browser is supported
		this.detective.detect('support', {'version':this.min_browser});

		// Extra information to detect
		// See the detective class for available
		this.detect_extra_info = [
			{label:'Page',fn:'URL'},
			{label:'Envirnoment',fn:'envirnoment'},
			{label:'Resolution',fn:'resolution'},
			{label:'Scroll Position',fn:'scrollPosition'},
			{label:'Locale',fn:'locale'},
			{label:'AdBlock',fn:'adBlock'},
			{label:'Cookies',fn:'cookiesEnabled'},
			{label:'Errors',fn:'errors'}
		];

		// Add our custom logging functions
		if(this.custom_logs.length) this.addCustomLogs();

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

		// Set up the toggler
		this.toggler = this.buildToggler();

		// Set up the wrapper
		this.wrapper = this.buildWrapper();

		// Build the form
		this.form = this.buildForm();

		// Set the current screenshot to empty
		this.screenshot = null;

	}

	/**
	 *	Adds custom logging to reporting loop
	 */
	addCustomLogs () {

		// Store the custom rows to loop throug
		let rows = this.custom_logs,
				detect_custom_logs = [];

		// Loop through the rows
		for (var i = 0, l = rows.length; i < l; i++) {

			// Add the row to the message body generator loop
			detect_custom_logs[i] = {
				label: rows[i].label,
				fn: rows[i].callback.name
			};

			// Add the function as a callback
			this.detective[rows[i].callback.name]
				= rows[i].callback.fn;

		}

		// Add the custom logs to the extra info
		this.detect_extra_info
			= this.detect_extra_info.concat(detect_custom_logs)

		// return the extra info for inspection
		return this.detect_extra_info;

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

		// Add the toggler button to the wrapper
		wrapper.appendChild(this.toggler);

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

		// Set up the form events
		this.formEvents();

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
		button.innerHTML = this.submit_button_text;

		// Add the button to the form
		this.form.appendChild(button);

		return button

	}

	/**
	 *	Adds open/close button
	 */
	buildToggler () {

		// Create the element
		let toggler = document.createElement('a'),
				span = document.createElement('span'),
				span_count = 1;

		// Add a class to the span
		span.classList.add(this.base_class + '__toggler-span');

		// add some spans for styling
		for (let i = 1; i <= span_count; i++) {

			// Store the current span
			let current_span = span.cloneNode(true);

			// Add an identifying class
			current_span.classList.add(this.base_class + '__toggler-span--' + i);

			// Add the span to the toggler
			toggler.appendChild(current_span);

		}

		// Add proper class to the anchor
		toggler.classList.add(this.base_class + '__toggler');

		// Set up the toggler events
		this.togglerEvents(toggler);

		// return the anchor
		return toggler;

	}

	/**
	 *	Handles all events associated with the toggler
	 *	Mainly the open/close
	 */
	togglerEvents (toggler) {

		// Set up the vars
		let body = document.body;

		// Add toggler events
		toggler.addEventListener('click', () => {

			// Toggle the open class
			body.classList.toggle(this.base_class + '--open');

		});

	}

	/**
	 *
	 */

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
		let body = '';

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
		for (var i = 0; i < this.detect_extra_info.length; i++) {
			body += (!body ? '' : "\r\n\r\n")
				+ this.detect_extra_info[i].label + ":\r\n"
				+ this.detective.detect(this.detect_extra_info[i].fn).message;
		}

		// Return the constructed body
		return body;

	}

	/**
	 *	Generates a browser screenshot
	 */
	generateScreenshot (cb) {

		// Jump out if we don't want to render a screenshot
		if(!this.sends_screenshot) cb();

		// Store the body for easy access
		let body = document.body;

		// First, hide the exterminator
		body.classList.add(this.base_class + '--screenshot');

		// Now use html2canvas to take a screenshot
		html2canvas(document.body,{ background: '#fff' })
		.then(canvas => {

			// After screenshot has been taken, put
			// the exterminator back
			body.classList.remove(this.base_class + '--screenshot');

			// Turn the canvas into an image and
			// store it in the obj as base64 "image/png"
			this.screenshot = canvas.toDataURL();

			// run our callback
			cb();

		});
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
	formEvents () {

		// Set up a form submission callback
		this.form.addEventListener('submit', (e) => {

			// prevent form from submitting
			e.preventDefault();

			if(this.is_mailto) {

				// Trigger the mailto
				this.triggerMailto();

			}else{

				// Generate a screenshot
				this.generateScreenshot(() => {

					// do ajax request
					this.triggerAjax((successful) => {

						// If it fails, fallback to mailto
						if(!successful) this.triggerMailto();

						// Trigger the success state
						else this.triggerSuccess();

					});

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
		},5000);

	}

	/**
	 *	Makes an ajax request to an endpoint
	 */
	triggerAjax (cb) {

		// Set up the request
		let r = new
		 XMLHttpRequest(),
				data = 'subject=' + encodeURI(this.generateSubjectLine())
				+ '&body=' + encodeURI(this.generateMessageBody())
				+ '&email=' + this.email
				+	(this.cc.length ? '&cc=' + this.cc.concat`,` : '')
				+ (this.screenshot ? '&screenshot=' + this.screenshot : '');

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
			let field = this.fields[i],
					input = field.el.input;

			// Skip if is hidden
			if(field.type && field.type == 'hidden') continue;

			// Store the value in case we need to retreive it
			field.previous_value = input.value;

			// Clear the field's value
			input.value = '';

		}

	}

}
