import type { App } from 'vue'
import BaseDialog from './base-dialog'
import SvgIcon from './svg-icon'

const compList = [BaseDialog, SvgIcon]

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.use(comp)
    // app.component(comp.name || comp.displayName, comp)
  })
}
