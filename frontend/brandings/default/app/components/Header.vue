<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
  <nav class="navbar bg-primary text-white">
    <div class="ps-0 container-fluid d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-2 flex-grow-1">
        <router-link class="navbar-brand d-none d-md-block" to="/dashboard">
          <svg role="img" height="38">
            <use href="/static/img/branding.svg#logo"></use>
          </svg>
        </router-link>
        <!-- Spacer for mobile to accommodate burger button -->
        <div class="d-md-none" style="width: 50px;"></div>
      </div>
      <NavbarWidgets />
    </div>
  </nav>
</template>

<script setup>
import NavbarWidgets from './NavbarWidgets.vue';

defineOptions({
  name: 'Header'
})
</script>
