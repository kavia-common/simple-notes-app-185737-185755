const { validateCreateNote, validateUpdateNote } = require('./validateNote');

// This file will export middleware as the application grows
module.exports = {
  validateCreateNote,
  validateUpdateNote,
};
