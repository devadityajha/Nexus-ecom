// post method
// content-type
// file size
// image type
// isFile

const fileValidation = async (req, res, next) => {
  if (req.method !== "POST") {
    return res.status(400).json({
      success: false,
      message: "Only post ethod is allowed",
    });
  }

  const contentType = req.header("content-type");
  if (!contentType || !contentType.includes("multipart/form-data")) {
    return res
      .status(400)
      .json({ success: false, message: "Multipart form data are allowed" });
  }

  if (!req.file) {
    return res.status(404).josn({ message: "File cant be skipped" });
  }

  const allowedTypes = ["image/jpeg", "image/jpge", "image/png"];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res
      .status(400)
      .json({ message: "Only allowed types are allowed", success: false });
  }

  const filesize = 1024 * 1024 * 5;
  if (req.file.size > filesize) {
    return res
      .status(400)
      .json({ message: "File size more than 5 mb is not allowed" });
  }
  next();
};

module.exports = fileValidation;
