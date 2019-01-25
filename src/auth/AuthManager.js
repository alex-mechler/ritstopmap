import User from './User'

export default class AuthManager {
    constructor(user = null) {
        this._user = user;
    }

    /**
     * Determine if the current user is authenticated
     *
     * @returns {boolean}
     */
    check() {
        return this.user !== null;
    }

    /**
     * Determine if the current user is a guest
     *
     * @returns {boolean}
     */
    guest() {
        return !this.check();
    }

    /**
     * Get the currently authenticated user
     *
     * @returns {(User, null)}
     */
    get user() {
        return this._user;
    }

    /**
     * Get the ID for the currently authenticated user.
     *
     * @returns {number}
     */
    get id() {
        return this.user.id;
    }

    /**
     * Sets the current user.
     *
     * @param {User} user
     */
    setUser(user) {
        this._user = user;
    }
}