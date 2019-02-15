import _ from 'lodash'

export default class QuestVisibilityManager {
    constructor(preferences) {
        this._preferences = preferences;
        this._hiddenQuests = new Set(_.isArray(this._preferences.data.hiddenQuests) ? this._preferences.data.hiddenQuests : []);
        this._priorityQuests = new Set(_.isArray(this._preferences.data.priorityQuests) ? this._preferences.data.priorityQuests : []);
    }

    static async make(preferencesContract) {
        const preferences = await preferencesContract;
        return new QuestVisibilityManager(preferences);
    }


    async showQuest(id) {
        this._hiddenQuests.delete(id);
        return this.saveData();
    }

    async hideQuest(id) {
        this._hiddenQuests.add(id);
        return this.saveData();
    }

    async prioritizeQuest(id) {
        this._priorityQuests.add(id);
        return this.saveData();
    }

    async deprioritizeQuest(id) {
        this._priorityQuests.delete(id);
        return this.saveData();
    }

    isVisible(id) {
        return !this._hiddenQuests.has(id);
    }

    isPriority(id) {
        return this._priorityQuests.has(id);
    }

    async clear() {
        this._hiddenQuests.clear();
        return this.saveData();
    }

    async clearPrioritized() {
        this._priorityQuests.clear();
        return this.saveData();
    }

    async saveData() {
        if (this.hasOwnProperty('__ob__')) {
            this.__ob__.dep.notify();
        }

        this._preferences.data.hiddenQuests = Array.from(this._hiddenQuests);
        this._preferences.data.priorityQuests = Array.from(this._priorityQuests);
        return this._preferences.save();
    }
}