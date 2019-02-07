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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .scrollable {
        overflow-y: auto;
        width: 100%;
        max-height: 100%;
    }

    table {
        tr:first-child /deep/ td {
            border-top: none;
        }
    }
</style>