import express from "express";
import controller from "src/controllers/categories";
const router = express.Router();
router.post("/", controller.create_category);
router.get("/", controller.get_category);
export { router };
//# sourceMappingURL=categories.js.map