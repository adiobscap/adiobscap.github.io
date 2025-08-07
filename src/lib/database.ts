import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'contacts.db');
const db = new Database(dbPath);

// Create the contacts table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export function insertContact(contact: ContactSubmission) {
  const stmt = db.prepare(`
    INSERT INTO contacts (name, email, company, message)
    VALUES (?, ?, ?, ?)
  `);
  
  return stmt.run(contact.name, contact.email, contact.company || null, contact.message);
}

export function getAllContacts() {
  const stmt = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC');
  return stmt.all();
}

export default db;