import { defineComponent, ref } from 'vue'
import { fetch, randomInt } from '../../../shared/utils'
import { useGrids } from 'marketing-ui'

import './index.less'

export default defineComponent({
  setup() {
    const activeIndex = ref(0)
    const hoos = useGrids(index => {
      activeIndex.value = index
    }, 8)

    const onStart = async () => {
      hoos.start()
      const { data } = await fetch<number>(randomInt())
    }

    return {
      onStart,
      activeIndex,
      options: Array.from({length: 8}).map((_, index) => (
        {
          title: `${index+1}等奖`,
          image: `/marketing-ui/option/option_${index+1}.png`
        }
      ))
    }
  },

  render() {
    return <demo-block>
      <div class="grids">
        <mk-grids row={3}>
          {
            this.options.map((option, index) => (
              <div class={'grids-option ' + (index % 2 === 0 ? 'grids-option__1' : 'grids-option__2') + (this.activeIndex === index ? ' grids-option_active' : '')}>{option.title}</div>
            ))
          }
        </mk-grids>
        <div class="grids-btn" onClick={this.onStart}></div>
      </div>
    </demo-block>
  }
})