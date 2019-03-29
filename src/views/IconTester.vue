<template>
    <div class="scrollable">
        <b-container class="pt-3">
            <b-row>
                <b-col cols="3" class="col-icon" v-for="(icon, key) in icons">
                    <div class="media">
                        <div class="quest-icon" :style="{ 'background-image': 'url(' + icon.url + ')' }"></div>
                        <div class="media-body">
                            <strong>{{ key }}</strong>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import icons from '../data/icons.json';

    export default {
        name: "IconTester",
        data() {
            return {
                icons: icons
            }
        }
    }
</script>

<style scoped>
    /*noinspection CssOptimizeSimilarProperties*/
    .quest-icon {
        width: 32px;
        height: 32px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        margin-right: .6rem;
    }

    .scrollable {
        overflow-y: auto;
        width: 100%;
        max-height: 100%;
    }

    .col-icon {
        margin-bottom: .25rem;
    }
</style>