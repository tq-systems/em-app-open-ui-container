<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
  <div class="row content-wrapper gx-0">
    <div class="col-xl-10 mt-5">
      <div class="content-wrapper d-flex flex-wrap gap-3">
        <div
          v-for="app in appIcons"
            :key="app.identifier"
            @click="navigateToApp(app.identifier)"
            class="dashboard-icon d-flex flex-column align-items-center"
          >
          <svg
            :class="'rounded-2 d text-white bg-'+getColor(app.iconcolor)"
            role="img"
          >
            <use :href="app.app_icon+'#icon'"></use>
          </svg>
          <h6 class="mt-2 fw-bold text-center">
            {{ $t(app.i18nkey) }}
          </h6>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
  import { defineProps, computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  const props = defineProps<{ apps: any[] }>()

  const router = useRouter()

  // Computed property filtering only apps with an icon
  const appIcons = computed(() =>
    props.apps.filter(app => 'app_icon' in app)
  )
  
  function getColor(color: string = 'primary'): string {
    return color
  }

  function navigateToApp(appRoute: string) {
    router.push(appRoute)
  }
  </script>
