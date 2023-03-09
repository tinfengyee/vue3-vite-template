import { withInstall } from '@/utils'
// import { withInstall } from 'element-plus/es/utils'

import appDarkMode from './src/AppDarkMode.vue'
import appLocalePicker from './src/AppLocalePicker.vue'

export const AppDarkMode = withInstall(appDarkMode)
export const AppLocalePicker = withInstall(appLocalePicker)
