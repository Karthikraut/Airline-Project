// repositories/crud-repository.js
export default class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return await this.model.create(data);
    }

    async get(id) {
        const response = await this.model.findById(id);
        if (!response) {
            throw new Error("Data not found");
        }
        return response;
    }

    async getAll() {
        return await this.model.find();
    }

    async update(id, data) {
        const response = await this.model.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!response) {
            throw new Error("Data not found for update");
        }

        return response;
    }

    async destroy(id) {
        const response = await this.model.findByIdAndDelete(id);

        if (!response) {
            throw new Error("Data not found for delete");
        }

        return response;
    }
}
