import { App, Plugin } from 'vue'
import Coating from './src/index'

Coating.install = function (Vue: App) {
  Vue.component(Coating.name, Coating)
}

export default Coating as typeof Coating &
  Plugin
