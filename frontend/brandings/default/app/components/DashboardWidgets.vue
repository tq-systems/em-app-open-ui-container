<!--
    Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
    Author: Ronny Freyer and the Energy Manager development team

    This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
    You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
    https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
    In case of any license issues please contact license@tq-group.com.
-->

<template>
    <div class="row content-wrapper">
        <div class="col col-xl-10" v-if="appWidgets.length > 1">
            <div class="d-flex flex-column flex-md-row gap-4 content-wrapper">
                    <component 
                        v-for="(widget, key) in appWidgets"
                        class="dashboard-widget"
                        :is="widget.name"
                        :key="widget.name"
                        @click="handleWidgetClick(widget)"
                    />
            </div>
        </div>
        <div class="col col-lg-6 col-md-8 col-sm-9" v-else>
            <div class="d-flex flex-wrap gap-4">
                <component
                    v-for="(widget, key) in appWidgets"
                    class="dashboard-widget"
                    :is="widget.name"
                    :key="widget.name"
                    @click="handleWidgetClick(widget)"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { computed , defineProps } from 'vue'
import config from '/config.json'

const router = useRouter()
const props = defineProps<{ apps: any[] }>()

const appWidgets = computed(() => {
    const result: { name: string; app: string; no_widget_link: any }[] = []
    for (const app of props.apps.filter(app => 'widget' in app)) {
        for (const widget of app.widget) {
            result.push({
                name: widget,
                app: app.identifier,
                no_widget_link: app.no_widget_link
            })
        }
    }

    const configured = config.dashboardWidgets
    if (!configured?.length) {
        return result
    }

    return configured
        .map(name => result.find(widget => widget.name === name))
        .filter(Boolean)
})

function handleWidgetClick(widget) {
  if (!widget.no_widget_link) {
    router.push(widget.app)
  }
}

</script>
