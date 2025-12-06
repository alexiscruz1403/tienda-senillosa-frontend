import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myCustomTheme',
    themes: {
      myCustomTheme: {
        dark: false,
        colors: {
          primary: '#0F1729',
          secondary: '#E6EAF0',
          error: '#D32F2F',
          info: '#1976D2',
          success: '#388E3C',
          warning: '#FBC02D',
          'text-primary': '#F8FAFC',
          'text-secondary': '#0F1729',
        },
      },
    },
  },
  components,
  directives,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
