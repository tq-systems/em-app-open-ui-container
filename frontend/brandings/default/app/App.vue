<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
    <Layout :navigation-items="navigationItem">
        <DangerHeader v-if="updateHeader.show" :display-text="updateHeader.text" />
        <DangerHeader v-if="restartHeader.show" :display-text="restartHeader.text" />
        <DangerHeader v-if="miscHeader.show" :display-text="miscHeader.text" />
        <DangerHeader v-if="invalidTime" :display-text="'header.time.invalid'">
            <router-link class="btn btn-gray-light ms-2" to="/device-settings#device-config">
                {{ $t('header.time.set') }}
            </router-link>
        </DangerHeader>
        <router-view />
    </Layout>
</template>

<script setup>
import store from '@tq-systems/em-ui-core/store';
import { watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router';

import Layout from './Layout.vue'
import DangerHeader from './components/DangerHeader.vue'

import { useDeviceStatus } from './composables/deviceStatus.js'

const route = useRoute();

const {
    invalidTime,
    updateHeader,
    restartHeader,
    miscHeader,
    navigationItem
} = useDeviceStatus()

// prevent operation when logged out
const handleKeydown = (event) => {
    // check token from localStorage to get login status
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    if (!isLoggedIn && event.key === 'Tab') {
        event.preventDefault();
        event.stopPropagation();
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown, true);
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown, true);
});

watch(
    () => route.query.view,

    async (newView) => {
        if (newView) {
            store.commit('updateViewMode', newView);
        }
    },
    { immediate: true }
)
</script>
