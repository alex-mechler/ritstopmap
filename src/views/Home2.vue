<template>
    <div>
        <template v-if="loading">
            <b-container fluid class="container-main">
                <div class="loading-helper">
                    <div>
                        <loading-indicator></loading-indicator>
                        <h5 class="mt-3">Loading...</h5>
                    </div>
                </div>

            </b-container>
        </template>
        <template v-else>
            <notifications position="bottom left" group="main"></notifications>
            <b-container fluid class="container-main">
                <b-row class="row-header">
                    <b-col cols="12" class="header">
                        <topbar :loading="loading"></topbar>
                    </b-col>
                    <b-col cols="12" class="loading-indicator bg-primary"></b-col>
                </b-row>
                <b-row class="row-body">
                    <b-col class="p-0">
                        <stop-map :stops="filteredStops" :getIcon="getIcon" @focus-stop="onFocusStop"></stop-map>
                    </b-col>
                    <b-col cols="2" class="sidebar">
                        <sidebar :stops="filteredStops" :getIcon="getIcon" @focus-stop="onFocusStop"
                                 @generate-list="onGenerateList" @open-filter="onOpenFilter"></sidebar>
                    </b-col>
                </b-row>
            </b-container>

            <stop-detail-modal ref="focusedStopModal" :stop="focusedStop" :quests="quests"
                               :show-submit="$auth.check()"></stop-detail-modal>
            <list-generator-modal ref="listGeneratorModal" :stops="stops" :quests="quests"></list-generator-modal>
            <filtering-modal ref="filteringModal" :visibility="visibility" :quests="quests"
                             :getIcon="getIcon"></filtering-modal>
        </template>
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
    import User from '../auth/User'
    import UserPreferencesManager from "../preferences/UserPreferencesManager";
    import FilteringModal from "../components/FilteringModal"
    import QuestVisibilityManager from "../preferences/QuestVisibilityManager";
    import LoadingIndicator from '../components/LoadingIndicator';

    export default {
        name: "Home2",
        components: {
            StopDetailModal,
            ListGeneratorModal,
            FilteringModal,
            LoadingIndicator,
            Topbar,
            StopMap,
            Sidebar
        },
        data() {
            return {
                loading: true,
                stops: [],
                quests: [],
                priorityQuests: [],
                hiddenQuests: [],
                focusedStopId: null,
                questSubmitMode: false,
                preferences: null,
                visibility: null
            }
        },
        mounted() {
            Promise.all([
                this.loadUserData(),
                this.loadStopData(),
            ])
                .then(this.initializePreferences)
                .then(() => {
                    this.loading = false;
                });
        },
        methods: {
            async loadUserData() {
                try {
                    const responseData = (await this.request('user')).data.result;
                    const userData = responseData ? new User(responseData) : null;
                    this.$auth.setUser(userData);
                } catch (_) {
                    console.log("User loading error, setting null");
                    this.$auth.setUser(null);
                }
            },
            async loadStopData() {
                const questData = (await this.request('quest')).data.result;

                _.each(questData, quest => {
                    this.quests.push(quest);
                });

                this.stops = (await this.request('research')).data.result;
            },
            async initializePreferences() {
                this.preferences = await UserPreferencesManager.make(this);
                this.visibility = new QuestVisibilityManager(this.preferences);
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
            },
            onOpenFilter() {
                this.$refs.filteringModal.show();
            }
        },
        computed: {
            filteredStops() {
                return _.chain(this.stops)
                    .map((stop, key) => {
                        stop._vue_key = key;
                        return stop;
                    })
                    .filter(stop => {
                        return this.visibility.isVisible(stop.quest_id);
                    })
                    .value();
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
        .loading-helper {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
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