import express from "express";
import controller from "src/controllers/comments";
const router = express.Router();
router.post("/", controller.create_comment);
router.get("/", controller.get_comment);
router.get("/:id", controller.get_comment_id);
router.patch("/:id", controller.update_comment);
router.delete("/", controller.delete_comment);
export { router };
//# sourceMappingURL=comments.js.map