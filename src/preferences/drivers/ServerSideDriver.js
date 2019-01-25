import IUserPreferencesDriver from "../IUserPreferencesDriver";
import debounce from 'debounce-promise';
import _ from 'lodash';

export default class ServerSideDriver extends IUserPreferencesDriver {
    constructor(vue) {
        super(vue);
        this._vue = vue;
        this.saveFunction = debounce(this.saveToServer, 1000);
    }

    async load() {
        const preferences = (await this._vue.$http('user/preferences')).data.result.preferences;

        return _.isObjectLike(preferences) ? preferences : {};
    }

    async save(data) {
        await this.saveFunction(data);
    }

    async saveToServer(data) {
        return this._vue.$http().post('user/preferences', {
            'preferences': data
        });
    }
}