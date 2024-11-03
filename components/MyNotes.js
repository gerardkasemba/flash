"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";

// Set workerSrc to the locally served worker file
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function NotesAndFlashcards() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [newCategory, setNewCategory] = useState("Uncategorized");
  const [editNoteId, setEditNoteId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editCategory, setEditCategory] = useState("Uncategorized");
  const [flashcards, setFlashcards] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const categories = ["Uncategorized", "Science", "Math", "History", "Language", "Technology"];
  const notesPerPage = 5;

  useEffect(() => {
    const loadNotesAndFlashcards = async () => {
      try {
        const response = await fetch("/api/saveNotesAndFlashcards", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setNotes(data.notes || []);
          setFlashcards(data.flashcards || []);
        } else {
          console.error("Failed to load notes and flashcards.");
        }
      } catch (error) {
        console.error("Error loading notes and flashcards:", error);
      }
    };

    loadNotesAndFlashcards();
  }, []);

  const updateData = async (action, data = {}) => {
    try {
      await fetch("/api/saveNotesAndFlashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action, ...data }),
      });
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update data.");
    }
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const newNoteData = { id: uuidv4(), content: newNote.trim(), category: newCategory };
      const updatedNotes = [newNoteData, ...notes];
      setNotes(updatedNotes);
      setNewNote("");
      setNewCategory("Uncategorized");

      updateData("create", { note: newNoteData });
    }
  };

  const handleEditNote = (note) => {
    setEditNoteId(note.id);
    setEditContent(note.content);
    setEditCategory(note.category);
  };

  const handleSaveEdit = () => {
    const updatedNotes = notes.map((note) => {
      if (note.id === editNoteId) {
        return { ...note, content: editContent, category: editCategory };
      }
      return note;
    });
    setNotes(updatedNotes);
    setEditNoteId(null);
    setEditContent("");
    setEditCategory("Uncategorized");

    updateData("update", { note: { id: editNoteId, content: editContent, category: editCategory } });
  };

  const handleCancelEdit = () => {
    setEditNoteId(null);
    setEditContent("");
    setEditCategory("Uncategorized");
  };

  const handleRemoveNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);

    updateData("delete", { noteId });
  };

  const handleGenerateFlashcards = async () => {
    if (notes.length === 0) {
      alert("Please add some notes to generate flashcards.");
      return;
    }

    setIsGenerating(true);
    setFlashcards([]);

    try {
      const notesText = notes.map((note) => note.content).join("\n");

      const messages = [
        {
          role: "system",
          content: "You are an assistant that generates flashcards based on provided notes.",
        },
        {
          role: "user",
          content: `Create flashcards from the following notes. Each flashcard should have a question and answer in this format:
                    Question: What is the main idea of [note]?
                    Answer: [answer to the question].
                    Notes: ${notesText}`,
        },
      ];

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer `,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: messages,
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to generate flashcards.");
      }

      const data = await response.json();
      const generatedText = data.choices[0].message.content.trim();

      const generatedFlashcards = generatedText
        .split("\n")
        .filter((line) => line.toLowerCase().includes("question") && line.toLowerCase().includes("answer"))
        .map((line) => {
          const [question, answer] = line.split("Answer:");
          return {
            id: uuidv4(),
            question: question.replace("Question:", "").trim(),
            answer: answer.trim(),
          };
        });

      setFlashcards(generatedFlashcards);

      updateData("addFlashcards", { flashcards: generatedFlashcards });
    } catch (error) {
      const errorMessage = error.message;
      console.error("Error generating flashcards:", errorMessage);
      alert(`Failed to generate flashcards. Error: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
  const totalPages = Math.ceil(notes.length / notesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setFileUrl(fileURL);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Upload PDF or DOC File</h2>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="mb-4"
          />
          {fileUrl && selectedFile.type === "application/pdf" ? (
            <div className="mt-4">
              <Viewer fileUrl={fileUrl} />
            </div>
          ) : (
            <p className="text-gray-600">Please upload a PDF to preview it here.</p>
          )}
        </div>

{/* Right Section: Notes, Forms, and Flashcards */}
<div>
  <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Notes and Flashcards</h1>

  <div className="mb-8">
    <textarea
      value={newNote}
      onChange={(e) => setNewNote(e.target.value)}
      placeholder="Write a new note..."
      className="w-full p-4 border border-gray-300 rounded-lg mb-2"
    />
    <select
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded-lg mb-2"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
    <button
      onClick={handleAddNote}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg"
    >
      Add Note
    </button>
  </div>

  <div className="mb-10">
    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Notes</h2>
    {currentNotes.length > 0 ? (
      <ul className="space-y-4">
        {currentNotes.map((note) => (
          <li key={note.id} className="bg-blue-50 p-4 rounded-lg shadow-md">
            {editNoteId === note.id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end space-x-2">
                  <button onClick={handleSaveEdit} className="bg-green-500 text-white px-4 py-1 rounded">
                    Save
                  </button>
                  <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-1 rounded">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-700 mb-2">
                  <strong>Note:</strong> {note.content}
                </p>
                <p className="text-gray-500">
                  <strong>Category:</strong> {note.category}
                </p>
                <div className="flex items-center justify-between">
                  <button onClick={() => handleEditNote(note)} className="text-blue-500 hover:text-blue-700">
                    Edit
                  </button>
                  <button onClick={() => handleRemoveNote(note.id)} className="text-red-500 hover:text-red-700">
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No notes yet. Start adding notes above.</p>
    )}

    <div className="flex justify-center mt-6 space-x-2">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => paginate(i + 1)}
          className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  </div>

  <div className="text-center mb-8">
    <button
      onClick={handleGenerateFlashcards}
      className={`bg-green-600 text-white px-6 py-2 rounded-lg shadow-lg ${
        isGenerating && "opacity-50 cursor-not-allowed"
      }`}
      disabled={isGenerating}
    >
      {isGenerating ? "Generating Flashcards..." : "Generate Flashcards from Notes"}
    </button>
  </div>

  <div>
    <h2 className="text-2xl font-semibold text-blue-600 mb-4">Generated Flashcards</h2>
    {flashcards.length > 0 ? (
      <ul className="space-y-4">
        {flashcards.map((flashcard) => (
          <li
            key={flashcard.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
          >
            <p className="font-semibold text-lg text-gray-800">
              <strong>Q:</strong> {flashcard.question}
            </p>
            <p className="mt-2 text-gray-700">
              <strong>A:</strong> {flashcard.answer}
            </p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No flashcards generated yet.</p>
    )}
  </div>
</div>
      </div>
      <Footer />
    </>
  );
}
