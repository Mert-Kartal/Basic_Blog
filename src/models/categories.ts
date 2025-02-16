import db from "src/db";

interface Category {
  id: number;
  name: string;
  created_at: Date;
  deleted_at?: Date | null;
}

interface ErrorResponse {
  error: string;
  code: string;
}

type CategoryResponse = Category | ErrorResponse;

export default class model {
  static create_category = async (
    category_name: string
  ): Promise<CategoryResponse> => {
    try {
      const existing_category = await db("category")
        .select("name", "deleted_at")
        .where({ name: category_name })
        .first();

      if (existing_category) {
        if (existing_category.deleted_at) {
          const re_create_category = await db("category")
            .where({ name: category_name })
            .update({ deleted_at: null, created_at: new Date() })
            .returning("*");

          return re_create_category[0];
        }
        return {
          error: "Category already exists",
          code: "CATEGORY_EXISTS",
        };
      }

      const new_category = await db("category")
        .insert({
          name: category_name,
          created_at: new Date(),
        })
        .returning("*");
      return new_category[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  static get_categories = async (): Promise<Category[]> => {
    try {
      const all_categories = await db("category")
        .select("ıd", "name", "created_at")
        .whereNull("deleted_at")
        .returning("*");
      return all_categories;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  static get_categories_id = async (
    category_id: number
  ): Promise<CategoryResponse> => {
    try {
      if (isNaN(category_id)) {
        return {
          error: "ID not found",
          code: "INVALID_ID",
        };
      }
      const existing_category = await db("category")
        .select("ıd", "name")
        .where({ ıd: category_id })
        .whereNull("deleted_at")
        .first();

      if (!existing_category) {
        return {
          error: "Category not found",
          code: "CATEGORY_NOT_FOUND",
        };
      }
      return existing_category;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  static update_categories = async (
    category_id: number,
    category_name: string
  ): Promise<CategoryResponse> => {
    try {
      const existing_category = await db("category")
        .select("ıd", "name")
        .where({ ıd: category_id })
        .whereNull("deleted_at")
        .first();

      if (!existing_category) {
        return {
          error: "Category not found",
          code: "CATEGORY_NOT_FOUND",
        };
      }

      if (existing_category.name === category_name) {
        return {
          error: "Name is same, no changes needed",
          code: "NO_CHANGES_NEEDED",
        };
      }

      const existing_category_name = await db("category")
        .select("ıd", "name")
        .where({ name: category_name })
        .whereNull("deleted_at")
        .first();

      if (existing_category_name) {
        return {
          error: "This category already exist",
          code: "NO_CHANGES_MADE",
        };
      }

      const updated_category = await db("category")
        .where({ ıd: category_id })
        .update({ name: category_name })
        .returning("*");

      return updated_category[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  static delete_categories = async (
    category_name: string
  ): Promise<CategoryResponse> => {
    try {
      const existing_category = await db("category")
        .select("name", "deleted_at")
        .where({ name: category_name })
        .first();

      if (!existing_category) {
        return {
          error: "Category not found",
          code: "CATEGORY_NOT_FOUND",
        };
      }

      if (existing_category.deleted_at !== null) {
        return {
          error: "This category is already deleted",
          code: "ALREADY_DELETED",
        };
      }

      const deleting_category = await db("category")
        .where({ name: category_name })
        .update({ deleted_at: new Date() })
        .returning("*");

      if (deleting_category.length === 0) {
        return {
          error: "Operation failed",
          code: "DELETE_FAILED",
        };
      }

      return deleting_category[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
}
