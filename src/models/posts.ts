import db from "src/db";

interface Post_Content {
  ıd: number;
  category_ıd: number;
  title: string;
  content: string;
  created_at: Date;
  published_at?: Date;
  deleted_at?: Date;
}

interface Post_Error {
  error: string;
  code: string;
}

type Post_Response = Post_Content | Post_Error;

export default class model {
  static create_post = async (
    post_title: string,
    post_content: string,
    category_ıd: number
  ): Promise<Post_Response> => {
    try {
      const exist_category = await db("category")
        .select("*")
        .where({ ıd: category_ıd })
        .first();

      if (!exist_category) {
        return {
          error: "Couldn't find this category",
          code: "MISSING_CATEGORY",
        };
      }

      if (exist_category.deleted_at) {
        return {
          error: "This category is deleted",
          code: "DELETED_CATEGORY",
        };
      }

      const new_post = await db("post")
        .insert({
          category_ıd,
          title: post_title,
          content: post_content,
          created_at: new Date(),
        })
        .returning("*");

      return new_post[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  static get_posts = async (): Promise<Post_Content[]> => {
    try {
      const all_post = await db("post")
        .select("*")
        .whereNull("deleted_at")
        .returning("*");

      return all_post;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  static get_post_id = async (post_id: number) => {
    try {
      const exist_post = await db("post")
        .select("*")
        .where({
          ıd: post_id,
        })
        .returning("*")
        .first();

      if (!exist_post) {
        return {
          error: "This Post Doesn't exist",
          code: "INVALID_POST_ID",
        };
      }
      if (exist_post.deleted_at) {
        return {
          error: "This Post is Deleted",
          code: "DELETED_POST",
        };
      }
      return exist_post;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  static update_post = async (
    post_id: number,
    post_title?: string,
    post_content?: string,
    category_id?: number
  ): Promise<Post_Response> => {
    try {
      const exist_post = await db("post")
        .select("*")
        .where({
          ıd: post_id,
        })
        .returning("*")
        .first();

      if (!exist_post) {
        return {
          error: "This Post Doesn't Exist",
          code: "POST_DOESN'T_EXIST",
        };
      }

      if (exist_post.deleted_at) {
        return {
          error: "This Post is Deleted",
          code: "DELETED_POST",
        };
      }

      const update_post = await db("post")
        .where({ ıd: post_id })
        .update({
          category_ıd: category_id,
          title: post_title,
          content: post_content,
        })
        .returning("*");

      return update_post[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  static delete_post = async (post_title: string): Promise<Post_Response> => {
    try {
      const exist_post = await db("post")
        .select("*")
        .where({ title: post_title })
        .returning("*")
        .first();

      if (!exist_post) {
        return {
          error: "This Post Doesn't Exist",
          code: "DOESN'T_EXIST",
        };
      }

      if (exist_post.deleted_at) {
        return {
          error: "This Post ıs Already Deleted",
          code: "ALREADY_DELETED",
        };
      }
      const delete_post = await db("post")
        .where({ title: post_title })
        .update({ deleted_at: new Date() })
        .returning("*");

      if (delete_post.length === 0) {
        return {
          error: "Operation failed",
          code: "DELETE_FAILED",
        };
      }

      return delete_post[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
}
