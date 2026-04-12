const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4002;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ service: "account-service", status: "running" });
});

app.listen(PORT, () => {
  console.log(`Account service running on port ${PORT}`);
});