<template>
    <div class="d-flex w-100">
        <template v-if="loading">
            <b-col class="d-flex align-items-center justify-content-center" cols="12">
                <div>
                    <loading-indicator></loading-indicator>
                    <h5 class="mt-3">Loading...</h5>
                </div>
            </b-col>
        </template>
        <template v-else>
            <b-col class="p-0">
                <stop-map ref="map" :stops="filteredStops" :getIcon="getIcon" :sidebar="sidebar"
                          @focus-stop="onFocusStop"
                          @toggle-sidebar="onToggleSidebar"></stop-map>
            </b-col>
            <b-col cols="2" class="sidebar" :class="{closed: !sidebar}">
                <sidebar :stops="filteredStops" :getIcon="getIcon" @focus-stop="onFocusStop"
                         @generate-list="onGenerateList" @open-filter="onOpenFilter"></sidebar>
            </b-col>

            <stop-detail-modal ref="focusedStopModal" :quests="quests"
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
    import FilteringModal from "../components/FilteringModal"
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
            const clientWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

            return {
                loading: true,
                stops: [],
                quests: [],
                priorityQuests: [],
                hiddenQuests: [],
                questSubmitMode: false,
                sidebar: (clientWidth >= 768),
                visibility: null
            }
        },
        mounted() {
            this.loadStopData()
                .then(this.initializeServices)
                .then(() => {
                    this.loading = false;
                });
        },
        methods: {
            async loadStopData() {
                try {
                    const questData = (await this.request('quest')).data.result;

                    _.each(questData, quest => {
                        this.quests.push(quest);
                    });

                    this.stops = (await this.request('research')).data.result;
                } catch (e) {
                    this.$eventBus.$emit('fatal-error');
                    throw e;
                }
            },
            async initializeServices() {
                this.visibility = await this.$services.container.QuestVisibility;
                console.log('b');
            },
            getIcon(icon_code) {
                if (icon_code in icons) {
                    return icons[icon_code];
                }

                return icons['icon_unchecked'];
            },
            onFocusStop(stop_vue_id) {
                const focusedStop = this.getStopById(stop_vue_id);
                this.$refs.focusedStopModal.show(focusedStop)
            },
            onGenerateList() {
                this.$refs.listGeneratorModal.show()
            },
            onOpenFilter() {
                this.$refs.filteringModal.show();
            },
            onToggleSidebar() {
                this.sidebar = !this.sidebar;
            },
            getStopById(id) {
                if (id === null) {
                    return null;
                }

                if (id < 0 || id >= this.stops.length) {
                    return null;
                }

                return this.stops[id];
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
            }
        },
        watch: {
            sidebar() {
                this.$nextTick(() => {
                    this.$refs.map.invalidateSize();
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .container-home {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .sidebar {
        max-height: 100%;
        overflow-y: auto;
        min-width: 250px;
        transition: width .3s;
        transition-timing-function: ease;
        padding: 0;
        &.closed {
            min-width: 0;
            flex: 0;
            padding: 0;
        }
    }
</style>