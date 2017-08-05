/**
 *  This class is in charge of building our
 *  variables which are used for both scss
 *  and js
 */

module.exports = class Variables {

  /**
   *  Constructs the vars class
   *  @type {Object} args The arguments for the class
   */
  constructor (args = {}) {

    /**
     *  Sets the base settings of the object so that
     *  we can control suffixes and scss specific
     *  values
     */
    this.is_scss = args.is_scss ? args.is_scss : true ;

    /**
     *  Loop through the vars in the args and apply them
     *  to the class
     */
    if(args.variables)
      for (let i = 0, l = args.variables.length; i < l; i++) {

        // Set the current variable
        let variable = args.variables[i],
            value = typeof variable.value == 'object'
              ? variable.value
              : [variable.value];

        // Add the variable to the instance
        this.addVariable(
          variable.name,
          variable.type
            ? this[variable.type](...value)
            : variable.value
        );

      }
  }

  /**
   *  Adds a modifier to a string
   *
   *  @type {String} string The string to add
   */
  modifier (string = 'px') {
    return this.is_scss ? string : '';
  }

  /**
   *  Adds a modifier to a string
   *
   *  @type {String} color The hex of the color
   */
  color (color = '000000') {
    return this.modifier('#') + color;
  }

  /**
   *  Calculates the gutter
   *
   *  @type {Integer} multiplier What to multiply the gutter by
   */
  gutter (multiplier = 1) {

    // Set the gutterbase
    if(!this.base_gutter) this.base_gutter = multiplier;

    // return the calculated gutter
    return (this.base_gutter * multiplier) + this.modifier('px');

  }

  /**
   *  Returns a size in pixels
   *
   *  @type {Integer} number the number in pixels
   */
  px (number = 0) {
    return number + this.modifier('px');
  }

  /**
   *  Adds css darken values
   *
   *  @type {String}  color  The color to darken
   *  @type {Integer} amount The amount in percent to darken the color
   */
  colorDarken (color = '', amount = '10') {

    // Set tge color to darken
    let value = this.variables[color] ? this.variables[color] : color ;

    // darken the color
    return `darken(${value}, ${amount}%)`;

  }

  /**
   *  Builds a class name
   *  @type {String} name The name of the class
   */
  className(name = '') {
    return this.modifier(`'.`)
      + name
      + this.modifier(`'`) ;
  }

  /**
   *  Adds a variable to the class
   *
   *  @type {String} name  The name of the variable
   *  @type {String} value What the variable will be set to
   */
  addVariable (name = '', value = '') {

    // init the variables obj
    if(!this.variables) this.variables = {};

    // Check to see if the value is a name
    let variable_value = this.variables[value]
      ? this.variables[value]
      : value ;

    // Add the variable to the variables obj
    this.variables[name] = variable_value;

  }

  /**
   *  Returns the constructed variables
   */
  get (index = '') {
    return index
      ? this.variables[index]
      : this.variables ;
  }

}
