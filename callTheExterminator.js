/*

	CallTheExterminator
	A lightweight QA reporter that sends through much needed informations.

*/

class CallTheExterminator {

	/**
	 *	Construct
	 */
	constructor (
		pm = 'somepm@someagency.com',
		min_browser = 'ie10'
	) {

		// Set the base class of the elements
		this.base_class = 'exterminator';

		// Set the pm
		this.pm = pm;

		// Set the minimum browser
		this.min_browser = min_browser;

		// Builds the form
		this.form = this.generateFormElement();

		// Set up the field mapping
		this.fields = [

			{
				name: 'issue',
				type: 'text',
				placeholder: 'What is the issue?',
				required: true
			},

			{
				name: 'description',
				type: 'textarea',
				placeholder: 'Describe the issue.',
				required: true
			},

		];

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
			this.fields[i].type = this.fields[i].type || 'text';

			// Generate the field element
			let field_type = this.fields[i].type,
					field = this.buildElement(field_type);

			// Store the newly created field element
			this.fields[i].el = field;

			// Add Filed's params
			this.addFiledParams(this.fields[i]);

			// Add the field to the form
			form.appendChild(field);

		}

		console.log(form);

	}

	/**
	 *	Adds necessary paramaters to the field
	 */
	addFiledParams (field) {

		// Do a switch case for the fields
		switch (field.type) {

			case 'text':
			case 'email':
			case 'number':

				// Set the field's placeholder
				field.el.setAttribute('placeholder', field.placeholder || '');

				break;

			case 'textarea':

				// Set the textarea's placeholder
				field.el.innerHTML = field.placeholder;

				break;

			case 'select':


				console.log('select need to be coded');

				break;

			default:

				console.log('What type of field is that??!?!');

				break;

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
	buildElement (type = 'input') {

		// Store the element
		let el = document.createElement(type);

		// Give the element a class
		el.classList.add(`${this.base_class}__${type}`);

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

new CallTheExterminator();
