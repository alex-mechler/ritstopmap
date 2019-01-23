<template>
    <div>
        <notifications position="bottom left" group="main"></notifications>
        <b-container fluid class="container-main">
            <b-row class="row-header">
                <b-col cols="12" class="header">
                    <topbar :loading="loading" :user="user"></topbar>
                </b-col>
                <b-col cols="12" class="loading-indicator bg-primary"></b-col>
            </b-row>
            <b-row class="row-body">
                <b-col class="p-0">
                    <stop-map :stops="filteredStops" :getIcon="getIcon" @focus-stop="onFocusStop"></stop-map>
                </b-col>
                <b-col cols="2" class="sidebar">
                    <sidebar :stops="filteredStops" :getIcon="getIcon" @focus-stop="onFocusStop" @generate-list="onGenerateList"></sidebar>
                </b-col>
            </b-row>
        </b-container>

        <stop-detail-modal ref="focusedStopModal" :stop="focusedStop" :quests="quests" :show-submit="user.hasOwnProperty('username')"></stop-detail-modal>
        <list-generator-modal ref="listGeneratorModal" :stops="stops" :quests="quests"></list-generator-modal>
    </div>
</template>

<script>
    import Topbar from '../components/Topbar';
    import StopMap from '../components/StopMap';
    import Sidebar from '../components/Sidebar';
    import icons from '../data/icons.json';
    import _ from 'lodash';
    import StopDetailModal from "../components/StopDetailModal";
    import ListGeneratorModal from "../components/ListGeneratorModal"

    export default {
        name: "Home2",
        components: {
            StopDetailModal,
            ListGeneratorModal,
            Topbar,
            StopMap,
            Sidebar
        },
        data() {
            return {
                loading: true,
                user: false,
                stops: [],
                quests: [],
                priorityQuests: [],
                hiddenQuests: [],
                focusedStopId: null,
                questSubmitMode: false
            }
        },
        mounted() {
            Promise.all([
                this.loadUserData(),
                this.loadStopData()
            ]).then(() => {
                this.loading = false;
            });
        },
        methods: {
            loadUserData() {
                return new Promise(resolve => {
                    this.request('user')
                        .then(response => {
                            this.user = response.data.result ? response.data.result : false;
                            resolve();
                        }, () => {
                            this.user = false;
                            resolve();
                        })
                })
            },
            loadStopData() {
                return new Promise(resolve => {
                    this.request('quest')
                        .then(response => {
                            _.each(response.data.result, quest => {
                                this.quests.push(quest);
                            });
                        })
                        .then(() => {
                            return this.request('research');
                        })
                        .then(response => {
                            this.stops = response.data.result;
                        })
                        .then(() => {
                            resolve();
                        });
                })
            },
            getIcon(icon_code) {
                if (icon_code in icons) {
                    return icons[icon_code];
                }

                return icons['icon_unchecked'];
            },
            onFocusStop(stop_vue_id) {
                this.focusedStopId = stop_vue_id;
                this.$refs.focusedStopModal.show()
            },
            onGenerateList() {
                this.$refs.listGeneratorModal.show()
            }
        },
        computed: {
            filteredStops() {
                return _.map(this.stops, (stop, key) => {
                    stop._vue_key = key;
                    return stop;
                });
            },
            focusedStop() {
                if (this.focusedStopId === null) {
                    return null;
                }

                if (this.focusedStopId < 0 || this.focusedStopId >= this.stops.length) {
                    return null;
                }

                return this.stops[this.focusedStopId];
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
        padding: 0;
    }

    .loading-indicator {
        height: 2px;
    }
</style>