<template>
    <b-container fluid class="container-main">
        <b-row class="row-header">
            <b-col cols="12" class="header">
                <topbar :loading="loading" :user="user"></topbar>
            </b-col>
        </b-row>
        <b-row class="row-body">
            <b-col class="p-0">
                <stop-map></stop-map>
            </b-col>
            <b-col cols="2" class="sidebar">
                <sidebar></sidebar>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import Topbar from '../components/Topbar';
    import StopMap from '../components/StopMap';
    import Sidebar from '../components/Sidebar';

    export default {
        name: "Home2",
        components: {
            Topbar,
            StopMap,
            Sidebar
        },
        data() {
            return {
                loading: true,
                user: false
            }
        },
        mounted() {
            Promise.all([
                this.loadUserData()
            ]).then(() => {
                this.loading = false;
            });
        },
        methods: {
            loadUserData() {
                return new Promise(resolve => {
                    this.request('auth/user')
                        .then(response => {
                            this.user = response.data ? response.data : false;
                            resolve();
                        })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
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
        }
        .row-body {
            flex-grow: 1;
        }
    }
    .sidebar {
        max-height: 100%;
        overflow-y: auto;
        min-width: 250px;
        transition: width .3s;
        transition-timing-function: ease;
        background-color: #f1f1f1;
    }

</style>