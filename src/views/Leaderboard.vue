<template>
    <div class="scrollable">
        <b-container class="mt-3">
            <b-row>
                <b-col cols="12">
                    <h1>Leaderboards</h1>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="12">
                    <b-nav pills class="justify-content-center">
                        <b-nav-item :to="{ name: 'leaderboard.seasonal' }" exact>Seasonal</b-nav-item>
                        <b-nav-item :to="{ name: 'leaderboard.overall' }" exact>Overall</b-nav-item>
                    </b-nav>
                </b-col>
            </b-row>
            <router-view></router-view>
        </b-container>
    </div>
</template>

<script>
    import bNav from 'bootstrap-vue/es/components/nav/nav'
    import bNavItem from 'bootstrap-vue/es/components/nav/nav-item'

    export default {
        name: "Leaderboard",
        components: {
            bNav,
            bNavItem
        }
    }
</script>

<style lang="scss" scoped>
    .scrollable {
        overflow-y: auto;
        width: 100%;
        max-height: 100%;
    }
</style>