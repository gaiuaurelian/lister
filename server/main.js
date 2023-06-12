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

app.get("/api/lists/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const data = await fs.readFile("./server/lists.json", { encoding: "utf8" });
    let mainList = null;
    let children = [];
    let content = JSON.parse(data);
    if (name === "workspace") {
      mainList = null;
      children = content.filter((x) => x.type.toLowerCase() === name);
    } else {
      mainList = content.find((x) => x.name === name);
      children = mainList.items.map((itemName) => {
        return content.find((c) => c.name === itemName);
      });
    }

    res.send({ error: false, message: { list: mainList, children } });
  } catch (err) {
    console.log("ERROR", err);
    res.send({ error: true, message: err });
  }
});

app.post("/api/lists", async (req, res) => {
  console.log("BODY", req.body);
  console.log("QUERY_PARAMS", req.query);
  try {
    const data = await fs.readFile("./server/lists.json", { encoding: "utf8" });
    let content = JSON.parse(data);
    console.log("[CONTENT]", content);
    if (req.query.withParent) {
      for (const list of content) {
        if (list.name === req.query.withParent) {
          list.items.push(req.body.name);
        }
      }
    }
    content = [...content, req.body];
    console.log("[CONTENT]", content);
    await fs.writeFile("./server/lists.json", JSON.stringify(content));
    res.send({ error: false, message: "Saved" });
  } catch (err) {
    console.log("ERROR", err);
    res.send({ error: true, message: err });
  }
});

app.delete("/api/lists/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const data = await fs.readFile("./server/lists.json", { encoding: "utf8" });
    let content = JSON.parse(data);
    const filtered = content.filter((x) => x.name !== name);
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
