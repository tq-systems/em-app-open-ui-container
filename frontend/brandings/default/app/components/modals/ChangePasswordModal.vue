<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
    <div class="animated fadeIn">
        <!-- Modal -->
        <teleport to="body">
            <template v-if="localShow">
                <div class="modal-backdrop fade" :class="{ show: localShow }" />

                <div
                    id="changePasswordModal"
                    class="modal fade"
                    :class="{ show: localShow }"
                    tabindex="-1"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="changePasswordModal-label"
                    :style="{ display: localShow ? 'block' : 'none' }"
                >
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <!-- Header -->
                            <header class="modal-header">
                                <h5 id="changePasswordModal-label" class="modal-title">
                                    {{ $t('header.password.changepassword') }}
                                </h5>
                                <button
                                    type="button"
                                    class="btn-close"
                                    aria-label="Close"
                                    @click="hide()"
                                />
                            </header>

              <!-- Body -->
            <section class="modal-body">
                <div class="row mb-3">
                    <label for="oldPassword" class="col-sm-4 col-form-label">{{ $t('header.password.oldpassword') }}</label>
                    <div class="col-sm-8">
                        <!-- EMPasswordInput inline -->
                        <div class="input-group">
                            <input
                                id="oldPassword"
                                :type="isRevealedOld ? 'text' : 'password'"
                                class="form-control"
                                name="oldPassword"
                                autocomplete="current-password"
                                autocapitalize="off"
                                spellcheck="false"
                                v-model="form.oldPassword"
                                :class="validationErrors.oldPassword ? 'is-invalid' : ''"
                            />
                            <button
                                type="button"
                                class="input-group-text"
                                @pointerdown.prevent="isRevealedOld = true"
                                @pointerup="isRevealedOld = false"
                                @pointerleave="isRevealedOld = false"
                                @pointercancel="isRevealedOld = false"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>
                        </div>
                        <span
                            v-if="validationErrors.oldPassword"
                            class="invalid-feedback d-block"
                        >
                            {{ validationErrors.oldPassword }}
                        </span>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="newPassword" class="col-sm-4 col-form-label">{{ $t('header.password.newpassword') }}</label>
                    <div class="col-sm-8">
                        <!-- EMPasswordInput inline -->
                        <div class="input-group">
                            <input
                                id="newPassword"
                                :type="isRevealedNew ? 'text' : 'password'"
                                class="form-control"
                                name="newPassword"
                                autocomplete="new-password"
                                autocapitalize="off"
                                spellcheck="false"
                                v-model="form.newPassword"
                                :class="validationErrors.newPassword && validationErrors.newPassword.length > 0 ? 'is-invalid' : ''"
                                @input="handleFieldValidation('newPassword', form.newPassword)"
                            />
                            <button
                                type="button"
                                class="input-group-text"
                                @pointerdown.prevent="isRevealedNew = true"
                                @pointerup="isRevealedNew = false"
                                @pointerleave="isRevealedNew = false"
                                @pointercancel="isRevealedNew = false"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>
                        </div>
                        <span
                            v-for="(msg, idx) in validationErrors.newPassword"
                            :key="idx"
                            class="invalid-feedback d-block"
                        >
                            {{ msg === 'validation.messages.min_lenght'
                                ? $t(msg, { field: $t('validation.attributes.newPassword'), min: "12" })
                                : $t(msg, { field: $t('validation.attributes.newPassword') })
                            }}
                        </span>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="repetition" class="col-sm-4 col-form-label">{{ $t('header.password.repetition') }}</label>
                    <div class="col-sm-8">
                        <!-- EMPasswordInput inline -->
                        <div class="input-group">
                            <input
                                id="repetition"
                                :type="isRevealedRepeat ? 'text' : 'password'"
                                class="form-control"
                                name="repetition"
                                autocomplete="new-password"
                                autocapitalize="off"
                                spellcheck="false"
                                v-model="form.repetition"
                                :class="validationErrors.repetition ? 'is-invalid' : ''"
                                @input="handleFieldValidation('repetition', form.repetition)"
                            />
                            <button
                                type="button"
                                class="input-group-text"
                                @pointerdown.prevent="isRevealedRepeat = true"
                                @pointerup="isRevealedRepeat = false"
                                @pointerleave="isRevealedRepeat = false"
                                @pointercancel="isRevealedRepeat = false"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>
                        </div>
                        <span
                            v-if="validationErrors.repetition"
                            class="invalid-feedback d-block"
                            >
                            {{ $t(validationErrors.repetition, { field: $t('validation.attributes.newPassword') }) }}
                        </span>
                    </div>
                    <span
                        v-if="validationErrors.unknownError"
                        class="invalid-feedback d-block"
                    >
                        {{ validationErrors.unknownError }}
                    </span>
                </div>
            </section>

                            <!-- Footer -->
                            <footer class="modal-footer">
                                <button type="button" class="btn btn-primary" @click="handleSubmit">
                                    {{ $t('header.password.submit') }}
                                </button>
                                <button type="button" class="btn btn-secondary" @click="hide()">
                                    {{ $t('header.password.cancel') }}
                                </button>
                            </footer>
                        </div>
                    </div>
                </div>
            </template>
        </teleport>
    </div>
