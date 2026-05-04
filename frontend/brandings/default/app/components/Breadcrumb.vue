<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: René Härtel and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
  <nav aria-label="breadcrumb" class="em-breadcrumb d-flex justify-content-center align-items-center p-3">
    <span v-for="(item, idx) in breadcrumb" :key="item.path">
      <router-link v-if="idx < breadcrumb.length - 1" :to="item.path">{{ item.label }}</router-link>
      <span v-else>{{ item.label }}</span>
      <span v-if="idx < breadcrumb.length - 1" class="mx-2">/</span>
    </span>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

function buildBreadcrumb(route, $t) {
  const home = { label: $t("navigation.home"), path: "/dashboard" }
  const others = route.matched
    .filter(r => r.meta && r.meta.i18nkey)
    .map(r => ({
      label: $t(r.meta.i18nkey),
      path: r.path
    }))
  return [home, ...others]
}

export default defineComponent({
  name: 'Breadcrumb',
  computed: {
    breadcrumb() {
      return buildBreadcrumb(this.$route, this.$t)
    }
  }
})
</script>
