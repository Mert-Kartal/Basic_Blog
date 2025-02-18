import express from "express";
import controller from "src/controllers/posts";
const router = express.Router();
router.post("/", controller.create_post);
router.get("/", controller.get_posts);
router.get("/:id", controller.get_post_id);
router.patch("/:id", controller.update_post);
router.delete("/", controller.delete_post);
export { router };
//# sourceMappingURL=posts.js.map