/**
 * Variables shared between js and scss
 */

class Variables {

  constructor (args = {}) {

    /**
     *  Sets the base settings of the object so that
     *  we can control suffixes and scss specific
     *  values
     */
    this.is_scss = args.is_scss ? args.is_scss : true ;

    /**
     *  Base class of the component
     *  You can change this to anything but make sure
     *  to change it in the JS class as well!
     */
    this.addVariable('base_class', `'` + this.modifier('.') + 'exterminator' + `'`);

    /**
     *  Gutter
     */
    this.addVariable('gutter-base',20);
    this.addVariable('gutter',this.gutter());
    this.addVariable('gutter-medium',this.gutter(1.5));
    this.addVariable('gutter-large',this.gutter(2));

    /**
     *  Font Size
     *  Keep this px and not relative since the contexts that the
     *  script could be in may vary along with their ems/rems/...
     */
    this.addVariable('font-size',this.px('18'));

    /**
     *  Color variables
     *  Modify these to theme the tracker
     */
    this.addVariable('color-black',this.color('000'));
    this.addVariable('color-red',this.color('e84a64'));
    this.addVariable('color-error','color-red');
    this.addVariable('color-success',this.color('4BB543'));
    this.addVariable('color-warning',this.color('FFCC00'));
    this.addVariable('color-blue-grey',this.color('384D66'));
    this.addVariable('color-text',this.colorDarken('color-blue-grey',3));
    this.addVariable('color-border',this.color('eeeeee'));
    this.addVariable('color-background',this.color('ffffff'));
    this.addVariable('color-sending','color-warning');

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

    // Sets the size of the gutter
    let gutter_size = this.variables && this.variables['gutter-base']
      ? this.variables['gutter-base']
      : 20 ;

    // return the calculated gutter
    return (this.variables['gutter-base'] * multiplier) + this.modifier('px');

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

// Export the constructed class
module.exports = new Variables();
