<template>
    <div id="app">
        <div class="loader"
        <notifications position="bottom left" group="main"></notifications>
        <b-container fluid class="container-main">
            <b-row class="row-header">
                <b-col cols="12" class="header">
                    <topbar></topbar>
                </b-col>
                <b-col cols="12" class="color-bar bg-primary"></b-col>
            </b-row>
            <b-row class="row-body">
                <!--<router-view/>-->
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import swal from 'sweetalert';
    import Topbar from './components/Topbar'

    export default {
        data() {
            return {
                loading: true
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
        }
    }


</style>
