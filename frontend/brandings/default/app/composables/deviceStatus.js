/*
 * Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld,
 * Germany. All rights reserved.
 * Author: Ronny Freyer and the Energy Manager development team
 *
 * This software is licensed under the TQ-Systems Product Software License
 * Agreement Version 1.0.3 or any later version.
 * You can obtain a copy of the License Agreement in the TQS (TQ-Systems
 * Software Licenses) folder on the following website:
 * https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
 * In case of any license issues please contact license@tq-group.com.
 */

import { computed, ref, onBeforeMount, onBeforeUnmount } from 'vue'
import store from '@tq-systems/em-ui-core/store'
import http from '@tq-systems/em-http-service'

export function useDeviceStatus() {
    const invalidTime = ref(store.state.invalidTime)
    const dangerHeaderMessage = ref(store.state.dangerHeaderMessage)
    const deviceStatus = ref('')
    const previousDeviceStatus = ref('')
    const navigationItem = ref(store.state.apps.filter(item => item.app_icon && item.i18nkey))

    let statusInterval = null
    let timezoneInterval = null

    // DangerHeader objects – control which banners are shown
    const updateHeader = computed(() => ({
        show: deviceStatus.value === 'update-installing' || deviceStatus.value === 'update-finalizing',
        text: 'header.activeupdate',
        dataCy: 'danger-header-update',
    }))

    const restartHeader = computed(() => ({
        show: deviceStatus.value === 'rebooting',
        text: 'header.activerestart',
        dataCy: 'danger-header-restart',
    }))

    const miscHeader = computed(() => ({
        show: !!dangerHeaderMessage.value,
        text: dangerHeaderMessage.value || '',
        dataCy: 'danger-header-misc',
    }))

    // Store event handlers to keep local refs in sync
    function handleSetTimeInvalid(val) { invalidTime.value = val }
    function handleSetDangerHeader(val) { dangerHeaderMessage.value = val }
    function handleAddApp() {
        navigationItem.value = store.state.apps.filter(item => item.app_icon && item.i18nkey)

    }

    // Polls the backend for device status, manages DangerHeader visibility and triggers a reload when update/restart has just finished
    async function updateActive() {
        try {
            const { data } = await http.get('/api/device-settings/devicestatus', { timeout: 1000 })
            const wasUpdateOrRestarting = (
                previousDeviceStatus.value === 'update-installing' ||
                previousDeviceStatus.value === 'update-finalizing' ||
                previousDeviceStatus.value === 'rebooting'
            )
            deviceStatus.value = data.status
            previousDeviceStatus.value = data.status

            if (wasUpdateOrRestarting &&
                !(data.status === 'update-installing' ||
                    data.status === 'update-finalizing' ||
                    data.status === 'rebooting')) {
                clearInterval(statusInterval)
                setTimeout(() => location.reload(), 2000)
            }
        } catch (error) {
            // On 401 Unauthorized: clear device status to hide banner
            if (error.status === 401) {
                deviceStatus.value = ''
                previousDeviceStatus.value = ''
            }
        }
    }

    //  Checks device timezone configuration
    async function setTimezone() {
        try {
            const { data } = await http.get('/api/device-settings/time/config', { timeout: 4000 })
            if (data.invalid !== store.state.invalidTime) {
                store.commit('setTimeInvalid', data.invalid)
            }
            if (data.timezone !== store.state.timezone) {
                store.commit('updateTimezone', data.timezone)
            }
        } catch (e) {}
    }

    onBeforeMount(() => {
        store.on('setTimeInvalid:done', handleSetTimeInvalid)
        store.on('setDangerHeader:done', handleSetDangerHeader)
        store.on('addApp:done', handleAddApp)

        setTimezone()
        updateActive()
        statusInterval = setInterval(updateActive, 2000)
        timezoneInterval = setInterval(setTimezone, 60000)
    })

    onBeforeUnmount(() => {
        clearInterval(statusInterval)
        clearInterval(timezoneInterval)
        store.off('setTimeInvalid:done', handleSetTimeInvalid)
        store.off('setDangerHeader:done', handleSetDangerHeader)
        store.off('addApp:done', handleAddApp)
    })

    return {
        invalidTime,
        updateHeader,
        restartHeader,
        miscHeader,
        navigationItem
    }
}
