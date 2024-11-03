const handleUpload = async () => {
  const formData = new FormData();
  formData.append("pdf", selectedFile);

  try {
    const response = await axios.post("/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Assuming the response contains the file path
    const filePath = response.data.file.path;

    // Store the file path in local storage
    localStorage.setItem("uploadedPDF", filePath);

    alert("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
