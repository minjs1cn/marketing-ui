import { computed, defineComponent, reactive, toRefs, onMounted } from 'vue'
import { delay, fetch } from '../../../shared/utils'
import { usePainter } from 'marketing-ui'

import './index.less'

export default defineComponent({
  setup() {
    const painer = usePainter()

    painer.onTouchstart(async () => {
      await fetch()
      state.prize = '/prize_banner.jpeg'
    })

    painer.onTouchmove((e, x, y) => {
      painer.scrapeoff(x, y)
    })

    painer.onTouchend(() => {
      if (state.prize) {
        painer.clear()
        delay(2000).then(() => {
          painer.reset('/coating/coating.png')
        })
      }
    })

    onMounted(() => {
      painer.init({
        el: document.getElementById('my-coating') as HTMLCanvasElement,
        coating: '/coating/coating.png'
      })
    })

    const state = reactive({
      prize: ''
    })

    const showPrize = computed(() => state.prize !== '')

    return {
      ...toRefs(state),
      showPrize
    }
  },

  render() {
    return <demo-block>
      <div class="coating">
        {this.showPrize ? <img class="coating-prize" width="360" height="200" alt="中奖信息" src={this.prize} />
        : <div class="coating-prize">
            <span class="coating-prize__loading">loading</span>
          </div>}
        <div class="coating-container">
          <mk-coating id="my-coating" />
        </div>
      </div>
    </demo-block>
  }
})