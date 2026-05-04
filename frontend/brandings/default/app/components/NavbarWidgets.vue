<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
    <div class="widget-box d-flex align-items-end gap-2 fs-sm">
        <component
            v-for="widget in navbarWidgets"
            :key="widget"
            :is="widget"
        />
        <ChooseLanguageWidget />
        <ProfileWidget />
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from 'vue'
  import store from '@tq-systems/em-ui-core/store'
  import ChooseLanguageWidget from './ChooseLanguageWidget.vue';
  import ProfileWidget from './ProfileWidget.vue';

  const navbarWidgets = ref([])

  defineOptions({
    name: 'NavbarWidgets'
  })

  onMounted(() => {
    getNavbarWidgets()
  })

  function getNavbarWidgets() {
    navbarWidgets.value = store.state.apps
      .filter(item => item.navwidget && item.navwidget.position === 'main')
      .map(item => item.navwidget.component)
  }
  </script>
