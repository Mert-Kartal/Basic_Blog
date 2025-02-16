import model from "src/models/categories";
export default class controller {
    static create_category = async (req, res) => {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: `Missing Data`,
            });
        }
        console.log(name);
        try {
            const create_category = await model.create_category(name);
            if (typeof create_category === "string") {
                return res.status(400).json({
                    message: create_category,
                });
            }
            return res.status(201).json({
                message: `Category Created`,
                data: create_category,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: `Something went wrong ${error.message}`,
            });
        }
    };
    static get_category = async (req, res) => {
        try {
            const all_categories = await model.get_categories();
            console.log(all_categories);
            return res.status(200).json({
                message: `Success`,
                data: all_categories,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: `Something went wrong ${error.message}`,
            });
        }
    };
    static get_categories_id = async (req, res) => {
        const { id } = req.params;
        const category_id = +id;
        try {
            if (isNaN(category_id)) {
                return res.status(400).json({
                    message: `Invalid ID`,
                });
            }
            const existing_category = await model.get_categories_id(category_id);
            console.log(existing_category);
            if (typeof existing_category === "string") {
                return res.status(400).json({
                    message: existing_category,
                });
            }
            return res.status(200).json({
                message: `Category Introduced`,
                data: existing_category,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: `Something went wrong ${error.message}`,
            });
        }
    };
    static update_categories = async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        const category_id = +id;
        try {
            if (!id || !name) {
                return res.status(400).json({
                    message: `Missing Data`,
                });
            }
            if (isNaN(category_id)) {
                return res.status(400).json({
                    message: `Invalid ID format`,
                });
            }
            const update_category = await model.update_categories(category_id, name);
            if (typeof update_category === "string") {
                return res.status(500).json({
                    message: `Invalid Data`,
                });
            }
            return res.status(204).json({
                message: `Succesfully Updated`,
                data: update_category,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: `Something went wrong ${error.message}`,
            });
        }
    };
    static delete_categories = async (req, res) => {
        const { id } = req.params;
        const category_id = +id;
        try {
            if (isNaN(category_id)) {
                return res.status(400).json({
                    message: `Missing Data`,
                });
            }
            const deleting_category = await model.delete_categories(category_id);
            if (typeof deleting_category === "string") {
                return res.status(400).json({
                    message: deleting_category,
                });
            }
            return res.status(200).json({
                message: `Succesfully deleted`,
                data: deleting_category,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: `Something went wrong ${error.message}`,
            });
        }
    };
}
//# sourceMappingURL=categories.js.map