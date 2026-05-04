<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
  <footer class="pb-2 p-lg-3">
    <div class="d-flex flex-column flex-sm-row container-fluid justify-content-between align-items-sm-center flex-wrap">
      <div class="app-footer-item">
        <ul class="nav footer-links flex-column flex-sm-row gap-sm-3">
          <li
            v-for="l in footerLinks"
            :key="l.name"
            class="nav-item"

          >
            <RouterLink class="nav-link d-inline p-0" :to="{ name: l.name }">
              {{ t(l.i18nKey) }}
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="app-footer-item">
        <ul class="nav footer-links">
          <li class="nav-item">
            <a class="nav-link d-inline p-0" :href="t('footer.link')">
              {{ t('footer.right', { copyrightyear }) }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import http from '@tq-systems/em-http-service'
import config from '/config.json'

const router = useRouter()
const { t } = useI18n()
const { footerLinks: fl = {} } = config

const footerRouteDefs = [
  { name: 'imprint',       i18nKey: 'footer.imprint',       enabled: !!fl.hasImprint },
  { name: 'disclaimer',    i18nKey: 'footer.disclaimer',    enabled: !!fl.hasDisclaimer },
  { name: 'licenses',      i18nKey: 'footer.licenses',      enabled: !!fl.hasLicenses },
  { name: 'privacypolicy', i18nKey: 'footer.privacypolicy', enabled: !!fl.hasPrivacy },
]

const footerLinks = computed(() =>
  footerRouteDefs.filter(c => c.enabled && router.hasRoute(c.name))
)

const copyrightyear = ref('')

onMounted(async () => {
  try {
    const res = await http.get('/api/device-settings/creationyear')
    copyrightyear.value = res.data.creation_year
  } catch {
    copyrightyear.value = new Date().getFullYear().toString()
  }
})
</script>
