<template>
    <div class="home">
        <div class="row master-container m-0">
            <div class="col-10 p-0">
                <l-map class="map" ref="map" :zoom="15" :center="[43.085188, -77.671559]">
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                  :attribution="osm_attribution"></l-tile-layer>
                    <l-marker v-for="stop in stops" :lat-lng="[stop.loc.x, stop.loc.y]"
                              @click="showDetails(stop)">
                        <l-icon :icon-size="[32, 32]" :icon-anchor="[16, 16]"
                                icon-url="https://cdn.jsdelivr.net/gh/ZeChrales/PogoAssets/static_assets/png/Item_0707.png"></l-icon>
                    </l-marker>
                </l-map>
            </div>
            <div class="sidebar col-2 p-0">
                <div class="inner p-2">
                    <div v-for="stop in stops" class="media">
                        <img class="mr-1"
                             src="https://cdn.jsdelivr.net/gh/ZeChrales/PogoAssets/static_assets/png/Item_0707.png">
                        <div class="media-body">
                            <strong>{{ stop.name }}</strong>
                            <p>{{ stop.quest }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--suppress HtmlUnknownTag -->
        <b-modal ref="stopDetail" :title="focus !== null ? focus.name : 'Unknown Stop'">
            <div v-if="focus !== null">
                <p class="my-4">Quest: {{ focus.quest }}</p>
                <p class="my-4">Reward: {{ focus.reward }}</p>
                <p class="my-4">Confirmed: {{ focus.confirmed }}</p>
            </div>
        </b-modal>
    </div>
</template>

<script>
    import {LMap, LTileLayer, LMarker, LIcon} from 'vue2-leaflet';
    import 'leaflet/dist/leaflet.css'

    export default {
        name: 'home',
        data: function () {
            return {
                loading: true,
                stops: [],
                focus: null,
                osm_attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            };
        },
        mounted: function () {
            this.update();
        },
        methods: {
            update() {
                this.request('research').then(response => {
                    this.loading = false;
                    this.stops = response.data.result;
                });

            },
            showDetails(stop) {
                this.focus = stop;
                this.$refs.stopDetail.show()
            }
        },
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LIcon
        }
    }
</script>

<style lang="scss" scoped>
    .master-container {
        width: 100%;
        height: 100vh;
        .map {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
        .sidebar {
            .inner {
                overflow-y: scroll;
                max-height: 100%;
                width: 100%;
            }
            .media img {
                width: 32px;
                height: 32px;
            }
        }
    }
</style>
