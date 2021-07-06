import { defineComponent, onMounted, reactive, toRefs, computed } from 'vue'
import { fetch, randomInt } from '../../../shared/utils'
import { useTurnTable } from 'marketing-ui'
import './index.less'

export default defineComponent({
  setup() {
    const state = reactive({
      angle: 0
    })

    const hooks = useTurnTable((angle: number) => {
      state.angle = angle
    })

    onMounted(() => {
      // hooks.idled()
      hooks.init({
        el: '#my-turnTable'
      }).drawOptions(Array.from({length: 8}).map((_, index) => (
        {
          title: `1等奖`,
          color: index % 2 === 0 ? '#fff' : '#f47920',
          // angle: index === 5 ? 110 : 50,
          image: `/marketing-ui/option/option_${index+1}.png`,
          backgroundColor: index % 2 === 0 ? '#f47920' : '#fff'
        }
      )))
    })

    const onStart = async () => {
      hooks.start()
      const { data } = await fetch<number>(randomInt())
      hooks.to({
        duration: 2000,
        index: data,
        complete: () => {
          console.log('中奖啦', data)
        }
      })
    }

    const style = computed(() => ({
      transform: `rotate3d(0, 0, 1, ${state.angle}deg)`
    }))

    return {
      style,
      ...toRefs(state),
      onStart
    }
  },

  render() {
    return <demo-block>
      <div class="turntable">
        <canvas id="my-turnTable" style={this.style} />
        <div class="turntable-btn" onClick={this.onStart}>
          <div class="turntable-btn__inner"></div>
        </div>
      </div>
    </demo-block>
  }
})