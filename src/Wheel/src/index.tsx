import { onMounted } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import { getSlot } from '../../shared/utils'

export default defineComponent({
  name: 'mk-wheel',

  props: {
    angle: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 0
    }
  },

  setup(props) {
    const autoSize = ref(props.size)
    const el = ref()

    const wheelStyle = computed(() => ({
      transform: `rotate3d(0, 0, 1, ${props.angle}deg)`,
      width: (props.size || autoSize.value) + 'px',
      height: (props.size || autoSize.value) + 'px',
    }))

    const setRef = (ele: any) => {
      el.value = ele
    }

    onMounted(() => {
      if (autoSize.value === 0) {
        const rect = el.value.parentNode.getBoundingClientRect()
        autoSize.value = rect.width
      }
    })

    return {
      setRef,
      wheelStyle
    }
  },
  
  render() {
    return  <div style={this.wheelStyle} class="mk-wheel" ref={this.setRef}>
      {getSlot(this)}
    </div>
  }
})