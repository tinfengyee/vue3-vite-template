import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/stores'
import { setupI18n } from '@/locales'
import { setupIcons } from '@/components/ElementIcons'

import ElementPlus from 'element-plus'

async function bootstrap() {
  const app = createApp(App)

  app.use(ElementPlus)
  setupRouter(app)
  setupStore(app)
  setupI18n(app)
  setupIcons(app)

  app.mount('#app')
}

bootstrap()
