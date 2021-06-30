import { computed, defineComponent } from 'vue'
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
      default: 300
    }
  },

  setup(props) {
    const wheelStyle = computed(() => ({
      transform: `rotate3d(0, 0, 1, ${props.angle}deg)`,
      width: props.size + "px",
      height: props.size + "px",
    }))

    return {
      wheelStyle
    }
  },
  
  render() {
    return  <div style={this.wheelStyle} class="mk-wheel">
      {getSlot(this)}
    </div>
  }
})