<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
    <div class="animated fadeIn container-fluid">
      <div class="app-content-wrapper row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
        <CardLegal urltrunk="static/legal_texts/licenses_" type="html" class="mb-3"/>
        <div class="card">
            <div class="card-body">
                <h5>{{ t('footer.systemlicenses') }}</h5>
                <div class="row">
                    <div class="col-sm-4 order-sm-2">
                        <button
                            class="w-100 btn btn-primary mb-2"
                            :disabled="systemLicenses.loadingstate"
                            @click="downloadSystemLicenses"
                        >
                            <span v-if="systemLicenses.loadingstate" class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                            <span v-else>{{ t('footer.downloadbutton') }}</span>
                        </button>
                    </div>
                    <div class="col-sm-8">
                        <p>{{ t('footer.systemlabel') }}</p>
                    </div>
                </div>

                <h5>{{ t('footer.applicenses') }}</h5>
                <div class="row">
                    <div class="col-sm-4 order-sm-2">
                        <button
                            class="w-100 btn btn-primary mb-2"
                            :disabled="appLicenses.loadingstate"
                            @click="downloadAppLicenses"
                        >
                            <span v-if="appLicenses.loadingstate" class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                            <span v-else>{{ t('footer.downloadbutton') }}</span>
                        </button>
                    </div>
                    <div class="col-sm-8">
                        <p>{{ t('footer.applabel') }}</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import  saveAs  from 'file-saver'
import store from '@tq-systems/em-ui-core/store'
import http from '@tq-systems/em-http-service'
import CardLegal from '../components/CardLegal.vue'

const { t } = useI18n()

const systemLicenses = ref({ loadingstate: false })
const appLicenses = ref({ loadingstate: false })

const downloadSystemLicenses = () => {
    store.commit('requestOk', t('footer.systemgeneratingstate'))
    fetchLicenses('/api/device-settings/licenses/system', systemLicenses.value)
}

const downloadAppLicenses = () => {
    store.commit('requestOk', t('footer.appgeneratingstate'))
    fetchLicenses('/api/device-settings/licenses/app', appLicenses.value)
}

const fetchLicenses = async (path: string, flag: { loadingstate: boolean }) => {
    flag.loadingstate = true
    try {
        const response = await http.get(path, { responseType: 'blob' })
        const blob = response.data
        const filename = getFilename(response.headers['content-disposition'])

        saveAs(blob, filename)

    } catch (error) {
        store.commit('httpError', error.response || error)
    } finally {
        flag.loadingstate = false
    }
}

const getFilename = (valueString: string | null): string => {
    if (!valueString) return 'licenses.zip'
    const split = valueString.split('=')
    const split1 = split[1].split('.', 2)
    return `${split1[0]}.${split1[1]}`
}
</script>
