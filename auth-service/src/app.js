const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ service: "auth-service", status: "running" });
});

app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});