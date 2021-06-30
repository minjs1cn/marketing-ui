import { defineComponent } from 'vue'
import { getSlot } from '../../shared/utils'

import './index.less'

export default defineComponent({
  name: 'demo-block',
  
  render() {
    return <div class="demo-block">
      {getSlot(this)}
    </div>
  }
})