import db from "src/db";
export default class model {
    static create_post = async (post_title, post_content, category_id) => {
        try {
            const exist_category = await db("category")
                .select("*")
                .where({ id: category_id })
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
            const exist_post = await db("post")
                .select("*")
                .where({ title: post_title, content: post_content, category_id })
                .first();
            if (exist_post && exist_post.deleted_at) {
                const re_create_post = await db("post")
                    .where({ title: post_title, content: post_content, category_id })
                    .update({ deleted_at: null })
                    .returning("*");
                return re_create_post[0];
            }
            const new_post = await db("post")
                .insert({
                category_id,
                title: post_title,
                content: post_content,
                created_at: new Date(),
            })
                .returning("*");
            return new_post[0];
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    static get_posts = async (category_id, status, showDeleted) => {
        try {
            let all_post = db("post").select("*");
            if (category_id) {
                all_post = all_post.where({ category_id });
            }
            if (status === "published") {
                all_post = all_post.whereNotNull("published_at");
            }
            else if (status === "draft") {
                all_post = all_post.whereNull("published_at");
            }
            if (showDeleted === "false") {
                all_post = all_post.whereNull("deleted_at");
            }
            else if (showDeleted === "onlyDeleted") {
                all_post = all_post.whereNotNull("deleted_at");
            }
            if ((await all_post).length === 0) {
                return {
                    error: "There are no post to show",
                    code: "NO_POST",
                };
            }
            return await all_post;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    static get_post_id = async (post_id) => {
        try {
            const exist_post = await db("post")
                .select("*")
                .where({
                id: post_id,
            })
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
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    static update_post = async (post_id, title, content, category_id, publish) => {
        try {
            const exist_post = await db("post")
                .select("*")
                .where({
                id: post_id,
            })
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
            const updateFields = {
                category_id,
                title,
                content,
            };
            if (publish === true) {
                updateFields.published_at = new Date();
            }
            const update_post = await db("post")
                .where({ id: post_id })
                .update(updateFields)
                .returning("*");
            return update_post[0];
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    static delete_post = async (post_title) => {
        try {
            const exist_post = await db("post")
                .select("*")
                .where({ title: post_title })
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
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
}
//# sourceMappingURL=posts.js.map