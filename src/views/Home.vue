<template>
    <div class="container-fluid h-100">
        <div class="row h-100">
            <div class="col-10 h-100 p-0">
                <l-map class="h-100" ref="map" :zoom="15" :center="[43.085188, -77.671559]">
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                                  :attribution="osm_attribution"></l-tile-layer>
                    <l-marker v-for="stop in stops" :lat-lng="[stop.loc.x, stop.loc.y]"
                              @click="showDetails(stop)">
                        <l-icon :icon-size="[32, 32]" :icon-anchor="[16, 16]"
                                :icon-url="getIcon(stop.icon)"></l-icon>
                    </l-marker>
                </l-map>
            </div>
            <div class="col-2 h-100 p-3 sidebar">
                <div v-for="stop in stops" class="media">
                    <img class="mr-1" :src="getIcon(stop.icon)">
                    <div class="media-body">
                        <strong>{{ stop.name }}</strong>
                        <p>{{ stop.quest }}</p>
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
    import icons from '../data/icons.json';

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
            },
            getIcon(icon_code) {
                if (icon_code in icons) {
                    return icons[icon_code];
                }

                return icons['icon_unchecked'];
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

<style>
    html, body, #app {
        height: 100%;
    }
</style>

<style lang="scss" scoped>
    .sidebar {
        max-height: 100%;
        overflow-y: scroll;
        .media img {
            width: 32px;
            height: 32px;
        }
    }
</style>
