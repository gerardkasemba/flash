import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to handle file uploads
  },
};

export default async function handler(req, res) {
  // Ensure uploads directory exists
  const uploadDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = new formidable.IncomingForm();
  form.uploadDir = uploadDir; // Set the uploads directory
  form.keepExtensions = true; // Keep file extensions

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "File upload failed" });
    }

    // Allow only certain file types for security (optional)
    const file = files.pdf;
    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: "Invalid file type" });
    }

    res.status(200).json({
      message: "File uploaded successfully",
      file: {
        name: file.originalFilename,
        path: file.filepath,
      },
    });
  });
}
