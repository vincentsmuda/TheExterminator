/**
 *  This file syncronizes JS ans SCSS variables so that
 *  some classes, gutters, colors, sizes, and any other
 *  type of visual style can be standardized throughout
 */

module.exports = {vars:[

  /**
   *  Base class of the component
   *  You can change this to anything but make sure
   *  to change it in the JS class as well!
   */
  {name: 'base_class', type: 'className', value: 'exterminator'},

  /**
   *  Gutter
   */
  {name: 'gutter', type: 'gutter', value: 20},
  {name: 'gutter-medium', type: 'gutter', value: 1.5},
  {name: 'gutter-large', type: 'gutter', value: 2},

  /**
   *  Font Size
   *  Keep this px and not relative since the contexts that the
   *  script could be in may vary along with their ems/rems/...
   */
  {name: 'font-size', type: 'px', value: 18},

  /**
   *  Color variables
   *  Modify these to theme the tracker
   */
  {name: 'color-size', type: 'color', value: '000000'},
  {name: 'color-red', type: 'color', value: 'e84a64'},
  {name: 'color-error', value: 'color-red'},
  {name: 'color-success', type: 'color', value: '4BB543'},
  {name: 'color-warning', type: 'color', value: 'FFCC00'},
  {name: 'color-blue-grey', type: 'color', value: '384D66'},
  {name: 'color-text', type: 'colorDarken', value: ['color-blue-grey',3]},
  {name: 'color-border', type: 'color', value: 'eeeeee'},
  {name: 'color-background', type: 'color', value: 'ffffff'},
  {name: 'color-sending', value: 'color-warning'},

]};
