<template>
    <div id="app">
        <notifications position="bottom left" group="main"></notifications>
        <b-container fluid class="container-main">
            <template v-if="loading">
                <b-col class="d-flex align-items-center justify-content-center" cols="12">
                    <div>
                        <loading-indicator></loading-indicator>
                        <h5 class="mt-3">Loading...</h5>
                    </div>
                </b-col>
            </template>
            <template v-else>
                <b-row class="row-header">
                    <b-col cols="12" class="header">
                        <topbar></topbar>
                    </b-col>
                    <b-col cols="12" class="color-bar bg-primary"></b-col>
                </b-row>
                <b-row class="row-body">
                    <router-view/>
                </b-row>
            </template>
        </b-container>
    </div>
</template>

<script>
    import swal from 'sweetalert';
    import Topbar from './components/Topbar'
    import User from './auth/User'
    import UserPreferencesManager from "./preferences/UserPreferencesManager";
    import QuestVisibilityManager from "./preferences/QuestVisibilityManager";

    export default {
        data() {
            return {
                loading: true,
                preferences: null,
                visibility: null,
            }
        },
        components: {
            Topbar
        },
        beforeCreate() {
            this.$eventBus.$on('fatal-error', () => {
                swal({
                    title: "Unrecoverable Error",
                    text: "Sorry, looks like something went wrong. Maybe refresh the page and try that again?",
                    icon: "error",
                    buttons: {
                        confirm: {
                            text: "Reload Page",
                            closeModal: false
                        }
                    }
                }).then(() => {
                    location.reload();
                });
            })
        },
        mounted() {
            this.loadUserData()
                .then(this.initializeMetrics)
                .then(() => {
                    this.loading = false;
                })
        },
        methods: {
            async loadUserData() {
                try {
                    const responseData = (await this.request('user')).data.result;
                    const userData = responseData ? new User(responseData) : null;
                    this.$auth.setUser(userData);
                } catch (_) {
                    this.$auth.setUser(null);
                }
            },

            async initializeMetrics() {
                if (this.$auth.check()) {
                    const user = this.$auth.user;

                    this.$bugsnag.user = {
                        id: this.$auth.id,
                        name: user.username,
                        email: user.email
                    };

                    this.$ga.set({
                        'userId': this.$auth.id,
                        'dimension1': !user.visible,
                        'dimension2': this.$auth.id
                    });
                    this.$ga.event('Auth', 'set-user');
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .container-main {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        .row-header {
            flex-shrink: 0;
            .color-bar {
                height: 2px;
            }
        }
        .row-body {
            flex-grow: 1;
            position: relative;
            min-height: 0;
        }
    }


</style>
