import express from "express";
import { router as category } from "./routes/categories";
import { router as post } from "./routes/posts";
const app = express();

app.use(express.json());
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Category
app.use("/category", category);
//Posts
app.use("/post", post);
//Comments

app.listen(PORT, () => console.log(`Server is working on port ${PORT}!`));
