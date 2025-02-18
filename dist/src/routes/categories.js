import express from "express";
import controller from "src/controllers/categories";
const router = express.Router();
router.post("/", controller.create_category);
router.get("/", controller.get_category);
router.get("/:id", controller.get_category_id);
router.patch("/:id", controller.update_category);
router.delete("/", controller.delete_category);
export { router };
//# sourceMappingURL=categories.js.map