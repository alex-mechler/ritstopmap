import _ from 'lodash'

export default class QuestVisibilityManager {
    constructor(preferences) {
        this._preferences = preferences;
        this._hiddenQuests = new Set(_.isArray(this._preferences.data.hiddenQuests) ? this._preferences.data.hiddenQuests : [])
    }

    async showQuest(id) {
        this._hiddenQuests.delete(id);
        return this.saveData();
    }

    async hideQuest(id) {
        this._hiddenQuests.add(id);
        return this.saveData();
    }

    isVisible(id) {
        return !this._hiddenQuests.has(id);
    }

    async clear() {
        this._hiddenQuests.clear();
        return this.saveData();
    }

    async saveData() {
        if (this.hasOwnProperty('__ob__')) {
            this.__ob__.dep.notify();
        }

        this._preferences.data.hiddenQuests = Array.from(this._hiddenQuests);
        return this._preferences.save();
    }
}