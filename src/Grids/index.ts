import { App, Plugin } from 'vue'
import Grids from './src/index'

Grids.install = function (Vue: App) {
  Vue.component(Grids.name, Grids)
}

export default Grids as typeof Grids &
  Plugin