</template>

<script lang="ts">
import store from '@tq-systems/em-ui-core/store'
import http from '@tq-systems/em-http-service'
import { passwordChangeSchema } from './../validation/passwordChangeSchema'
import { ref } from 'vue'

export default {
    name: 'ModalActivity',
    setup() {
        const localShow = ref(false)
        const isRevealedOld = ref(false)
        const isRevealedNew = ref(false)
        const isRevealedRepeat = ref(false)

        return {
            localShow,
            isRevealedOld,
            isRevealedNew,
            isRevealedRepeat,
        }
    },
    data () {
        return {
            form: {
                oldPassword: '',
                newPassword: '',
                repetition: '',
            },
            validationErrors: {} as Record<string, string | null>,
        }
    },
    methods: {
        show () {
            this.localShow = true
            document.body.classList.add('modal-open')
        },
        hide () {
            this.localShow = false
            document.body.classList.remove('modal-open')
            this.form = { oldPassword: '', newPassword: '', repetition: '' }
            this.validationErrors = {}
            this.isRevealedOld = false
            this.isRevealedNew = false
            this.isRevealedRepeat = false
        },
        validateAll(schema, values) {
            // Validate the entire object
            const result = schema.safeParse(values)
            if (!result.success) {
            // Return an array of error objects [{ field, message }]
            return result.error.issues.map(err => ({
                field: err.path[0],
                message: err.message
            }))
            }
            return []
        },
        handleFieldValidation(field: string, value: unknown) {
            if (field === 'newPassword') {
                // Get all issues for newPassword
                const issues = validateAll(passwordChangeSchema, { newPassword: value })
                    .filter(err => err.field === 'newPassword')
                    .map(err => err.message)
                if (issues.length > 0) {
                    this.validationErrors.newPassword = issues
                } else {
                    delete this.validationErrors.newPassword
                }
            }
            else if (field === 'repetition') {
                // validate repetition equals newPassword
                if (value !== this.form.newPassword) {
                    this.validationErrors.repetition = 'validation.messages.confirmed_password'
                } else {
                    delete this.validationErrors.repetition
                }
            }
        },
        handleSubmit() {
            this.handleFieldValidation('newPassword', this.form.newPassword)
            this.handleFieldValidation('repetition', this.form.repetition)

            const newPasswordIssues = (this.validationErrors.newPassword as string[]) || []
            const repetitionIssue = this.validationErrors.repetition ? [this.validationErrors.repetition as string] : []
            if (newPasswordIssues.length || repetitionIssue.length) {
                return
            }

            const payload = {
                Repetition: this.form.repetition,
                oldPassword: this.form.oldPassword,
                newPassword: this.form.newPassword,
            }

            http.post('/api/web-login/newpassword', payload, { timeout: 2000 })
                .then((response) => {
                    store.commit('requestOk', this.$t('header.password.savedSuccessful'))
                    this.hide()
                })
                .catch((err) => {
                    if (err.response?.data && err.response?.data.toLowerCase().includes('error validating old credentials')) {
                        this.validationErrors.oldPassword = this.$t('header.password.invalid-password')
                    } else {
                        this.validationErrors.unknownError = err.message
                    }
                })
        },
    }
}
</script>
