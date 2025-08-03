import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

export default {
  plugin: PrimeVue,
  options: {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.app-dark',
      },
    },
  },
}
