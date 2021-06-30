import { App } from 'vue'
import Wheel from './src/index'
import WheelOption from './src/option'

(Wheel as any).install = function (Vue: App) {
  Vue.component(Wheel.name, Wheel);
  Vue.component(WheelOption.name, WheelOption);
};

(Wheel as any).Option = WheelOption;

export default Wheel