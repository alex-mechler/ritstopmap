<template>
    <b-modal ref="filterModal" title="Filter">
        <div class="row mb-3">
            <div class="col-12">
                <div class="mr-3 d-inline-block">
                    <b-button-group>
                        <b-button @click="showAll">
                            Show All
                        </b-button>
                        <b-button @click="hideAll">
                            Hide All
                        </b-button>
                    </b-button-group>
                </div>
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
                    <b-button @click="visibility.hideQuest(quest.id)" variant="info"
                              v-if="visibility.isVisible(quest.id)">
                        <i class="fas fa-eye fa-fw"></i>
                    </b-button>
                    <b-button @click="visibility.showQuest(quest.id)" v-else>
                        <i class="fas fa-eye fa-fw"></i>
                    </b-button>
                </b-button-group>
            </div>
        </div>
    </b-modal>
</template>

<script>
    export default {
        name: "FilteringModal",
        props: ['visibility', 'quests', 'getIcon'],
        methods: {
            show() {
                this.$refs.filterModal.show();
                this.$ga.event('Filters', 'open-modal');
            },
            hide() {
                this.$refs.filterModal.hide();
            },
            showAll() {
                this.visibility.clear();
            },
            async hideAll() {
                return Promise.all(_.map(this.quests, quest => {
                    return this.visibility.hideQuest(quest.id);
                }));
            }
        }
    }
</script>

<style scoped>
    .button-col {
        flex: 0 0;
    }
    .quest-icon {
        width: 32px;
        height: 32px;
        background-size: cover;
        background-position: center;
        margin-right: .6rem;
    }
</style>