import { Request, Response } from "express";
import model from "src/models/posts";

interface Post_Request_Body {
  title: string;
  content: string;
  category_id: string;
}

type Partial_Req_Body = Partial<Post_Request_Body>;
export default class controller {
  static create_post = async (
    req: Request<{}, {}, Post_Request_Body>,
    res: Response
  ) => {
    const { title, content, category_id } = req.body;

    try {
      if (!title || !content || !category_id) {
        res.status(400).json({
          message: `Missing Data`,
          code: "MISSING_DATA",
        });
      }
      if (isNaN(+category_id)) {
        res.status(400).json({
          message: `Invalid ID`,
          code: "INVALID_ID",
        });
      }
      const num_category_id = +category_id;
      const create_post = await model.create_post(
        title,
        content,
        num_category_id
      );

      if ("error" in create_post) {
        res.status(400).json({
          error: create_post.error,
          code: create_post.code,
        });
      }

      res.status(201).json({
        message: `CategoryPost Created`,
        data: create_post,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  };
  static get_posts = async (req: Request, res: Response) => {
    try {
      const all_posts = await model.get_posts();

      res.status(200).json({
        message: "Success",
        data: all_posts,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  };
  static get_post_id = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    console.log(id);
    try {
      if (id === ":id") {
        res.status(400).json({
          message: `Missing ID`,
          code: "MISSING_ID",
        });
      }

      if (isNaN(+id)) {
        res.status(400).json({
          message: `Invalid ID`,
          code: "INVALID_ID",
        });
      }

      const post_id = +id;

      const existing_post = await model.get_post_id(post_id);

      if ("error" in existing_post) {
        res.status(400).json({
          message: existing_post.error,
          code: existing_post.code,
        });
      }

      res.status(200).json({
        message: `Post Found`,
        data: existing_post,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  };
  static update_post = async (
    req: Request<{ id: string }, {}, Partial_Req_Body>,
    res: Response
  ) => {
    const id = req.params.id;
    const { title, content, category_id } = req.body;

    try {
      if (id === ":id" || isNaN(+id)) {
        res.status(400).json({
          message: "Invalid post ID",
          code: "INVALID_POST_ID",
        });
      }

      const post_id = +id;

      const num_category_id = category_id ? +category_id : undefined;

      if (!title && !content && !category_id) {
        res.status(400).json({
          message: "Missing Data",
          code: "MISSING_DATA",
        });
      }
      const update_post = await model.update_post(
        post_id,
        title,
        content,
        num_category_id
      );

      if ("error" in update_post) {
        res.status(400).json({
          message: update_post.error,
          code: update_post.code,
        });
      }

      res.status(200).json({
        message: `Successfully Updated`,
        data: update_post,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
      });
    }
  };
  static delete_post = async (
    req: Request<{}, {}, { title: string }>,
    res: Response
  ) => {
    const { title } = req.body;

    try {
      if (!title) {
        res.status(400).json({
          message: "Missing Data",
          code: "MISSING_DATA",
        });
      }
      const deleting_post = await model.delete_post(title);

      if ("error" in deleting_post) {
        res.status(400).json({
          message: deleting_post.error,
          code: deleting_post.code,
        });
      }
      res.status(200).json({
        message: `Successfully deleted`,
        data: deleting_post,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
      });
    }
  };
}
