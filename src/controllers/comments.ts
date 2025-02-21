import { Request, Response } from "express";
import model from "src/models/comments";

interface Create_comment {
  post_id: string;
  content: string;
  commenter_name: string;
}
export default class controller {
  static create_comment = async (
    req: Request<{}, {}, Create_comment>,
    res: Response
  ) => {
    const { post_id, content, commenter_name } = req.body;

    try {
      if (!post_id || !content || !commenter_name) {
        res.status(400).json({
          message: `Missing Data`,
          code: "MISSING_DATA",
        });
      }

      if (isNaN(+post_id)) {
        res.status(400).json({
          message: `Invalid ID`,
          code: "INVALID_ID",
        });
      }
      const num_post_id = +post_id;
      const create_comment = await model.create_comment(
        num_post_id,
        content,
        commenter_name
      );

      if ("error" in create_comment) {
        res.status(400).json({
          message: `No Comment Could Be Made `,
          code: "NO_COMMENT_MADE",
        });
      }

      res.status(201).json({
        message: `Comment Made`,
        data: create_comment,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  };
  static get_comment = async (req: Request, res: Response) => {
    try {
      const all_comments = await model.get_comments();
      res.status(200).json({
        message: `Success`,
        data: all_comments,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  };
  static get_comment_id = async (
    req: Request<{ id: string }>,
    res: Response
  ) => {
    const id = req.params.id;

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

      const comment_id = +id;
      const existing_comment = await model.get_comment_id(comment_id);

      if ("error" in existing_comment) {
        res.status(400).json({
          message: existing_comment.error,
          code: existing_comment.code,
        });
      }
      res.status(200).json({
        message: `Category Found`,
        data: existing_comment,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
      });
    }
  };
  static update_comment = async (
    req: Request<{ id: string }, {}, { content: string }>,
    res: Response
  ) => {
    const id = req.params.id;
    const { content } = req.body;

    try {
      if (id === ":id" || !content) {
        res.status(400).json({
          message: `Missing Data`,
          code: "MISSING_DATA",
        });
      }

      if (isNaN(+id)) {
        res.status(400).json({
          message: `Invalid Id`,
          code: "INVALID_ID",
        });
      }
      const comment_id = +id;
      const update_comment = await model.update_comment(comment_id, content);
      if ("error" in update_comment) {
        res.status(400).json({
          message: update_comment.error,
          code: update_comment.code,
        });
      }
      res.status(200).json({
        message: `Successfully Updated`,
        data: update_comment,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
      });
    }
  };
  static delete_comment = async (
    req: Request<
      {},
      {},
      { commenter_name: string; post_id: string; content: string }
    >,
    res: Response
  ) => {
    const { commenter_name, post_id, content } = req.body;

    try {
      if (!commenter_name || !post_id || !content) {
        res.status(400).json({
          message: `Missing DATA`,
          code: "MISSING_DATA",
        });
      }

      if (isNaN(+post_id)) {
        res.status(400).json({
          message: `Invalid DATA`,
          code: "INVALID_DATA",
        });
      }
      const num_post_id = +post_id;
      const delete_comment = await model.delete_comment(
        num_post_id,
        content,
        commenter_name
      );

      if ("error" in delete_comment) {
        res.status(400).json({
          message: delete_comment.error,
          code: delete_comment.code,
        });
      }

      res.status(200).json({
        message: `Successfully deleted`,
        data: delete_comment,
      });
    } catch (error) {
      res.status(500).json({
        message: `Something went wrong ${(error as Error).message}`,
      });
    }
  };
}
