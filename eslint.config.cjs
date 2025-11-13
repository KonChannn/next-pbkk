require = require('esm')(module /*, options*/)
module.exports = {
  extends: ['next', 'prettier'],
  rules: {
    'no-unused-vars': 'off', // Disable the 'no-unused-vars' rule
    // Add any other rules you want to customize here
  },
}