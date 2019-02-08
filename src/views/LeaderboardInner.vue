<template>
    <b-row v-if="loading">
        <b-col cols="12">
            <div class="mt-5 text-center">
                <loading-indicator></loading-indicator>
                <h5 class="mt-3">Loading...</h5>
            </div>
        </b-col>
    </b-row>
    <table class="table table-sm" v-else>
        <leaderboard-row v-for="(leader, index) in leaders" :leader="leader" :index="index"></leaderboard-row>
    </table>
</template>

<script>
    import LeaderboardRow from '../components/LeaderboardRow'

    export default {
        name: "LeaderboardInner",
        components: {
            LeaderboardRow
        },
        props: ['endpoint'],
        data() {
            return {
                loading: true,
                leaders: null
            }
        },
        mounted() {
            this.loadData();
        },
        watch: {
            '$route': 'loadData'
        },
        methods: {
            loadData() {
                this.loading = true;
                this.loadLeaderboard()
                    .then(() => {
                        this.loading = false;
                    })
            },
            async loadLeaderboard() {
                this.leaders = (await this.request(this.endpoint)).data.result;
            }
        }
    }
</script>

<style lang="scss" scoped>
    table {
        tr:first-child /deep/ td {
            border-top: none;
        }
    }
</style>