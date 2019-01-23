<template>
    <b-modal ref="stopList">
        <p class="stopListModalInner">
            Quests for {{ today() }}<br>
            <template v-for="quest in quests">
                <template v-if="quest.id > 2 && stopsWithQuest(quest).length > 0">
                    **{{ quest.reward }} ({{quest.quest}})**:<br>
                    <template v-for="stop in stopsWithQuest(quest)">
                        - {{ stop.name }}<br>
                    </template>
                </template>
            </template>
            Here is your quests for the day @RITStop. Check out the visual map at https://pokes.top/
        </p>
    </b-modal>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "ListGeneratorModal.vue",
        props: ['stops', 'quests'],
        methods: {
            show() {
                this.$refs.stopList.show();
            },
            hide() {
                this.$refs.stopList.hide();
            },
            stopsWithQuest(quest) {
                return _.filter(this.stops, stop => {
                    return stop.quest_id === quest.id;
                })
            },
            today() {
                return moment().format('MM/DD/YYYY');
            }
        }
    }
</script>

<style scoped>
    .stopListModalInner {
        font-family: monospace;
    }
</style>