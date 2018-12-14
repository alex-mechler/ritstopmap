<template>
    <div class="sidebar-inner">
        <div class="mb-2">
            {{ stops.length }} Locations
            <span class="float-right">
                        <!--<i class="fas fa-search mr-2"></i>-->
                        <a href="#" class="mr-2" @click.prevent="">
                            <i class="fas fa-filter"></i>
                        </a>
                    </span>
        </div>
        <div v-for="stop in stops" :v-key="stop.id" class="media">
            <div class="quest-icon"
                 :style="{ 'background-image': 'url(' + getIcon(stop.icon).url + ')' }"></div>
            <div class="media-body">
                <strong>{{ stop.name }}</strong>
                <p class="mb-0">{{ stop.quest }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Sidebar",
        props: ['stops', 'getIcon']
    }
</script>

<style lang="scss" scoped>
    .sidebar-inner {
        padding: 0.5rem;
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

    .quest-icon {
        width: 32px;
        height: 32px;
        background-size: cover;
        background-position: center;
        margin-right: .6rem;
    }
</style>