import { createApp } from 'vue'
import App from './app/App.vue'
import { createPinia } from 'pinia'
import PrimeVueConfig from './app/theme/primevue'
import ToastService from 'primevue/toastservice'

import 'primeicons/primeicons.css'

const app = createApp(App)
const pinia = createPinia()

app.use(PrimeVueConfig.plugin, PrimeVueConfig.options)
app.use(pinia)
app.use(ToastService)

app.mount('#app')
