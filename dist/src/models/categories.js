import db from "src/db";
export default class model {
    static create_category = async (category_name) => {
        try {
            const existing_category = await db("category")
                .select("name", "deleted_at")
                .where({ name: category_name })
                .first();
            if (existing_category) {
                if (existing_category.deleted_at) {
                    return await db("category")
                        .where({ name: category_name })
                        .update({ deleted_at: null, created_at: new Date() })
                        .returning("*")
                        .first();
                }
                return "Bu kategori bulunmaktadır";
            }
            const new_category = await db("category")
                .insert({
                name: category_name,
                created_at: new Date(),
            })
                .returning("*");
            return new_category[0];
        }
        catch (error) {
            throw new Error("bir şeyler ters gitti:" + error.message);
        }
    };
    static get_categories = async () => {
        try {
            const all_categories = await db("category")
                .select("id", "name", "created_at")
                .whereNull("deleted_at")
                .returning("*");
            return all_categories;
        }
        catch (error) {
            throw new Error("bir şeyler ters gitti:" + error.message);
        }
    };
    static get_categories_id = async (category_id) => {
        try {
            if (isNaN(category_id)) {
                return "ID bulunmamakta";
            }
            const existing_category = await db("category")
                .select("id", "name")
                .where({ id: category_id })
                .whereNull("deleted_at")
                .first();
            if (!existing_category) {
                return "Yanlış ID";
            }
            return existing_category;
        }
        catch (error) {
            throw new Error("bir şeyler ters gitti:" + error.message);
        }
    };
    static update_categories = async (category_id, category_name) => {
        try {
            const existing_category = await db("category")
                .select("id", "name")
                .where({ id: category_id })
                .whereNull("deleted_at")
                .first();
            if (!existing_category) {
                return "Yanlış ID";
            }
            if (existing_category.name === category_name) {
                return "Isim aynı, değişiklik yapılmaz";
            }
            return await db("category")
                .where({ id: category_id })
                .update({ name: category_name })
                .returning("*")
                .first();
        }
        catch (error) {
            throw new Error("bir şeyler ters gitti:" + error.message);
        }
    };
    static delete_categories = async (category_id) => {
        try {
            const existing_category = await db("category")
                .select("id", "deleted_at")
                .where({ id: category_id })
                .first();
            if (!existing_category) {
                return "Hatalı işlem";
            }
            if (existing_category.deleted_at !== null) {
                return { error: "Bu kategori zaten silinmiş" };
            }
            const deleting_category = await db("category")
                .where({ id: category_id })
                .update({ deleted_at: new Date() })
                .returning("*");
            if (deleting_category.length === 0) {
                return "İşlem başarısız";
            }
            return deleting_category;
        }
        catch (error) {
            throw new Error("bir şeyler ters gitti:" + error.message);
        }
    };
}
//# sourceMappingURL=categories.js.map