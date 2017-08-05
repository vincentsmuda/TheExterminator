// Import our Variables class
const Variables = require('../classes/Variables'),
      variables = require('../settings/variables').vars;

// Export the variables
module.exports = new Variables({
  variables: variables
});
