export default class User {
    constructor(data) {
        Object.assign(this, data);
    }

    get avatar_url() {
        return `https://cdn.discordapp.com/avatars/${this.discord_id}/${this.avatar}.png?size=32`
    }
}