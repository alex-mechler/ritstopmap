<template>
    <div class="home">
        <l-map class="map" ref="map" :zoom="15" :center="[43.085188, -77.671559]">
            <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" :attribution="osm_attribution"></l-tile-layer>
        </l-map>
        <div class="alert-container" v-if="loading">
            <div class="alert alert-primary" role="alert">
                <i class="fas fa-sync fa-spin"></i> Loading...
            </div>
        </div>
    </div>
</template>

<script>
    import {LMap, LTileLayer} from 'vue2-leaflet';

    export default {
        name: 'home',
        data: function () {
            return {
                loading: true,
                osm_attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            };
        },
        mounted: function () {
            this.init();
        },
        methods: {
            init() {
                this.loading = false;
            }
        },
        components: {
            LMap,
            LTileLayer
        }
    }
</script>

<style lang="scss" scoped>
    .map {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .alert-container {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1;
        text-align: center;
        pointer-events: none;
        .alert {
            display: inline-block;
        }
    }
</style>
