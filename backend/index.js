const express = require("express");

const connectToMongo = require("./db");
const multer = require("multer");

const app = express();
connectToMongo();
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, call) => {
    call(null, "images");
  },
  filename: (req, file, call) => {
    call(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file uploaded");
});
//Access Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/categories", require("./routes/categories"));

app.listen(3001, () => {
  console.log("Backend server connected on port 30001");
});
