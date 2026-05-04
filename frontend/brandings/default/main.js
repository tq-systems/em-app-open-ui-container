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

import App from '@branding-default/app/App.vue'
import { initializeContainerApp } from '@tq-systems/em-ui-core/main.base.js'
import { createAppRoutes } from '@tq-systems/em-vue3-core'
import config from './config.json'

import ApplicationView from '@branding-default/app/views/ApplicationView.vue'
import LoginView from '@branding-default/app/views/LoginView.vue'
import DashboardView from '@branding-default/app/views/DashboardView.vue'
import ImprintView from '@branding-default/app/views/ImprintView.vue'
import DisclaimerView from '@branding-default/app/views/DisclaimerView.vue'
import PrivacyPolicyView from '@branding-default/app/views/PrivacyPolicyView.vue'
import LicensesView from '@branding-default/app/views/LicensesView.vue'

function createRoutes({ emRoutes, config }) {
  const { footerLinks = {} } = config

  return [
    // Microfrontend routes
    ...createAppRoutes(emRoutes, ApplicationView),

    // Fixed container routes
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { i18nkey: 'navigation.dashboard' } },
    { path: '/login', name: 'login', component: LoginView, meta: { i18nkey: 'navigation.login' } },

    // Optional footer routes by config
    footerLinks.hasImprint    && { path: '/imprint',       name: 'imprint',       component: ImprintView,       meta: { i18nkey: 'footer.imprint' } },
    footerLinks.hasDisclaimer && { path: '/disclaimer',    name: 'disclaimer',    component: DisclaimerView,    meta: { i18nkey: 'footer.disclaimer' } },
    footerLinks.hasPrivacy    && { path: '/privacypolicy', name: 'privacypolicy', component: PrivacyPolicyView, meta: { i18nkey: 'footer.privacypolicy' } },
    footerLinks.hasLicenses   && { path: '/licenses',      name: 'licenses',      component: LicensesView,      meta: { i18nkey: 'footer.licenses' } },
  ].filter(Boolean)
}

initializeContainerApp({
  App,
  createRoutes,
  config,
})
