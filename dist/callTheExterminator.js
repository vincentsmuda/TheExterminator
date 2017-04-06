'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*

	CallTheExterminator
	A lightweight QA reporter that sends through much needed informations.

*/

var CallTheExterminator = function () {

	/**
  *	Construct
  */
	function CallTheExterminator() {
		var pm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'somepm@someagency.com';
		var min_browser = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ie10';

		_classCallCheck(this, CallTheExterminator);

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
		this.fields = [{
			label: 'Issue',
			name: 'issue',
			el_type: 'input',
			type: 'text',
			placeholder: 'What is the issue?',
			required: true
		}, {
			label: 'Description',
			name: 'description',
			el_type: 'textarea',
			placeholder: 'Describe the issue.',
			required: true
		}];

		// Build the form
		this.buildForm();
	}

	/**
  *	Builds the HTML form
  */


	_createClass(CallTheExterminator, [{
		key: 'buildForm',
		value: function buildForm() {

			// Store the form for local use
			var form = this.form;

			// Loop through the required fields
			for (var i = 0, l = this.fields.length; i < l; i++) {

				// Make sure the field has a type
				this.fields[i].el_type = this.fields[i].el_type || 'input';

				// Generate the field element
				var field = this.buildField(this.fields[i]);

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

	}, {
		key: 'addSubmit',
		value: function addSubmit() {

			// Create the button element
			var button = document.createElement('button');

			// Add the text to the button
			button.innerHTML = this.submit_text;

			// Add the button to the form
			this.form.appendChild(button);
		}

		/**
   *	Adds necessary paramaters to the field
   */

	}, {
		key: 'addFiledParams',
		value: function addFiledParams(field) {

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

	}, {
		key: 'writeForm',
		value: function writeForm() {

			// Add the form to the end of the body
			document.body.appendChild(this.form);
		}

		/**
   *	Builds a field including it's wrapper element and label
   */

	}, {
		key: 'buildField',
		value: function buildField(field) {

			// Generate field
			// Wrapper element
			// and label
			var field_el = this.buildElement(field.el_type),
			    field_wrapper = this.buildElement('div', 'field'),
			    field_label = this.buildElement('label');

			// Add text to the label
			if (field.label) field_label.innerHTML = field.label;

			// Add the elements to the wrapper
			if (field.label) field_wrapper.appendChild(field_label);
			field_wrapper.appendChild(field_el);

			// return the wrapper
			return {
				input: field_el,
				wrapper: field_wrapper
			};
		}

		/**
   *	Generates the form's markup (including extra params)
   */

	}, {
		key: 'generateFormElement',
		value: function generateFormElement() {

			// Generate the form element
			var form = this.buildElement('form');

			// Add extra params here


			// return it
			return form;
		}

		/**
   *	Build Element
   */

	}, {
		key: 'buildElement',
		value: function buildElement() {
			var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'input';
			var i_class = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';


			// Store the element
			var el = document.createElement(type),
			    el_class = i_class || type;

			// Give the element a class
			el.classList.add(this.base_class + '__' + el_class);

			// return the built element
			return el;
		}

		/**
   *	Generates Mailto link
   */

	}, {
		key: 'generateMailtoLink',
		value: function generateMailtoLink() {}

		// TODO

		/**
   *	Sends issue to an endpoint
   */

	}, {
		key: 'sendIssue',
		value: function sendIssue() {

			// TODO

		}
	}]);

	return CallTheExterminator;
}();

new CallTheExterminator();