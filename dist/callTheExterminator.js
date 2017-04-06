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

		// Set the pm
		this.pm = pm;

		// Set the minimum browser
		this.min_browser = min_browser;

		// Builds the form
		this.form = this.generateFormElement();

		// Set up the field mapping
		this.fields = [{
			name: 'issue',
			type: 'text',
			placeholder: 'What is the issue?',
			required: true
		}, {
			name: 'description',
			type: 'textarea',
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
				this.fields[i].type = this.fields[i].type || 'text';

				// Generate the field element
				var field_type = this.fields[i].type,
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

	}, {
		key: 'addFiledParams',
		value: function addFiledParams(field) {

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


			// Store the element
			var el = document.createElement(type);

			// Give the element a class
			el.classList.add(this.base_class + '__' + type);

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