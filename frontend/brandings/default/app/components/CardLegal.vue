<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
    <div class="card">
        <div
            class="card-body"
            v-html="text"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n' // Import für die Sprachverwaltung
import http from '@tq-systems/em-http-service'

const props = defineProps<{
  urltrunk: string
  type: string
}>()

const text = ref('')
const { locale, fallbackLocale } = useI18n()

const showText = async () => {
    try {
        const response = await http.get(`${props.urltrunk}${locale.value}.${props.type}`, {
            timeout: 1500,
        })
        text.value = response.data
    } catch (err) {
        // Fallback auf die Standardsprache
        const response = await http.get(`${props.urltrunk}${fallbackLocale.value}.${props.type}`, {
            timeout: 1500,
        })
        text.value = response.data
    }
}

watch(locale, showText)

showText()
</script>
