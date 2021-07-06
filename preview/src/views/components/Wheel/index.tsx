import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { fetch, randomInt } from '../../../shared/utils'
import { useRotate } from 'marketing-ui'
import './index.less'
/// [demo]
export default defineComponent({
  setup() {
    const state = reactive({
      angle: 0
    })

    const hooks = useRotate((angle: number) => {
      state.angle = angle
    })

    onMounted(() => {
      hooks.idled()
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

    return {
      ...toRefs(state),
      onStart,
      options: Array.from({length: 6}).map((_, index) => (
        {
          title: `${index+1}等奖`,
          image: `/option/option_${index+1}.png`
        }
      ))
    }
  },

  render() {
    const children = this.options.map((option, index) => (
      <mk-wheel-option
        key={index}
        index={index}
        title={option.title}
        image={option.image}
        class={index % 2 === 0 ? 'wheel-option__1' : 'wheel-option__2'}
      ></mk-wheel-option>
    ))

    return <demo-block>
      <div class="wheel">
        <mk-wheel class="wheel-bg" angle={this.angle}>{children}</mk-wheel>
        <div class="wheel-btn" onClick={this.onStart}>
          <div class="wheel-btn__inner"></div>
        </div>
      </div>
    </demo-block>
  }
})
/// [demo]