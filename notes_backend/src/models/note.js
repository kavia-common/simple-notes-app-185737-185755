const fs = require('fs');
const path = require('path');

/**
 * Simple in-memory Note store with JSON persistence.
 * This is not meant for production but provides basic durability across restarts.
 */
class NoteStore {
  constructor() {
    this.notes = new Map();
    this.persistPath = path.join(__dirname, '../../data/notes.json');
    this._loadFromDisk();
  }

  /**
   * Generate a simple unique id based on timestamp and increment.
   * In production, you'd use UUIDs.
   */
  _generateId() {
    const base = Date.now().toString(36);
    let counter = 0;
    let id = `${base}-${counter}`;
    while (this.notes.has(id)) {
      counter += 1;
      id = `${base}-${counter}`;
    }
    return id;
  }

  /**
   * Load notes from disk into memory.
   */
  _loadFromDisk() {
    try {
      if (fs.existsSync(this.persistPath)) {
        const raw = fs.readFileSync(this.persistPath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach((n) => {
            if (n && n.id) {
              this.notes.set(n.id, n);
            }
          });
        }
      }
    } catch (err) {
      // If load fails, log and continue with empty store
      console.error('Failed to load notes from disk:', err.message);
    }
  }

  /**
   * Persist in-memory notes to disk.
   */
  _saveToDisk() {
    try {
      const dataDir = path.dirname(this.persistPath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const arr = Array.from(this.notes.values());
      fs.writeFileSync(this.persistPath, JSON.stringify(arr, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed to save notes to disk:', err.message);
    }
  }

  // PUBLIC_INTERFACE
  /**
   * Create a note.
   * @param {{title: string, content: string}} payload
   * @returns {{id: string, title: string, content: string, createdAt: string, updatedAt: string}}
   */
  create(payload) {
    const now = new Date().toISOString();
    const note = {
      id: this._generateId(),
      title: payload.title,
      content: payload.content,
      createdAt: now,
      updatedAt: now,
    };
    this.notes.set(note.id, note);
    this._saveToDisk();
    return note;
  }

  // PUBLIC_INTERFACE
  /**
   * List all notes.
   * @returns {Array<{id: string, title: string, content: string, createdAt: string, updatedAt: string}>}
   */
  list() {
    return Array.from(this.notes.values());
  }

  // PUBLIC_INTERFACE
  /**
   * Get a note by id.
   * @param {string} id
   * @returns {object|null}
   */
  get(id) {
    return this.notes.get(id) || null;
  }

  // PUBLIC_INTERFACE
  /**
   * Update a note by id.
   * @param {string} id
   * @param {{title?: string, content?: string}} changes
   * @returns {object|null}
   */
  update(id, changes) {
    const existing = this.notes.get(id);
    if (!existing) return null;
    const updated = {
      ...existing,
      ...changes,
      updatedAt: new Date().toISOString(),
    };
    this.notes.set(id, updated);
    this._saveToDisk();
    return updated;
  }

  // PUBLIC_INTERFACE
  /**
   * Delete a note by id.
   * @param {string} id
   * @returns {boolean} true if deleted, false if not found
   */
  delete(id) {
    const existed = this.notes.delete(id);
    if (existed) {
      this._saveToDisk();
    }
    return existed;
  }
}

module.exports = new NoteStore();
