const NoteStore = require('../models/note');

class NotesService {
  // PUBLIC_INTERFACE
  /**
   * Create a note
   * @param {{title: string, content: string}} payload
   */
  create(payload) {
    return NoteStore.create(payload);
  }

  // PUBLIC_INTERFACE
  /**
   * List notes
   * @returns {Array}
   */
  list() {
    return NoteStore.list();
  }

  // PUBLIC_INTERFACE
  /**
   * Get note by id
   * @param {string} id
   * @returns {object|null}
   */
  get(id) {
    return NoteStore.get(id);
  }

  // PUBLIC_INTERFACE
  /**
   * Update note by id
   * @param {string} id
   * @param {{title?: string, content?: string}} changes
   * @returns {object|null}
   */
  update(id, changes) {
    return NoteStore.update(id, changes);
  }

  // PUBLIC_INTERFACE
  /**
   * Delete note by id
   * @param {string} id
   * @returns {boolean}
   */
  delete(id) {
    return NoteStore.delete(id);
  }
}

module.exports = new NotesService();
