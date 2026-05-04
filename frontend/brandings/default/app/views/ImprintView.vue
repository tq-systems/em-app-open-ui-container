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
          <CardLegal urltrunk="static/legal_texts/imprint_" type="html" class="mb-3" />
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import CardLegal from '../components/CardLegal.vue';
  </script>
