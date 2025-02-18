import express, { RequestHandler } from "express";
import controller from "src/controllers/categories";

const router = express.Router();

router.post("/", controller.create_category as unknown as RequestHandler);
router.get("/", controller.get_category as unknown as RequestHandler);
router.get("/:id", controller.get_category_id as unknown as RequestHandler);
router.patch("/:id", controller.update_category as unknown as RequestHandler);
router.delete("/", controller.delete_category as unknown as RequestHandler);

export { router };
