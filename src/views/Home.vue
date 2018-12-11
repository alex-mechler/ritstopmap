<template>
    <div class="container-fluid h-100">
        <div class="row h-100">
            <div class="col h-100 p-0">
                <l-map class="h-100" ref="map" :zoom="mapZoom" :center="mapCenter">
                    <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                  :attribution="osm_attribution"></l-tile-layer>
                    <l-marker v-for="stop in filteredStops" :key="stop.id" :lat-lng="[stop.loc.x, stop.loc.y]"
                              @click="showDetails(stop)">
                        <l-icon :icon-size="[getIcon(stop.icon).width, getIcon(stop.icon).height]"
                                :icon-url="getIcon(stop.icon).url"></l-icon>
                    </l-marker>
                    <l-control>
                        <b-button variant="leaflet" @click="sidebar = !sidebar">
                            <i class="fas fa-angle-right" v-if="sidebar"></i>
                            <i class="fas fa-angle-left" v-else></i>
                        </b-button>
                    </l-control>
                </l-map>
            </div>
            <div class="h-100 col-2 sidebar" :class="{closed: !sidebar}">
                <div class="mb-2">
                    {{ filteredStops.length }} Locations
                    <span class="float-right">
                        <!--<i class="fas fa-search mr-2"></i>-->
                        <a href="#" class="mr-2" @click.prevent="$refs.modalFilter.show()">
                            <i class="fas fa-filter"></i>
                        </a>
                        <!--<a href="#" @click.prevent="$refs.modalSettings.show()">
                            <i class="fas fa-cog"></i>
                        </a>-->
                    </span>
                </div>
                <div v-for="stop in filteredStops" :v-key="stop.id" @click="showDetails(stop)" class="media">
                    <div class="quest-icon"
                         :style="{ 'background-image': 'url(' + getIcon(stop.icon).url + ')' }"></div>
                    <div class="media-body">
                        <strong>{{ stop.name }}</strong>
                        <p class="mb-0">{{ stop.quest }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!--suppress HtmlUnknownTag -->
        <b-modal ref="stopDetail" :title="focus !== null ? focus.name : 'Unknown Stop'">
            <div v-if="focus !== null">
                <p class="my-4">Quest: {{ focus.quest }}</p>
                <p class="my-4">Reward: {{ focus.reward }}</p>
            </div>
        </b-modal>

        <b-modal ref="modalFilter" id="modalFilter" title="Filter">
            <div class="row mb-3">
                <div class="col-12">
                    <div class="mr-3 d-inline-block">
                        <b-button-group>
                            <b-button @click="visibilityAll(true)">
                                Show All
                            </b-button>
                            <b-button @click="visibilityAll(false)">
                                Hide All
                            </b-button>
                        </b-button-group>
                    </div>

                    <b-button-group>
                        <b-button @click="priorityAll(true)">
                            Prioritize All
                        </b-button>
                        <b-button @click="priorityAll(false)">
                            Deprioritize All
                        </b-button>
                    </b-button-group>
                </div>
            </div>
            <div class="row" v-for="quest in quests">
                <div class="col">
                    <div class="media">
                        <div class="quest-icon"
                             :style="{ 'background-image': 'url(' + getIcon(quest.icon).url + ')' }"></div>
                        <div class="media-body">
                            <strong>{{ quest.quest }}</strong>
                            <p>{{ quest.reward }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 button-col">
                    <b-button-group>
                        <b-button @click="setVisibility(quest, false)" variant="info" v-if="questIsVisible(quest.id)">
                            <i class="fas fa-eye fa-fw"></i>
                        </b-button>
                        <b-button @click="setVisibility(quest, true)" v-else>
                            <i class="fas fa-eye fa-fw"></i>
                        </b-button>
                        <b-button @click="setPriority(quest, false)" variant="danger" v-if="questIsPriority(quest.id)">
                            <i class="fas fa-exclamation fa-fw"></i>
                        </b-button>
                        <b-button @click="setPriority(quest, true)" v-else>
                            <i class="fas fa-exclamation fa-fw"></i>
                        </b-button>
                    </b-button-group>
                </div>
            </div>

        </b-modal>

        <b-modal ref="modalSettings" title="Settings">

        </b-modal>
    </div>
</template>

<script>
    import {LMap, LTileLayer, LMarker, LIcon, LControl} from 'vue2-leaflet';
    import 'leaflet/dist/leaflet.css'
    import icons from '../data/icons.json';
    import _ from 'underscore';

    export default {
        name: 'home',
        data: function () {
            const clientWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            return {
                loading: true,
                stops: [],
                quests: [],
                priorityQuests: [],
                hiddenQuests: [],
                focus: null,
                mapZoom: 15,
                mapCenter: [43.085188, -77.671559],
                osm_attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                sidebar: (clientWidth >= 768)
            };
        },
        mounted: function () {


            this.hiddenQuests = (localStorage.hiddenQuests) ? JSON.parse(localStorage.hiddenQuests) : [];
            this.priorityQuests = (localStorage.priorityQuests) ? JSON.parse(localStorage.priorityQuests) : [];

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
                    this.loading = false;
                });
        },
        methods: {
            showDetails(stop) {
                this.focus = stop;
                this.$refs.stopDetail.show()
            },
            getIcon(icon_code) {
                if (icon_code in icons) {
                    return icons[icon_code];
                }

                return icons['icon_unchecked'];
            },
            stopVisible(stop) {
                return this.questIsVisible(stop.quest_id);
            },
            questIsVisible(quest_id) {
                return !this.hiddenQuests.includes(quest_id);
            },
            questIsPriority(quest_id) {
                return this.priorityQuests.includes(quest_id);
            },
            setVisibility(quest, state) {
                if (!state) {
                    this.hiddenQuests.push(quest.id);
                } else {
                    this.hiddenQuests = _.without(this.hiddenQuests, quest.id);
                }
            },
            setPriority(quest, state) {
                if (state) {
                    this.priorityQuests.push(quest.id);
                } else {
                    this.priorityQuests = _.without(this.priorityQuests, quest.id);
                }
            },
            visibilityAll(state) {
                if (!state) {
                    _.each(this.quests, quest => {
                        this.setVisibility(quest, state, false);
                    });
                } else {
                    this.hiddenQuests = [];
                }
            },
            priorityAll(state) {
                if (state) {
                    _.each(this.quests, quest => {
                        this.setPriority(quest, state, false);
                    });
                } else {
                    this.priorityQuests = [];
                }
            }
        },
        computed: {
            filteredStops() {
                return _.sortBy(_.filter(this.stops, this.stopVisible), stop => {
                    return (this.questIsPriority(stop.quest_id) ? '!' : '') + stop.quest;
                });
            }
        },
        watch: {
            hiddenQuests(hiddenQuests) {
                localStorage.hiddenQuests = JSON.stringify(hiddenQuests);
            },
            priorityQuests(priorityQuests) {
                localStorage.priorityQuests = JSON.stringify(priorityQuests);
            },
            sidebar() {
                this.$nextTick(() => {
                    this.$refs.map.mapObject.invalidateSize();
                })
            }
        },
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LIcon,
            LControl
        }
    }
</script>

<style>
    html, body, #app {
        height: 100%;
    }
</style>

<style lang="scss" scoped>
    .sidebar {
        max-height: 100%;
        overflow-y: scroll;
        min-width: 250px;
        padding: .5rem;
        transition: width .3s;
        transition-timing-function: ease;
        &.closed {
            min-width: 0;
            flex: 0;
            padding: 0;
        }
        .media {
            line-height: 1;
            margin-bottom: .6rem;
            cursor: pointer;
            p {
                margin-top: .2rem;
                line-height: 1.2;
            }
        }

    }

    .quest-icon {
        width: 32px;
        height: 32px;
        background-size: cover;
        background-position: center;
        margin-right: .6rem;
    }

    .btn-leaflet {
        font-size: 12px;
        border-radius: 2px;
        color: black;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 8px 12px;
        line-height: 1;
    }

    #modalFilter {
        .button-col {
            flex: 0 0;
        }
    }
</style>
