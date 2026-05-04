<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
    <div class="container-fluid">
        <EolBanner />
        <DashboardWidgets :apps="apps"/>
        <AppOverview :apps="apps"/>
    </div>
  </template>

  <script lang="ts" setup>
  import config from '@branding/config.json'

  import store from '@tq-systems/em-ui-core/store'
  import AppOverview from '../components/AppOverview.vue';
  import DashboardWidgets from '../components/DashboardWidgets.vue'
  import EolBanner from '../components/EolBanner.vue';

  const apps = store.state.apps
  </script>
