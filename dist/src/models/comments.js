import db from "src/db";
export default class model {
    static create_comment = async (post_id, content, commenter_name) => {
        try {
            const exist_post = await db("post")
                .select("*")
                .where({ id: post_id })
                .first();
            if (!exist_post) {
                return {
                    error: "This Post Doesn't Exist",
                    code: "POST_DOESN'T_EXIST",
                };
            }
            const create_comment = await db("comment")
                .insert({
                post_id,
                content,
                commenter_name,
                created_at: new Date(),
            })
                .returning("*");
            return create_comment[0];
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    static get_comments = async (post_id, commenter) => {
        try {
            let all_comments = db("comment").select("*");
            if (post_id) {
                all_comments = all_comments.where({ post_id });
            }
            if (commenter) {
                all_comments = all_comments.where({ commenter_name: commenter });
            }
            if ((await all_comments).length === 0) {
                return {
                    error: "There are no comment to show",
                    code: "NO_COMMENT",
                };
            }
            return await all_comments;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    static get_comment_id = async (comment_id) => {
        try {
            const get_comment = await db("comment")
                .select("*")
                .where({ id: comment_id })
                .first();
            if (!get_comment) {
                return {
                    error: "This Comment Doesn't Exist",
                    code: "COMMENT_DOESN'T_EXIST",
                };
            }
            return get_comment;
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    static update_comment = async (id, content) => {
        try {
            const exist_comment = await db("comment")
                .select("*")
                .where({ id })
                .first();
            if (!exist_comment) {
                return {
                    error: "This Comment Doesn't Exist",
                    code: "COMMENT_DOESN'T_EXIST",
                };
            }
            const update_comment = await db("comment")
                .where({ id })
                .update({ content })
                .returning("*");
            return update_comment[0];
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    static delete_comment = async (post_id, content, commenter_name) => {
        try {
            const exist_post = await db("post")
                .select("*")
                .where({ id: post_id })
                .first();
            if (!exist_post) {
                return {
                    error: "This Post Doesn't Exist",
                    code: "POST_DOESN'T_EXIST",
                };
            }
            const exist_comment = await db("comment")
                .select("*")
                .where({ content, commenter_name, post_id })
                .first();
            if (!exist_comment) {
                return {
                    error: "This Comment Doesn't Exist",
                    code: "COMMENT_DOESN'T_EXIST",
                };
            }
            const delete_comment = await db("comment")
                .where({ content, commenter_name, post_id })
                .delete()
                .returning("*");
            if (delete_comment.length === 0) {
                return {
                    error: "Operation failed",
                    code: "DELETE_FAILED",
                };
            }
            return delete_comment[0];
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
}
//# sourceMappingURL=comments.js.map