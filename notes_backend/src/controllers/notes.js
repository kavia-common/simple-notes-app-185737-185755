const notesService = require('../services/notes');

class NotesController {
  // PUBLIC_INTERFACE
  /**
   * Create a note.
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */
  create(req, res) {
    const note = notesService.create(req.body);
    return res.status(201).json(note);
  }

  // PUBLIC_INTERFACE
  /**
   * List notes.
   */
  list(req, res) {
    const notes = notesService.list();
    return res.status(200).json(notes);
  }

  // PUBLIC_INTERFACE
  /**
   * Get by id.
   */
  get(req, res) {
    const { id } = req.params;
    const note = notesService.get(id);
    if (!note) {
      return res.status(404).json({
        statusCode: 404,
        status: 'error',
        message: 'Note not found',
      });
    }
    return res.status(200).json(note);
  }

  // PUBLIC_INTERFACE
  /**
   * Update by id.
   */
  update(req, res) {
    const { id } = req.params;
    const updated = notesService.update(id, req.body);
    if (!updated) {
      return res.status(404).json({
        statusCode: 404,
        status: 'error',
        message: 'Note not found',
      });
    }
    return res.status(200).json(updated);
  }

  // PUBLIC_INTERFACE
  /**
   * Delete by id.
   */
  delete(req, res) {
    const { id } = req.params;
    const deleted = notesService.delete(id);
    if (!deleted) {
      return res.status(404).json({
        statusCode: 404,
        status: 'error',
        message: 'Note not found',
      });
    }
    return res.status(204).send();
  }
}

module.exports = new NotesController();
