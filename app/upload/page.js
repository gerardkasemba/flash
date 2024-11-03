"use client"
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';

// Set the correct worker source for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setPreviewFile(URL.createObjectURL(file)); // Generate preview URL for the PDF
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Your Textbook</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      {previewFile && (
        <Document
          file={previewFile}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error("Error loading PDF:", error)}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      )}

      {numPages && (
        <div className="mt-4 text-center">
          <p>Page {pageNumber} of {numPages}</p>
        </div>
      )}

      <button onClick={handleUpload} className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Upload
      </button>
    </div>
  );
}
