<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
    <div class="app">
        <Iconbar v-if="store.getters.isViewmodeFull" :nav-items="navigationItems" />
        <Header v-if="store.getters.isViewmodeFull" class="fixed-top z-1"/>
        <div class="app-body" :class="{ 'with-sidebar': store.getters.isViewmodeFull }">
            <Alert />
            <main class="main mb-4">
                <Breadcrumb v-if="store.getters.isViewmodeFull"/>
                <slot />
            </main>
        </div>
        <Footer :class="{ 'with-sidebar': store.getters.isViewmodeFull }" />
    </div>
</template>


<script setup>
import store from '@tq-systems/em-ui-core/store'
import Alert from './components/Alert.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import Iconbar from './components/Iconbar.vue'
import Breadcrumb from './components/Breadcrumb.vue'

defineProps({
    navigationItems: Array
})
</script>

<style scoped>
@media (min-width: 992px) {
  .app-body.with-sidebar,
  .with-sidebar {
    margin-left: 280px;
  }
}
</style>
