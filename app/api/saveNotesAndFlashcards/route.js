import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.join(process.cwd(), 'data', 'notes.json');

// Helper functions to read and write data
function readData() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { notes: [], flashcards: [] }; // Return empty structure if file does not exist
  }
}

function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// API route handler
export async function GET(req, res) {
  const data = readData();
  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(req) {
  const { action, note, noteId, flashcards } = await req.json();
  const currentData = readData();

  if (action === "create") {
    // Add new note
    const newNote = { id: uuidv4(), ...note };
    currentData.notes.push(newNote);
  } else if (action === "update") {
    // Update existing note
    currentData.notes = currentData.notes.map((existingNote) =>
      existingNote.id === note.id ? { ...existingNote, ...note } : existingNote
    );
  } else if (action === "delete") {
    // Delete specific note by ID
    currentData.notes = currentData.notes.filter((existingNote) => existingNote.id !== noteId);
  } else if (action === "addFlashcards") {
    // Add new flashcards
    const newFlashcards = flashcards.map((card) => ({ id: uuidv4(), ...card }));
    currentData.flashcards.push(...newFlashcards);
  }

  // Write updated data back to notes.json
  try {
    writeData(currentData);
    return new Response(JSON.stringify({ message: 'Data saved successfully' }), { status: 200 });
  } catch (error) {
    console.error("Error saving data:", error);
    return new Response(JSON.stringify({ error: 'Failed to save data' }), { status: 500 });
  }
}
