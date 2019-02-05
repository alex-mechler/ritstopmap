<template>
    <div class="scrollable">
        <b-container>
            <h1 class="my-3">Raid Card Creator</h1>
            <p><i class="fas fa-exclamation-triangle"></i> This tool won't create the raid card automatically, you still
                have to copy and paste the command into Discord.</p>
            <b-form>
                <b-form-radio-group v-model="hatched">
                    <b-form-row class="mb-3">
                        <b-col cols="6">
                            <b-form-radio :value="false">Egg</b-form-radio>
                        </b-col>
                        <b-col cols="6">
                            <b-form-radio :value="true">Raid</b-form-radio>
                        </b-col>
                    </b-form-row>
                </b-form-radio-group>
                <b-form-row>
                    <b-col cols="12">
                        <b-form-group label="Gym:"
                                      label-for="inputGym">
                            <b-form-select id="inputGym"
                                           :options="gymOptions"
                                           required
                                           v-model="gym">
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row>
                    <b-col cols="6">
                        <b-form-group label="Level:"
                                      label-for="inputLevel">
                            <b-form-input id="inputLevel"
                                          v-model="level"
                                          type="number"
                                          max="5"
                                          min="1"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group label="Time Remaining (Minutes):"
                                      label-for="inputRemaining">
                            <b-form-input id="inputRemaining"
                                          v-model="remaining"
                                          type="number"
                                          max="60"
                                          min="0"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <b-form-row v-if="hatched">
                    <b-col cols="12">
                        <b-form-group label="Raid Boss:"
                                      label-for="inputBoss">
                            <b-form-input id="inputBoss"
                                          v-model="boss"
                                          type="text"></b-form-input>
                        </b-form-group>
                    </b-col>
                </b-form-row>
                <hr>
                <b-form-row>
                    <b-col cols="12">
                        <b-form-group label="Output:"
                                      label-for="inputCommand">
                            <b-input-group>
                                <b-button slot="append" variant="info" @click="onClickCopy">
                                    <i class="fas fa-copy"></i>
                                </b-button>
                                <b-form-input id="inputCommand"
                                              :value="commandOutput"
                                              type="text"
                                              readonly></b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </b-col>
                </b-form-row>
            </b-form>
        </b-container>
    </div>
</template>

<script>
    import bForm from 'bootstrap-vue/es/components/form/form'
    import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group'
    import bFormRow from 'bootstrap-vue/es/components/layout/form-row'
    import bFormRadioGroup from 'bootstrap-vue/es/components/form-radio/form-radio-group'
    import bFormRadio from 'bootstrap-vue/es/components/form-radio/form-radio'
    import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select'
    import bFormInput from 'bootstrap-vue/es/components/form-input/form-input'
    import bInputGroup from 'bootstrap-vue/es/components/input-group/input-group'
    import gyms from '../data/gyms'
    import _ from 'lodash'

    export default {
        name: "RaidCardCreator",
        components: {
            bForm,
            bFormGroup,
            bFormRow,
            bFormRadioGroup,
            bFormRadio,
            bFormSelect,
            bFormInput,
            bInputGroup
        },
        data() {
            return {
                hatched: false,
                gym: 0,
                level: 5,
                remaining: 59,
                boss: ""
            }
        },
        methods: {
            onClickCopy() {
                this.$copyText(this.commandOutput);
            }
        },
        computed: {
            gymOptions() {
                return _(gyms).map((gym, index) => {
                    return {
                        value: index,
                        text: gym["name"]
                    }
                }).value();
            },
            commandOutput() {
                const selectedGym = gyms[this.gym];
                const selectedGymName = selectedGym['name'];
                const selectedGymLat = selectedGym['lat'];
                const selectedGymLon = selectedGym['lon'];


                if (this.hatched) {
                    return `!reportraid "${selectedGymName}" ${this.level} ${this.boss} ${selectedGymLat} ${selectedGymLon} ${this.remaining}`;
                } else {
                    return `!reportegg "${selectedGymName}" ${this.level} ${selectedGymLat} ${selectedGymLon} ${this.remaining}`;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .flex-radio-group {
        display: flex;
        flex-grow: 1;
    }

    .scrollable {
        overflow-y: auto;
        width: 100%;
        height: 100%;
    }
</style>