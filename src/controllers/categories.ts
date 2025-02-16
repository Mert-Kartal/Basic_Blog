import { Request, response, Response } from "express";
import model from "src/models/categories";

interface categoryReqBody {
  name: string;
}
interface categoryReqParam {
  id: string;
}

interface ErrorResponse {
  error: string;
  code: string;
}

export default class controller {
  static create_category = async (
    req: Request<{}, {}, categoryReqBody>,
    res: Response
  ) => {
    const { name } = req.body;
    if (!name) {
      res.status(400).json({
        message: `Missing Data`,
        code: "MISSING_DATA",
      });
    }
    try {
      const create_category = await model.create_category(name);

      console.log(name);
      console.log(create_category);

      if ("error" in create_category) {
        res.status(400).json({
          message: create_category.error,
          code: create_category.code,
        });
      }

      res.status(201).json({
        message: `Category Created`,
        data: create_category,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  };

  static get_category = async (req: Request, res: Response) => {
    try {
      const all_categories = await model.get_categories();
      console.log(all_categories);
      res.status(200).json({
        message: `Success`,
        data: all_categories,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  };

  static get_category_id = async (
    req: Request<categoryReqParam>,
    res: Response
  ) => {
    const { id } = req.params;
    const category_id = +id;
    try {
      if (isNaN(category_id)) {
        res.status(400).json({
          message: `Invalid ID`,
          code: "INVALID_ID",
        });
      }
      const existing_category = await model.get_categories_id(category_id);

      if ("error" in existing_category) {
        res.status(400).json({
          message: existing_category.error,
          code: existing_category.code,
        });
      }
      res.status(200).json({
        message: `Category Found`,
        data: existing_category,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
      });
    }
  };

  static update_category = async (
    req: Request<categoryReqParam, {}, categoryReqBody>,
    res: Response
  ) => {
    const { id } = req.params;
    const { name } = req.body;
    const category_id = +id;
    try {
      if (!id || !name) {
        res.status(400).json({
          message: `Missing Data`,
          code: "MISSING_DATA",
        });
      }
      if (isNaN(category_id)) {
        res.status(400).json({
          message: `Invalid ID format`,
          code: "INVALID_ID",
        });
      }

      const update_category = await model.update_categories(category_id, name);

      if ("error" in update_category) {
        res.status(400).json({
          message: update_category.error,
          code: update_category.code,
        });
      }

      res.status(200).json({
        message: `Successfully Updated`,
        data: update_category,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
      });
    }
  };

  static delete_category = async (
    req: Request<categoryReqParam>,
    res: Response
  ) => {
    const { id } = req.params;
    const category_id = +id;
    try {
      if (isNaN(category_id)) {
        res.status(400).json({
          message: `Invalid ID format`,
          code: "INVALID_ID",
        });
      }

      const deleting_category = await model.delete_categories(category_id);

      if ("error" in deleting_category) {
        res.status(400).json({
          message: deleting_category.error,
          code: deleting_category.code,
        });
      }

      res.status(200).json({
        message: `Successfully deleted`,
        data: deleting_category,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
      });
    }
  };
}
