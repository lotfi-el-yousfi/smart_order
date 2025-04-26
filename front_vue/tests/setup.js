// src/test/setup.ts
import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach } from 'vitest'
import { cleanup } from '@testing-library/vue'

import { config } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createTestingPinia } from '@pinia/testing'

const vuetify = createVuetify({
    components,
    directives,
})

beforeEach(() => {
    config.global.plugins = [createTestingPinia(), vuetify]
})

afterEach(() => {
    cleanup()
})
