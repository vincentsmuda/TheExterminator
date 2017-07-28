// Grab our scss
require('./scss/style.scss');

// Grab the exterminator class
import Exterminator from './js/classes/Exterminator';

// Set the settings
let settings = window.ExterminatorSettings || {};

// init the exterminator
new Exterminator(settings);
