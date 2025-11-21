const path = require("path");
const fs = require("fs");

const uploadFile = async (files, uploadDir = "uploads") => {
  if (!files) return {};

  // make sure folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const savedFiles = {};

  for (const key in files) {
    const file = files[key];

    const allowedMimes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    // allow all images + PDF + DOC/DOCX
    if (
      !file.mimetype.startsWith("image/") &&
      !allowedMimes.includes(file.mimetype)
    ) {
      throw new Error(`File type not allowed: ${file.name}`);
    }

    const fileName = Date.now() + "-" + file.name;
    const uploadPath = path.join(uploadDir, fileName);

    await file.mv(uploadPath);

    savedFiles[key] = fileName; // return path by input field name
  }

  return savedFiles;
};

module.exports = uploadFile;
