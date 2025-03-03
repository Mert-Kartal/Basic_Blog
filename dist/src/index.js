import express from "express";
import { router as category } from "./routes/categories";
import { router as post } from "./routes/posts";
import { router as comment } from "./routes/comments";
const app = express();
app.use(express.json());
const PORT = 3000;
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/category", category);
app.use("/post", post);
app.use("/comment", comment);
app.listen(PORT, () => console.log(`Server is working on port ${PORT}!`));
//# sourceMappingURL=index.js.map