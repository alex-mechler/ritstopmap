import NotImplementedError from "../support/NotImplementedError";

export default class IUserPreferencesDriver {
    /**
     * Create a new driver instance
     *
     * @param {Vue} vue
     */
    constructor(vue) {}

    // noinspection JSMethodCanBeStatic
    /**
     * Load user preferences data
     *
     * @returns {Promise<Object>}
     */
    async load() {
        throw new NotImplementedError();
    }

    // noinspection JSMethodCanBeStatic
    /**
     * Save user preferences data
     *
     * @param {Object} data
     * @returns {Promise<void>}
     */
    async save(data) {
        throw new NotImplementedError();
    }
}