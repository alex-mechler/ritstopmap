<template>
    <b-navbar toggleable="md">

        <b-navbar-brand href="#">RIT PokeStop Map</b-navbar-brand>

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav class="ml-auto">
                <b-nav-item href="#"><i class="fab fa-discord"></i> Login with Discord</b-nav-item>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
    import bNavbar from 'bootstrap-vue/es/components/navbar/navbar'
    import bNavbarToggle from 'bootstrap-vue/es/components/navbar/navbar-toggle'
    import bNavbarBrand from 'bootstrap-vue/es/components/navbar/navbar-brand'
    import bCollapse from 'bootstrap-vue/es/components/collapse/collapse'
    import bNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav'
    import bNavItem from 'bootstrap-vue/es/components/nav/nav-item'

    export default {
        name: "Header",
        components: {
            bNavbar,
            bNavbarToggle,
            bNavbarBrand,
            bCollapse,
            bNavbarNav,
            bNavItem
        }
    }
</script>

<style scoped>

</style>