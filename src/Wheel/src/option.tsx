import { computed, defineComponent } from 'vue'
import { getSlot } from '../../shared/utils'

export default defineComponent({
  name: 'mk-wheel-option',

  props: {
    index: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },

  setup(props, ctx) {
    const optionStyle = computed(() => ({
      transform: `rotate(${15 + props.index * 60}deg) skew(15deg, 15deg)`,
    }))

    const onClick = () => {
      ctx.emit("click", props.index)
    }

    return {
      optionStyle,
      onClick
    }
  },
  
  render() {
    return  <div
      onClick={this.onClick}
      style={this.optionStyle}
      class="mk-wheel-option"
    >
      <div class="mk-wheel-option__revert">
        {this.title && <div class="mk-wheel-option__title">{this.title}</div>}
        {this.image && (
          <img
            class="mk-wheel-option__image"
            src={this.image}
            alt={this.title}
          />
        )}
        {getSlot(this)}
      </div>
    </div>
  }
})