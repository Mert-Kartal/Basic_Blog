import model from "src/models/comments";
export default class controller {
    static create_comment = async (req, res) => {
        const { post_id, content, commenter_name } = req.body;
        try {
            if (!post_id || !content || !commenter_name) {
                res.status(400).json({
                    message: `Missing Data`,
                    code: "MISSING_DATA",
                });
                return;
            }
            if (isNaN(+post_id)) {
                res.status(400).json({
                    message: `Invalid ID`,
                    code: "INVALID_ID",
                });
                return;
            }
            const num_post_id = +post_id;
            const create_comment = await model.create_comment(num_post_id, content, commenter_name);
            if ("error" in create_comment) {
                res.status(400).json({
                    message: `No Comment Could Be Made `,
                    code: "NO_COMMENT_MADE",
                });
                return;
            }
            res.status(201).json({
                message: `Comment Made`,
                data: create_comment,
            });
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
                code: "INTERNAL_SERVER_ERROR",
            });
        }
    };
    static get_comment = async (req, res) => {
        let { post_id, commenter } = req.query;
        try {
            if (post_id && isNaN(+post_id)) {
                res.status(400).json({
                    message: `Invalid Data `,
                    code: "INVALID_DATA",
                });
                return;
            }
            const num_post_id = post_id ? +post_id : undefined;
            const all_comments = await model.get_comments(num_post_id, commenter);
            res.status(200).json({
                message: `Success`,
                data: all_comments,
            });
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
                code: "INTERNAL_SERVER_ERROR",
            });
        }
    };
    static get_comment_id = async (req, res) => {
        const id = req.params.id;
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
            const comment_id = +id;
            const existing_comment = await model.get_comment_id(comment_id);
            if ("error" in existing_comment) {
                res.status(400).json({
                    message: existing_comment.error,
                    code: existing_comment.code,
                });
                return;
            }
            res.status(200).json({
                message: `Category Found`,
                data: existing_comment,
            });
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
            });
        }
    };
    static update_comment = async (req, res) => {
        const id = req.params.id;
        const { content } = req.body;
        try {
            if (id === ":id" || !content) {
                res.status(400).json({
                    message: `Missing Data`,
                    code: "MISSING_DATA",
                });
                return;
            }
            if (isNaN(+id)) {
                res.status(400).json({
                    message: `Invalid Id`,
                    code: "INVALID_ID",
                });
                return;
            }
            const comment_id = +id;
            const update_comment = await model.update_comment(comment_id, content);
            if ("error" in update_comment) {
                res.status(400).json({
                    message: update_comment.error,
                    code: update_comment.code,
                });
                return;
            }
            res.status(200).json({
                message: `Successfully Updated`,
                data: update_comment,
            });
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
            });
        }
    };
    static delete_comment = async (req, res) => {
        const { commenter_name, post_id, content } = req.body;
        try {
            if (!commenter_name || !post_id || !content) {
                res.status(400).json({
                    message: `Missing DATA`,
                    code: "MISSING_DATA",
                });
                return;
            }
            if (isNaN(+post_id)) {
                res.status(400).json({
                    message: `Invalid DATA`,
                    code: "INVALID_DATA",
                });
                return;
            }
            const num_post_id = +post_id;
            const delete_comment = await model.delete_comment(num_post_id, content, commenter_name);
            if ("error" in delete_comment) {
                res.status(400).json({
                    message: delete_comment.error,
                    code: delete_comment.code,
                });
                return;
            }
            res.status(200).json({
                message: `Successfully deleted`,
                data: delete_comment,
            });
        }
        catch (error) {
            res.status(500).json({
                message: `Something went wrong ${error.message}`,
            });
        }
    };
}
//# sourceMappingURL=comments.js.map