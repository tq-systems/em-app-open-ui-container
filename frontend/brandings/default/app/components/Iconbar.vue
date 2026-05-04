<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: René Härtel and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
  <div>
    <!-- desktop sidebar -->
    <aside v-if="store.getters.isViewmodeFull"
      class="bg-sidebar d-none d-lg-flex flex-column flex-shrink-0 sidebar-width h-100 border-end position-fixed top-0 start-0 z-3">
      <header class="fw-light fs-1 m-0 p-3 pt-4">
        <h4 class="fw-bold text-sidebar d-flex align-items-center">
          {{ $t("meta.title") }}
          <img src="/static/img/logo-symbol.png" class="ms-2 branding-icon" alt="Logo" />
        </h4>
      </header>
      <nav class="sidebar-nav">
        <!-- Dashboard item -->
        <router-link
          class="position-relative text-decoration-none mb-2 p-2 d-flex align-items-center"
          :class="isActive('dashboard') ? 'active-icon': ''"
          to="/dashboard"
        >
          <svg class="nav-icon ms-2" role="img" aria-hidden="true">
            <use href="/static/img/branding.svg#dashboard" />
          </svg>
          <div class="ms-3">
            <span>{{ $t("navigation.dashboard") }}</span>
          </div>
        </router-link>
        <!-- Dynamic app items -->
        <template v-for="item in navItems" :key="item.identifier">
          <router-link
            class="position-relative text-decoration-none mb-2 p-2 d-flex align-items-center"
            :class="isActive(item.identifier) ? 'active-icon': ''"
            :to="`/${item.identifier}`"
          >
            <svg class="nav-icon ms-2" role="img" aria-hidden="true">
              <use :href="`${item.app_icon}#icon`" />
            </svg>
            <div class="ms-3">
              <span>{{ $t(item.i18nkey) }}</span>
            </div>
          </router-link>
        </template>
      </nav>
    </aside>
    <!-- mobile burger button -->
    <button
        class="position-fixed top-0 start-0 z-3
          d-flex justify-content-center align-items-center
          btn btn-primary rounded
          d-lg-none burger-button"
        @click="toggleSidebar"
      >
        <svg role="img" aria-hidden="true" class="burger-icon">
          <use v-if="sidebarOpen" href="/static/img/ui-icons.svg#arrow-left" stroke-width="1" />
          <use v-else href="/static/img/ui-icons.svg#bars-3" />
        </svg>
    </button>
    <!-- mobile sidebar -->
    <aside v-if="store.getters.isViewmodeFull"
      class="bg-sidebar
        d-lg-none
        position-fixed top-0 start-0 z-2
        sidebar-width h-100
        sidebar-mobile"
        :class="sidebarMobile"
      >
      <nav class="sidebar-nav mt-5 pt-3">
        <!-- Dashboard item mobile -->
        <router-link
          class="position-relative text-decoration-none mb-2 p-2 d-flex align-items-center"
          :class="isActive('dashboard') ? 'active-icon': ''"
          to="/dashboard"
          @click="toggleSidebar"
        >
          <svg class="nav-icon ms-2" role="img" aria-hidden="true">
            <use href="/static/img/branding.svg#dashboard" />
          </svg>
          <div class="ms-3">
            <span>{{ $t("navigation.dashboard") }}</span>
          </div>
        </router-link>
        <!-- Dynamic app items mobile -->
        <template v-for="item in navItems" :key="item.identifier">
          <router-link
            class="position-relative text-decoration-none mb-2 p-2 d-flex align-items-center"
            :class="isActive(item.identifier) ? 'active-icon': ''"
            :to="`/${item.identifier}`"
            @click="toggleSidebar"
          >
            <svg class="nav-icon ms-2" role="img" aria-hidden="true">
              <use :href="`${item.app_icon}#icon`" />
            </svg>
            <div class="ms-3">
              <span>{{ $t(item.i18nkey) }}</span>
            </div>
          </router-link>
        </template>
      </nav>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import store from '@tq-systems/em-ui-core/store'

const props = defineProps<{
  navItems: Array<any>
}>()

const route = useRoute()
const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function isActive(identifier: string) {
  return route.path.startsWith('/' + identifier)
}

const sidebarMobile = computed(() => {
  return {
    'translate-x-100': !sidebarOpen.value,
    'translate-x-0': sidebarOpen.value
  }
})
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@branding/styles/tokens" as tokens;

.sidebar-width {
  width: 280px;
  @media (max-width: map.get(tokens.$breakpoints, "sm")) {
    width: 100% !important;
  }
}

.bg-sidebar {
  background-color: var(--color-gray-100);
}

.text-sidebar {
  color: var(--color-defaulttext);
}

.burger-button {
  margin: 0.5rem;
  width: 38px;
  height: 38px;
}

.burger-icon {
  max-height: 24px;
  width: 24px;
  height: 24px;
}

.nav-icon {
  max-width: 24px;
  max-height: 24px;
}

.branding-icon {
  width: 28px;
  height: 28px;
}

.sidebar-mobile {
  transition: transform 0.3s ease-in-out;
}

.translate-x-100 {
  transform: translateX(-100%);
}

.translate-x-0 {
  transform: translateX(0);
}
</style>
