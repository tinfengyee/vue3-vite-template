import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/stores'
import { setupI18n } from '@/locales'
import { registerGlobComp } from './components/registerGlobComp'

// import ElementPlus from 'element-plus'
import 'virtual:svg-icons-register'
import '@/assets/iconfont/iconfont.js'
import './styles/index.scss'

const app = createApp(App)

async function bootstrap() {
  // app.use(ElementPlus)
  registerGlobComp(app)
  setupRouter(app)
  setupStore(app)
  setupI18n(app)

  app.mount('#app')
}

bootstrap()
