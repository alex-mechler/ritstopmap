<template>
    <l-map class="h-100" ref="map" :zoom="mapZoom" :center="mapCenter" :options="{ zoomControl: false }">
        <l-tile-layer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                      :attribution="osm_attribution"></l-tile-layer>
        <l-marker v-for="stop in filteredStops" :key="stop.id" :lat-lng="[stop.loc.x, stop.loc.y]"
                  @click="$emit('focus-stop', stop._vue_key)">
            <l-icon :icon-size="[getIcon(stop.icon).width, getIcon(stop.icon).height]"
                    :icon-url="getIcon(stop.icon).url"></l-icon>
        </l-marker>
        <l-control>
            <b-button variant="leaflet" @click="$emit('toggle-sidebar')">
                <i class="fas fa-angle-right" v-if="sidebar"></i>
                <i class="fas fa-angle-left" v-else></i>
            </b-button>
        </l-control>
    </l-map>
</template>

<script>
    import {LMap, LTileLayer, LMarker, LIcon, LControl} from 'vue2-leaflet';
    import 'leaflet/dist/leaflet.css'

    export default {
        name: "Map",
        props: ['stops', 'getIcon', 'sidebar'],
        data: function () {
            return {
                mapZoom: 15,
                mapCenter: [43.085188, -77.671559],
                osm_attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            };
        },
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LIcon,
            LControl
        },
        computed: {
            filteredStops() {
                return this.stops;
            }
        },
        methods: {
            invalidateSize() {
                this.$refs.map.mapObject.invalidateSize()
            }
        }
    }
</script>

<style scoped>
    /*noinspection CssUnusedSymbol*/
    .btn-leaflet {
        font-size: 12px;
        border-radius: 2px;
        color: black;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 8px 12px;
        line-height: 1;
    }
</style>