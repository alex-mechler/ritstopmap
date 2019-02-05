<template>
    <tr>
        <td class="cell-rank">{{ index + 1 }}</td>
        <td class="cell-avatar"><img :src="avatarUrl" class="rounded-circle mr-1"
                                     alt="User Avatar" @error="image_error = true"></td>
        <td>{{ leader.username }}</td>
        <td class="cell-score">{{ leader.score }}</td>
    </tr>
</template>

<script>
    const default_user_image = require('../../icons/missinguser.png');

    export default {
        name: "LeaderboardRow",
        props: ['leader', 'index'],
        data() {
            return {
                image_error: false
            }
        },
        computed: {
            avatarUrl() {
                if (this.image_error || this.leader.discord_id === null || this.leader.avatar === null) {
                    return default_user_image;
                }

                return `https://cdn.discordapp.com/avatars/${this.leader.discord_id}/${this.leader.avatar}.png?size=32`;
            }
        }
    }
</script>

<style lang="scss" scoped>
    td {
        vertical-align: middle !important;
    }

    .cell-rank {
        font-size: 32px;
        width: 1px;
        padding-right: 1rem;
        text-align: center;
    }

    .cell-avatar {
        width: 1px;
        img {
            height: 32px;
            width: 32px;
        }
    }

    .cell-score {
        width: 1px;
        text-align: right;
    }
</style>