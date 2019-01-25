import ServerSideDriver from "./drivers/ServerSideDriver";
import SessionDriver from "./drivers/SessionDriver";

export default class UserPreferencesManager {
    constructor(driver, data = null) {
        this._driver = driver;
        this.data = data;
    }

    static async make(vue) {
        const Driver = vue.$auth.check() ? ServerSideDriver : SessionDriver;
        const driver = new Driver(vue);
        const data = await driver.load();
        return new UserPreferencesManager(driver, data);
    }

    async save() {
        return this._driver.save(this.data);
    }
}