/*

	CallTheExterminator
	A lightweight QA reporter that sends through much needed informations.

*/

// Grab our set fields
import Fields from '../settings/fields.js';

// The class
module.exports = class CallTheExterminator {

	/**
	 *	Construct
	 */
	constructor (
		pm = 'somepm@someagency.com',
		min_browser = 'ie10'
	) {

		// Set the base class of the elements
		this.base_class = 'exterminator';

		// Sets the submit button text
		this.submit_text = 'Report';

		// Set the pm
		this.pm = pm;

		// Set the minimum browser
		this.min_browser = min_browser;

		// Builds the form
		this.form = this.generateFormElement();

		// Set up the field mapping
		this.fields = Fields;

		// Build the form
		this.buildForm();

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

			// Add Filed's params
			this.addFiledParams(this.fields[i]);

			// Add the field to the form
			form.appendChild(field.wrapper);

		}

		// Adds the submit button
		this.addSubmit();

		// Now write the form to the body
		this.writeForm();

	}

	/**
	 *	Adds a submit button to the form
	 */
	addSubmit () {

		// Create the button element
		let button = document.createElement('button');

		// Add the text to the button
		button.innerHTML = this.submit_text;

		// Add the button to the form
		this.form.appendChild(button);

	}

	/**
	 *	Adds necessary paramaters to the field
	 */
	addFiledParams (field) {

		// Set the textarea's placeholder
		field.el.input.setAttribute('placeholder', field.placeholder || '');

		// Do a switch case for the fields
		switch (field.type || field.el_type) {
			case 'text':
			case 'email':
			case 'number':
				break;

			case 'textarea':
				break;

			case 'select':
				break;

			default:
				break;
		}

	}

	/**
	 *	Writes the generated html to the body
	 */
	writeForm () {

		// Add the form to the end of the body
		document.body.appendChild(this.form);

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

		// Add text to the label
		if(field.label) field_label.innerHTML = field.label;

		// Add the elements to the wrapper
		if(field.label) field_wrapper.appendChild(field_label);
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
	 *	Generates Mailto link
	 */
	generateMailtoLink () {

		// TODO

	}

	/**
	 *	Sends issue to an endpoint
	 */
	sendIssue () {

		// TODO

	}

}
