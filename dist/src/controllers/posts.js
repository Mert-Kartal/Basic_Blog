import model from "src/models/posts";
export default class controller {
    static create_post = async (req, res) => {
        const { title, content, category_id } = req.body;
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
        try {
            const create_post = await model.create_post(title, content, num_category_id);
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
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
                code: "INTERNAL_SERVER_ERROR",
            });
        }
    };
    static get_posts = async (req, res) => {
        try {
            const all_posts = await model.get_posts();
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
        const { id } = req.params;
        try {
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
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
                code: "INTERNAL_SERVER_ERROR",
            });
        }
    };
    static update_post = async (req, res) => {
        const { id } = req.params;
        const { title, content, category_id } = req.body;
        if (!id || isNaN(+id)) {
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
        try {
            const update_post = await model.update_post(post_id, title, content, num_category_id);
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
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
            });
        }
    };
    static delete_post = async (req, res) => {
        const { title } = req.body;
        if (!title) {
            res.status(400).json({
                message: "Missing Data",
                code: "MISSING_DATA",
            });
        }
        try {
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
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
            });
        }
    };
}
//# sourceMappingURL=posts.js.map