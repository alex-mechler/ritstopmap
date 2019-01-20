<template>
    <b-modal ref="stopDetail" :title="name" @hidden="submitMode = false">
        <div v-if="stop !== null">
            <div v-if="loading">
                <loading-indicator class="mb-4" v-if="loading"></loading-indicator>
                <div class="text-center">Loading...</div>
            </div>
            <div v-else-if="submitMode">
                <b-form>
                    <b-form-group label="Quest:"
                                  label-for="inputQuest">
                        <b-form-select id="inputQuest"
                                       :options="questOptions"
                                       required
                                       v-model="quest">
                        </b-form-select>
                    </b-form-group>
                </b-form>
            </div>

            <div v-else>
                <p class="my-4">Quest: {{ stop.quest }}</p>
                <p class="my-4">Reward: {{ stop.reward }}</p>
                <p><a href="#" @click.prevent="submitMode = true">Incorrect?</a></p>
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
    import LoadingIndicator from "./LoadingIndicator";
    import axios from "axios";

    export default {
        name: "StopDetailModal",
        props: ['stop', 'quests'],
        components: {
            LoadingIndicator,
            bForm,
            bFormGroup,
            bFormSelect
        },
        data() {
            return {
                submitMode: false,
                quest: null,
                loading: false
            }
        },
        methods: {
            show() {
                this.$refs.stopDetail.show();
            },
            hide() {
                this.$refs.stopDetail.hide();
            },
            submitForm() {
                this.loading = true;

                this.request().post('research', {
                    quest: this.quest,
                    stop: this.stop.id
                }).then(response => {
                    this.quest = null;
                    this.submitMode = false;
                    this.loading = false;
                    this.hide();
                })
            }
        },
        computed: {
            name() {
                if (this.stop !== null) {
                    return this.stop.name;
                }
            },
            questOptions() {
                return _.map(this.quests, quest => {
                    return {
                        value: quest.id,
                        text: `${quest.quest} (${quest.reward})`
                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>