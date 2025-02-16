import express from "express";
import { router as category } from "./routes/categories";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/category", category);
app.listen(3000, () => console.log("Server is working on port 3000!"));
//# sourceMappingURL=index.js.map