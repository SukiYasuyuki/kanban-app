import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';

const db = new Database('kanban.db');

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS boards (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS columns (
    id TEXT PRIMARY KEY,
    board_id TEXT NOT NULL,
    title TEXT NOT NULL,
    position INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES boards (id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_columns_board_id ON columns(board_id);
  CREATE INDEX IF NOT EXISTS idx_columns_position ON columns(board_id, position);
`);

export interface Board {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

export interface Column {
  id: string;
  board_id: string;
  title: string;
  position: number;
  created_at: string;
}

export const boardQueries = {
  getAll: () => {
    const stmt = db.prepare('SELECT * FROM boards ORDER BY created_at DESC');
    return stmt.all() as Board[];
  },

  getById: (id: string) => {
    const stmt = db.prepare('SELECT * FROM boards WHERE id = ?');
    return stmt.get(id) as Board | undefined;
  },

  create: (title: string, description?: string) => {
    const id = randomUUID();
    const stmt = db.prepare('INSERT INTO boards (id, title, description) VALUES (?, ?, ?)');
    stmt.run(id, title, description || null);
    return { id, title, description: description || null };
  },

  delete: (id: string) => {
    const stmt = db.prepare('DELETE FROM boards WHERE id = ?');
    return stmt.run(id);
  }
};

export const columnQueries = {
  getByBoardId: (boardId: string) => {
    const stmt = db.prepare('SELECT * FROM columns WHERE board_id = ? ORDER BY position ASC');
    return stmt.all(boardId) as Column[];
  },

  create: (boardId: string, title: string, position: number) => {
    const id = randomUUID();
    const stmt = db.prepare('INSERT INTO columns (id, board_id, title, position) VALUES (?, ?, ?, ?)');
    stmt.run(id, boardId, title, position);
    return { id, board_id: boardId, title, position };
  },

  createDefaultColumns: (boardId: string) => {
    const defaultColumns = [
      { title: 'To Do', position: 0 },
      { title: 'In Progress', position: 1 },
      { title: 'Done', position: 2 }
    ];

    const stmt = db.prepare('INSERT INTO columns (id, board_id, title, position) VALUES (?, ?, ?, ?)');
    
    return defaultColumns.map(col => {
      const id = randomUUID();
      stmt.run(id, boardId, col.title, col.position);
      return { id, board_id: boardId, title: col.title, position: col.position };
    });
  }
};

export default db;