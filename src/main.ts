import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import { createPinia } from 'pinia'

import App from './app/App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(PrimeVue)
app.mount('#app')
