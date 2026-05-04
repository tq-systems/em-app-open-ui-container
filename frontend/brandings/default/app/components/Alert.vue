<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
    <div class="position-fixed top-0 start-50 translate-middle-x mt-5" style="z-index: 999900; width: 50%;">
      <transition name="bounce">
        <div
          v-if="activeAlert"
          class="alert bg-danger text-white alert-dismissible fade show"
          role="alert"
          data-cy="alert-danger"
        >
          <strong>{{ $t('alerts.errordialog') }}: </strong> <em>{{ alertMessage }}</em>
          <span @click="closeAlert" type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></span>
        </div>
      </transition>

      <transition name="bounce">
        <div
          v-if="activeOk"
          class="alert bg-success text-white alert-dismissible fade show"
          role="alert"
          data-cy="alert-success"
        >
          <strong>{{ okMessage }}</strong>
          <span @click="closeOk" type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></span>
        </div>
      </transition>

      <transition name="bounce">
        <div
          v-if="activeWarning"
          class="alert bg-warning text-white alert-dismissible fade show"
          role="alert"
          data-cy="alert-warning"
        >
          <strong>{{ warningMessage }}</strong>
          <span @click="closeWarning" type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></span>
        </div>
      </transition>
    </div>
  </template>

  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import store from '@tq-systems/em-ui-core/store'
  import { useI18n } from 'vue-i18n'


  const { t } = useI18n()

  // Reactive variables
  const activeAlert = ref(false)
  const activeOk = ref(false)
  const activeWarning = ref(false)

  const alertMessage = ref('')
  const okMessage = ref('')
  const warningMessage = ref('')

  const alertTimestamp = ref(null)
  const okTimestamp = ref(null)
  const warningTimestamp = ref(null)

  // Function to show alerts based on type
  function show(type, message) {
    const now = new Date()

    if (type === 'alert') {
      alertMessage.value = message
      alertTimestamp.value = now
      activeAlert.value = true
      setTimeout(toggleAlert, 6000)
    } else if (type === 'ok') {
      okMessage.value = message
      okTimestamp.value = now
      activeOk.value = true
      setTimeout(toggleOk, 6000)
    } else if (type === 'warning') {
      warningMessage.value = message
      warningTimestamp.value = now
      activeWarning.value = true
      setTimeout(toggleWarning, 6000)
    }
  }

  function toggleAlert() {
    if (alertTimestamp.value && new Date().getTime() >= alertTimestamp.value.getTime() + 5000) {
      closeAlert()
    }
  }
  function toggleOk() {
    if (okTimestamp.value && new Date().getTime() >= okTimestamp.value.getTime() + 5000) {
      closeOk()
    }
  }
  function toggleWarning() {
    if (warningTimestamp.value && new Date().getTime() >= warningTimestamp.value.getTime() + 5000) {
      closeWarning()
    }
  }

  // Functions to close alerts and update the store
  function closeAlert() {
    activeAlert.value = false
    store.commit('httpError', '')
  }
  function closeOk() {
    activeOk.value = false
    store.commit('requestOk', '')
  }
  function closeWarning() {
    activeWarning.value = false
    store.commit('requestWarning', '')
  }

  const httpErrorListener = (error) => {
    if (error && error !== '' && error.status !== 401 && store.state.hideAlert !== true) {
      let message = ''
      if (typeof error === 'string') {
        // string error  ->  ready for display
        message = error
      } else if (error.status !== undefined) {
        // http error  ->  use status code for display
        message = `HTTP status: ${error.status}`
        const errorData = error.response?.data || error.data
        if (errorData && typeof errorData === 'string') {
          message += ` - ${errorData}`
        }
      } else if (error.code === 'ECONNABORTED' && String(error.message).match('[Tt]imeout') !== null) {
        // axios-timeout error  ->  use lang key for display
        message = t('alerts.request_timeout')
      } else {
        // other error  ->  use lang key for display
        message = t('alerts.unknown_error')
      }

      show('alert', message)
    }
  }

  const requestOkListener = (val) => {
    if (val && val !== '') show('ok', val)
  }

  const requestWarningListener = (val) => {
    if (val && val !== '') show('warning', val)
  }

  // Register store listeners to show alerts based on store state changes
  function registerStoreListeners() {
      store.on('httpError:done', httpErrorListener)
      store.on('requestOk:done', requestOkListener)
      store.on('requestWarning:done', requestWarningListener)

  }

  onMounted(() => {
    registerStoreListeners()
  })

  onUnmounted(() => {
      store.off('httpError:done', httpErrorListener)
      store.off('requestOk:done', requestOkListener)
      store.off('requestWarning:done', requestWarningListener)
  })
  </script>
