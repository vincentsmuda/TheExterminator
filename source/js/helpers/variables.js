// Import our Variables class
const Variables = require('../classes/Variables'),
      variables = require('../settings/variables').vars;

// Export the variables
module.exports = {
  scss: new Variables({
    is_scss: true,
    variables: variables
  }),
  js: new Variables({
    is_scss: false,
    variables: variables
  })
};
