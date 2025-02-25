import model from "src/models/posts";
export default class controller {
    static create_post = async (req, res) => {
        const { title, content, category_id } = req.body;
        try {
            if (!title || !content || !category_id) {
                res.status(400).json({
                    message: `Missing Data`,
                    code: "MISSING_DATA",
                });
                return;
            }
            if (isNaN(+category_id)) {
                res.status(400).json({
                    message: `Invalid ID`,
                    code: "INVALID_ID",
                });
                return;
            }
            const num_category_id = +category_id;
            const create_post = await model.create_post(title, content, num_category_id);
            if ("error" in create_post) {
                res.status(400).json({
                    error: create_post.error,
                    code: create_post.code,
                });
                return;
            }
            res.status(201).json({
                message: `CategoryPost Created`,
                data: create_post,
            });
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
                code: "INTERNAL_SERVER_ERROR",
            });
        }
    };
    static get_posts = async (req, res) => {
        const { category, status = "all", showDeleted = "false" } = req.query;
        try {
            if (!["true", "false", "onlyDeleted"].includes(showDeleted) ||
                !["published", "draft", "all"].includes(status) ||
                (category && isNaN(+category))) {
                res.status(400).json({
                    message: "Invalid data",
                    code: "INVALID_DATA",
                });
                return;
            }
            const category_id = category ? +category : undefined;
            const all_posts = await model.get_posts(category_id, status, showDeleted);
            if ("error" in all_posts) {
                res.status(400).json({
                    message: all_posts.error,
                    code: all_posts.code,
                });
                return;
            }
            res.status(200).json({
                message: "Success",
                data: all_posts,
            });
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
                code: "INTERNAL_SERVER_ERROR",
            });
        }
    };
    static get_post_id = async (req, res) => {
        const id = req.params.id;
        console.log(id);
        try {
            if (id === ":id") {
                res.status(400).json({
                    message: `Missing ID`,
                    code: "MISSING_ID",
                });
                return;
            }
            if (isNaN(+id)) {
                res.status(400).json({
                    message: `Invalid ID`,
                    code: "INVALID_ID",
                });
                return;
            }
            const post_id = +id;
            const existing_post = await model.get_post_id(post_id);
            if ("error" in existing_post) {
                res.status(400).json({
                    message: existing_post.error,
                    code: existing_post.code,
                });
                return;
            }
            res.status(200).json({
                message: `Post Found`,
                data: existing_post,
            });
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
                code: "INTERNAL_SERVER_ERROR",
            });
        }
    };
    static update_post = async (req, res) => {
        const id = req.params.id;
        const { title, content, category_id, publish } = req.body;
        try {
            if (id === ":id" || isNaN(+id)) {
                res.status(400).json({
                    message: "Invalid post ID",
                    code: "INVALID_POST_ID",
                });
                return;
            }
            const post_id = +id;
            const num_category_id = category_id ? +category_id : undefined;
            if (!title && !content && !category_id && !publish) {
                res.status(400).json({
                    message: "Missing Data",
                    code: "MISSING_DATA",
                });
                return;
            }
            const update_post = await model.update_post(post_id, title, content, num_category_id, publish);
            if ("error" in update_post) {
                res.status(400).json({
                    message: update_post.error,
                    code: update_post.code,
                });
                return;
            }
            res.status(200).json({
                message: `Successfully Updated`,
                data: update_post,
            });
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
            });
        }
    };
    static delete_post = async (req, res) => {
        const { title } = req.body;
        try {
            if (!title) {
                res.status(400).json({
                    message: "Missing Data",
                    code: "MISSING_DATA",
                });
                return;
            }
            const deleting_post = await model.delete_post(title);
            if ("error" in deleting_post) {
                res.status(400).json({
                    message: deleting_post.error,
                    code: deleting_post.code,
                });
                return;
            }
            res.status(200).json({
                message: `Successfully deleted`,
                data: deleting_post,
            });
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
            });
        }
    };
}
//# sourceMappingURL=posts.js.map