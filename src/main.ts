import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/stores'
import { setupI18n } from '@/locales'
// import ElementPlus from 'element-plus'
import 'virtual:svg-icons-register'
import '@/assets/iconfont/iconfont.js'
import './styles/reset.scss'
import './styles/index.scss'
const app = createApp(App)

async function bootstrap() {
  // app.use(ElementPlus)
  setupRouter(app)
  setupStore(app)
  setupI18n(app)

  app.mount('#app')
}

bootstrap()
