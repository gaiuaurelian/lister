const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs/promises");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/api/lists", async (req, res) => {
  try {
    const data = await fs.readFile("./server/lists.json", { encoding: "utf8" });
    let content = JSON.parse(data);
    res.send({ error: false, message: content });
  } catch (err) {
    console.log("ERROR", err);
    res.send({ error: true, message: err });
  }
});

app.get("/api/lists/:name",async (req, res) => {
  try {
    const name = req.params.name;
    const data = await fs.readFile("./server/lists.json", { encoding: "utf8" });
    let content = JSON.parse(data);
    const found = content.find(x => x.name === name);
    res.send({ error: false, message: found });
  } catch (err) {
    console.log("ERROR", err);
    res.send({ error: true, message: err });
  }
});

app.post("/api/lists", async (req, res) => {
  console.log("BODY", req.body);
  try {
    const data = await fs.readFile("./server/lists.json", { encoding: "utf8" });
    let content = JSON.parse(data);
    console.log("[CONTENT]", content);
    content = [...content, req.body];
    console.log("[CONTENT]", content);
    await fs.writeFile("./server/lists.json", JSON.stringify(content));
    res.send({ error: false, message: "Saved" });
  } catch (err) {
    console.log("ERROR", err);
    res.send({ error: true, message: err });
  }
});

app.delete("/api/lists/:name",async (req, res) => {
  try {
    const name = req.params.name;
    const data = await fs.readFile("./server/lists.json", { encoding: "utf8" });
    let content = JSON.parse(data);
    const filtered = content.filter(x => x.name !== name);
    await fs.writeFile("./server/lists.json", JSON.stringify(filtered));
    res.send({ error: false, message: "Deleted" });
  } catch (err) {
    console.log("ERROR", err);
    res.send({ error: true, message: err });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
