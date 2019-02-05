<template>
    <div class="scrollable">
        <b-container class="mt-3">
            <b-row v-if="loading">
                <b-col cols="12">
                    <div class="mt-5 text-center">
                        <loading-indicator></loading-indicator>
                        <h5 class="mt-3">Loading...</h5>
                    </div>
                </b-col>
            </b-row>
            <template v-else>
                <b-row>
                    <b-col cols="12">
                        <h1>Leaderboard</h1>
                    </b-col>
                </b-row>
                <table class="table table-sm">
                    <leaderboard-row v-for="(leader, index) in leaders" :leader="leader" :index="index"></leaderboard-row>
                </table>
            </template>
        </b-container>
    </div>
</template>

<script>
    import LeaderboardRow from '../components/LeaderboardRow'

    export default {
        name: "Leaderboard",
        components: {
            LeaderboardRow
        },
        data() {
            return {
                loading: true,
                leaders: null
            }
        },
        mounted() {
            this.loadLeaderboard()
                .then(() => {
                    this.loading = false;
                })
        },
        methods: {
            async loadLeaderboard() {
                this.leaders = (await this.request('leaderboard')).data.result;
                this.leaders = [{
                    "username": "TelepathicGrunt",
                    "score": 111,
                    "avatar": "81e834e5eb89d010ab79f27b7bb5dce3",
                    "discord_id": "369282168624644106"
                }, {
                    "username": "frogsoup.parker",
                    "score": 51,
                    "avatar": "bd355b14e31c7dd4e22dd9e936323ec5",
                    "discord_id": "369894089224880148"
                }, {
                    "username": "Yimanator808 L40",
                    "score": 50,
                    "avatar": "75442cd519a1b185cfb3e69cb8e89822",
                    "discord_id": "351407269482856458"
                }, {
                    "username": "AllanThe",
                    "score": 35,
                    "avatar": "7352e3acbce6692a0d2b42fb58767ba9",
                    "discord_id": "132253005167722496"
                }, {
                    "username": "laauurenp",
                    "score": 27,
                    "avatar": "6c277a2c84d83319ba971d7a117d8afa",
                    "discord_id": "343554644775010314"
                }, {
                    "username": "CJT_Jackton",
                    "score": 12,
                    "avatar": "5f9665425162dad116020cf3c4e08c81",
                    "discord_id": "496003231747538946"
                }, {
                    "username": "shanimal",
                    "score": 7,
                    "avatar": "31c7964805a1e9e7dd83b67fb3d77257",
                    "discord_id": "205784304758947842"
                }, {
                    "username": "waldo",
                    "score": 7,
                    "avatar": "205008fa0c176de90d846c71a963e085",
                    "discord_id": "341935726117781506"
                }, {
                    "username": "Atticus",
                    "score": 4,
                    "avatar": null,
                    "discord_id": "431603850701701126"
                }, {
                    "username": "dinogolfer",
                    "score": 4,
                    "avatar": "ca7cadcfc1b6ff898000c57c16845b2a",
                    "discord_id": "264578218030399490"
                }, {
                    "username": "«RG»Hades",
                    "score": 2,
                    "avatar": "42ee1ef65cdd1ceebae5ea3edfdb5806",
                    "discord_id": "151533432785076224"
                }, {
                    "username": "Red (Jovangreninja40).",
                    "score": 2,
                    "avatar": "8727dc4cb04af854a1f445ef2ad0baa1",
                    "discord_id": "349649799215185920"
                }, {
                    "username": "kswaglol",
                    "score": 1,
                    "avatar": "d951f734fa0270d56f13c1a85d989ab9",
                    "discord_id": "350744854931701760"
                }, {
                    "username": "kswag",
                    "score": 1,
                    "avatar": null,
                    "discord_id": "454126018630909964"
                }, {
                    "username": "iBLIV",
                    "score": 1,
                    "avatar": "7b8b0339b80c6da5d0dbcbe074a28a83",
                    "discord_id": "194614972846833664"
                }, {"username": "Bob0718CON L35", "score": 1, "avatar": null, "discord_id": "474340438564798464"}]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .scrollable {
        overflow-y: scroll;
        width: 100%;
    }

    table {
        tr:first-child /deep/ td {
            border-top: none;
        }
    }
</style>