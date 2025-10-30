const router = require("express").Router();
const upload = require("../middlewares/uploads");


router.post("/single", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ success: true, imageUrl });
});


router.post("/multiple", upload.array("images", 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  const imageUrls = req.files.map(
    (file) => `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
  );

  res.status(200).json({ success: true, imageUrls });
});

module.exports = router;
