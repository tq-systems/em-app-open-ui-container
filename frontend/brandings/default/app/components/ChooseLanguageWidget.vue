<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
    <div class="dropdown" ref="dropdownRef">
      <a
        href="#"
        class="nav-item d-flex flex-column align-items-center"
        role="button"
        @click.prevent="toggle"
      >
        <svg style="width: 16px; height: 16px;" aria-hidden="true">
          <use href="/static/img/ui-icons.svg#world"></use>
        </svg>
        <span>{{ languages[currentLanguage] ?? 'unknown' }}</span>
      </a>

      <div class="dropdown-menu end-0" :class="{ show: isOpen }" @click="close">
        <a
          v-for="(label, code) in languages"
          :key="code"
          class="dropdown-item"
          href="#"
          @click.prevent="setLanguage(code)"
        >
          {{ label }}
        </a>
      </div>
    </div>
  </template>

  <script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
  import store from '@tq-systems/em-ui-core/store'

  defineOptions({
    name: 'ChooseLanguageWidget'
  })

  const dropdownRef = ref(null)
  const isOpen = ref(false)
  const languages = ref({})
  const currentLanguage = ref(store.state.language)


  const toggle = () => (isOpen.value = !isOpen.value)
  const close = () => (isOpen.value = false)

  const handleClickOutside = (event) => {
    if (!dropdownRef.value?.contains(event.target)) {
      close()
    }
  }

  const setLanguage = (code) => {
    if (currentLanguage.value !== code) {
      store.commit('setLanguage', code)
    }
  }

  onMounted(() => {
    languages.value = window.EMLanguageLabels || {}

    document.addEventListener('click', handleClickOutside)

    store.on('setLanguage:done', (newLang) => {
      currentLanguage.value = newLang
    })
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  </script>

  <style scoped>



  </style>
