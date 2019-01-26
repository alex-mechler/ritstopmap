<template>
    <b-navbar toggleable="md">

        <b-navbar-brand href="#">RIT PokeStop Map</b-navbar-brand>

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav id="nav_collapse">

            <b-navbar-nav class="ml-auto" v-if="loading">
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto" v-else-if="$auth.check()">
                <b-nav-text class="avatar-text mr-5">
                    <img :src="$auth.user.avatar_url" class="rounded-circle mr-1" alt="User Avatar">
                    {{ $auth.user.username }}
                </b-nav-text>
                <b-nav-item @click="onLogout" :href="authUrl('/api/auth/logout')"><i class="fas fa-sign-out-alt"></i> Logout
                </b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto" v-else>
                <b-nav-item @click="onLogin" :href="authUrl('/api/auth/login')"><i class="fab fa-discord"></i> Login with Discord
                </b-nav-item>
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
    import bNavText from 'bootstrap-vue/es/components/nav/nav-text'

    export default {
        name: "Header",
        props: ['loading'],
        components: {
            bNavbar,
            bNavbarToggle,
            bNavbarBrand,
            bCollapse,
            bNavbarNav,
            bNavItem,
            bNavText
        },
        methods: {
            authUrl(path) {
                return this.$config.login_base + path;
            },
            onLogin() {
                this.$ga.event({
                    eventCategory: 'Auth',
                    eventAction: 'login',
                    transport: 'beacon'
                });
                return true;
            },
            onLogout() {
                this.$ga.event({
                    eventCategory: 'Auth',
                    eventAction: 'logout',
                    transport: 'beacon'
                });
                return true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .avatar-text {
        padding-top: calc(1.22rem - 16px);
        padding-bottom: calc(1.22rem - 16px);
        img {
            height: 32px;
            width: 32px;
        }
    }
</style>