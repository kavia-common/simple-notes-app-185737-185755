 /**
  * Validation middleware for notes payload.
  * Ensures title and content are strings and present where required.
  */

 // PUBLIC_INTERFACE
 /**
  * Validate request body for creating a note.
  * @param {import('express').Request} req
  * @param {import('express').Response} res
  * @param {import('express').NextFunction} next
  */
function validateCreateNote(req, res, next) {
  const { title, content } = req.body || {};
  const errors = [];
  if (typeof title !== 'string' || title.trim().length === 0) {
    errors.push('title is required and must be a non-empty string');
  }
  if (typeof content !== 'string') {
    errors.push('content is required and must be a string');
  }
  if (errors.length > 0) {
    return res.status(400).json({
      statusCode: 400,
      status: 'error',
      message: 'Validation failed',
      errors,
    });
  }
  return next();
}

// PUBLIC_INTERFACE
/**
 * Validate request body for updating a note.
 * Allows partial fields but validates type if provided.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function validateUpdateNote(req, res, next) {
  const { title, content } = req.body || {};
  const errors = [];
  if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
    errors.push('title must be a non-empty string when provided');
  }
  if (content !== undefined && typeof content !== 'string') {
    errors.push('content must be a string when provided');
  }
  if (title === undefined && content === undefined) {
    errors.push('at least one of title or content must be provided');
  }
  if (errors.length > 0) {
    return res.status(400).json({
      statusCode: 400,
      status: 'error',
      message: 'Validation failed',
      errors,
    });
  }
  return next();
}

module.exports = {
  validateCreateNote,
  validateUpdateNote,
};
