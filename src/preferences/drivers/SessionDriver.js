import IUserPreferencesDriver from "../IUserPreferencesDriver";
import _ from 'lodash';

export default class SessionDriver extends IUserPreferencesDriver {
    constructor(vue) {
        super(vue);
    }

    async load() {
        const preferences = (localStorage.userPreferences) ? JSON.parse(localStorage.userPreferences) : {};

        return _.isObjectLike(preferences) ? preferences : {};
    }

    async save(data) {
        localStorage.userPreferences = JSON.stringify(data);
    }
}