import { createApp } from 'vue'
import Router from './router'
import App from './App'
import MarketingUI from 'marketing-ui'
import 'marketing-ui/index.less'
import DemoBlock from './components/DemoBlock'

import './index.less'

const app = createApp(App)
app.use(MarketingUI)

app.component(DemoBlock.name, DemoBlock)

app.use(Router).mount('#app')
