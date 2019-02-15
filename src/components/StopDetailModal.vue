<template>
    <b-modal ref="stopDetail" :title="name" @hidden="submitMode = false">
        <div v-if="stop !== null">
            <div v-if="loading">
                <loading-indicator class="mb-4" v-if="loading"></loading-indicator>
                <div class="text-center">Loading...</div>
            </div>
            <div v-else-if="submitMode">
                <b-alert v-if="this.error" variant="danger" v-text="this.error" show></b-alert>
                <b-form>
                    <b-form-group label="Quest:"
                                  label-for="inputQuest">
                        <b-form-select id="inputQuest"
                                       :options="questOptions"
                                       required
                                       v-model="selectedQuest">
                        </b-form-select>
                    </b-form-group>
                </b-form>
            </div>

            <div v-else>
                <p class="my-4">Quest: {{ stop.quest }}</p>
                <p class="my-4">Reward: {{ stop.reward }}</p>
                <p v-if="stop.confirmed">
                    <span class="text-success font-weight-bold">
                        <i class="fas fa-check-circle text-success"></i> Report Confirmed
                    </span>
                    <small class="text-muted" v-b-tooltip title="Quest has been confirmed by an admin">(?)</small>
                </p>
                <p v-else-if="showSubmit">
                    <a href="#" @click.prevent="submitMode = true">Incorrect?</a>
                </p>
                <p v-else>
                    Incorrect? Login to report this stop!
                </p>
            </div>
        </div>

        <template slot="modal-footer">
            <template v-if="submitMode">
                <b-button :disabled="loading" @click="submitMode = false">Cancel</b-button>
                <b-button :disabled="loading" @click="submitForm" variant="primary">Submit</b-button>
            </template>

            <template v-else>
                <b-button variant="primary" @click="hide">Close</b-button>
            </template>
        </template>
    </b-modal>
</template>

<script>
    import bForm from 'bootstrap-vue/es/components/form/form'
    import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group'
    import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select'
    import bAlert from 'bootstrap-vue/es/components/alert/alert'
    import LoadingIndicator from "./LoadingIndicator";
    import bTooltip from 'bootstrap-vue/es/directives/tooltip/tooltip'
    import _ from 'lodash';

    export default {
        name: "StopDetailModal",
        props: ['quests', 'showSubmit'],
        components: {
            LoadingIndicator,
            bForm,
            bFormGroup,
            bFormSelect,
            bAlert,
        },
        directives: {
            bTooltip
        },
        data() {
            return {
                submitMode: false,
                selectedQuest: 0,
                loading: false,
                error: null,
                stop: null
            }
        },
        methods: {
            show(stop) {
                this.stop = stop;
                this.$refs.stopDetail.show();
            },
            hide() {
                this.submitMode = false;
                this.selectedQuest = 0;
                this.loading = false;
                this.error = null;
                this.stop = null;
                this.$refs.stopDetail.hide();
            },
            submitForm() {
                this.loading = true;
                this.error = null;
                const quest = this.quests[this.selectedQuest];

                if (!_.isObject(quest)) {
                    this.loading = false;
                    this.error = "You must select a quest.";
                    return;
                }

                this.request().post('research', {
                    quest: quest.id,
                    stop: this.stop.id
                }).then(response => {
                    this.setQuest(this.stop, quest);

                    this.$ga.event('Stop', 'report');

                    this.hide();
                    this.$notify({
                        group: 'main',
                        title: 'Success',
                        text: 'Stop submitted successfully',
                        type: 'success',
                        duration: 3000
                    });
                }, err => {
                    this.loading = false;
                    this.error = err;
                })
            },
            setQuest(stop, quest) {
                stop.icon = quest.icon;
                stop.quest_id = quest.id;
                stop.quest = quest.quest;
                stop.reward = quest.reward;
            }
        },
        computed: {
            name() {
                if (this.stop !== null) {
                    return this.stop.name;
                }
            },
            questOptions() {
                return _(this.quests).map((quest, key) => {
                    return {
                        value: key,
                        text: `${quest.quest} (${quest.reward})`
                    }
                }).sortBy(q => {
                    return q.text;
                }).value();
            }
        }
    }
</script>

<style scoped>
</style>