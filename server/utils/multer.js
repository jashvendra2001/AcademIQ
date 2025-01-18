import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload"); // Path where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // This can be customized to include `uniqueSuffix` if needed
    console.log(file.originalname);
  },
});

// Export `upload` with `.single()` if you’re uploading one file
export const upload = multer({ storage: storage }).single("profilePhoto"); // or use .array("files") for multiple files
export const uploadCourseThambnail = multer({ storage: storage }).single(
  "courseThumbnail"
);
export const videoUpload12 = multer({ storage: storage }).single("file");
