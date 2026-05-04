<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
  <div class="container-fluid mb-3">
    <div class="row">
      <div class="col p-2 text-center bg-danger text-white">
        <span class="mr-2">{{ $t(displayText) }}</span>
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
    props: ['displayText'],
}
</script>
