import { App, Plugin } from 'vue'
import Wheel from './src/index'
import WheelOption from './src/option'

Wheel.install = function (Vue: App) {
  Vue.component(Wheel.name, Wheel)
  Vue.component(WheelOption.name, WheelOption)
}

Wheel.Option = WheelOption

export default Wheel as typeof Wheel &
  Plugin & {
    readonly Option: typeof WheelOption
  }
