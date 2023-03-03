import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/stores'

import './assets/main.css'

async function bootstrap() {
  const app = createApp(App)

  setupRouter(app)
  setupStore(app)

  app.mount('#app')
}

bootstrap()
