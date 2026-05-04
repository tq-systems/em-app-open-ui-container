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
          <use href="/static/img/ui-icons.svg#user"></use>
        </svg>
        <span>{{ $t('header.profile') }}</span>
      </a>

      <div class="dropdown-menu end-0" :class="{ show: isOpen }" @click="close">
        <a
            class="dropdown-item"
            href="#"
            @click.prevent="signOut"
        >
          {{ $t('header.signout') }}
        </a>
        <a
            class="dropdown-item"
            href="#"
            @click.prevent="openChangePasswordModal"
        >
          {{ $t('header.password.changepassword') }}
        </a>
        <a
            v-if="store.state.apps.find(app => app.identifier === 'access-token')"
            class="dropdown-item"
            href="#"
            @click.prevent="router.push('/access-token')"
        >
          {{ $t('access-token.access-tokens') }}
        </a>
      </div>
      <ChangePasswordModal ref="changePasswordModal" />
    </div>
  </template>

  <script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount } from 'vue'
    import { useRouter } from 'vue-router'
    import store from '@tq-systems/em-ui-core/store'
    import http from '@tq-systems/em-http-service'
    import ChangePasswordModal from './modals/ChangePasswordModal.vue'

    defineOptions({
        name: 'ProfileWidget'
    })

    const router = useRouter()
    const dropdownRef = ref(null)
    const changePasswordModal = ref<InstanceType<typeof ChangePasswordModal> | null>(null)
    const isOpen = ref(false)

    const toggle = () => (isOpen.value = !isOpen.value)
    const close = () => (isOpen.value = false)

    const handleClickOutside = (event) => {
        if (!dropdownRef.value?.contains(event.target)) {
        close()
        }
    }

    const signOut = async () => {
        try {
            await http.get('/api/web-login/logout', { timeout: 4000 })
        } catch (err) {
            store.commit('httpError', err)
        }
        localStorage.removeItem('token')
        router.push('/login')
    }

    const openChangePasswordModal = async () => {
        changePasswordModal.value?.show()
    }
    onMounted(() => {
        document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
        document.removeEventListener('click', handleClickOutside)
    })
  </script>
