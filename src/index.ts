import express from "express";
import { router as category } from "./routes/categories";
const app = express();

app.use(express.json());
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello World");
});

//Category
app.use("/category", category);
//Posts

//Comments

app.listen(PORT, () => console.log(`Server is working on port ${PORT}!`));
