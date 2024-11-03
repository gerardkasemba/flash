import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "notes.json");

export async function GET() {
  try {
    // Check if the file exists, if not, return empty data
    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ notes: [], flashcards: [] }), { status: 200 });
    }

    // Read the notes and flashcards from notes.json
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error loading notes and flashcards:", error);
    return new Response(JSON.stringify({ error: "Failed to load notes and flashcards" }), {
      status: 500,
    });
  }
}
