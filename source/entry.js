// Grab our scss
require('./scss/style.scss');

// Grab the exterminator class
import CallTheExterminator from './js/classes/CallTheExterminator';

// Set the settings
let settings = window.ExterminatorSettings || {};

// init the exterminator
new CallTheExterminator(settings);
