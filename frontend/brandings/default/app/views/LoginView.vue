<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
  <div>
    <div class="modal fade show d-block" tabindex="-1" role="dialog" aria-modal="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body col-md-12 text-center mt-2 mb-2 mb-sm-4 mt-sm-4">
            <div class="container">
              <h1 class="mb-4 mb-sm-5">
                <span>{{ $t("login.headline") }}</span><br>
                <span>{{ $t("login.product") }}</span>
              </h1>
              <div class="mb-3">
                <img src="static/img/login_image.svg">
              </div>
              <p class="mb-sm-5">Administrator</p>
              <div>
                <div class="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <svg style="width: 14px; height: 14px;" aria-hidden="true">
                      <use xlink:href="static/img/ui-icons.svg#lock-closed"></use>
                    </svg>
                  </span>
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    :class="{'is-invalid': error}"
                    :placeholder="$t('login.password')"
                    @keyup.enter="login()"
                  >
                  <button
                    class="input-group-text"
                    @click="showPassword = !showPassword"
                  >
                    <svg style="width: 14px; height: 14px;" aria-hidden="true">
                      <use href="static/img/ui-icons.svg#eye"></use>
                    </svg>
                  </button>
                  <div
                    v-if="error"
                    class="invalid-feedback"
                  >{{ $t('login.invalid') }}</div>
                </div>
              </div>
              <button type="button" class="btn btn-primary w-100" @click="login()">
                <span v-if="loading" class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span>
                <span v-else class="text-white">{{ $t('login.signin') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Backdrop -->
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import httpService from '@tq-systems/em-http-service'

const router = useRouter()

const password = ref('')
const error = ref(false)
const loading = ref(false)
const showPassword = ref(false)

onMounted(() => {
  // Prevent body scrolling while login modal is visible
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  // Restore body scrolling and reset scroll position when leaving login
  document.body.style.overflow = ''
  window.scrollTo(0, 0)
})

async function login() {
  loading.value = true
  error.value = false
  try {
    const params = new URLSearchParams()
    params.append('grant_type', 'password')
    params.append('client_id', 'emos')
    params.append('client_secret', '56951025')
    params.append('username','admin')
    params.append('password', password.value)

    const response = await httpService.post('/api/web-login/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: 30000
    })

    if (response.data.error) {
      error.value = true
    } else {
      localStorage.setItem('token', response.data.access_token)
      router.push('/dashboard')
    }
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>
