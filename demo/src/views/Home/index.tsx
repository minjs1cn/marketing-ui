import { defineComponent } from 'vue'
import HomeNav, { INavGroup } from '../../components/HomeNav'
import { homeNav } from '../../router'

import './index.less'

export default defineComponent({
  setup() {
    return {
      group: homeNav
    }
  },
  render() {
    return <div class="demo-home">
      <h1 class="demo-home__title">
        <img src="/logo.png" alt="" />
        <span>Marketing UI</span>
      </h1>
      <h2 class="demo-home__desc">
        丰富、可靠的互动营销组件库
      </h2>
      {
        this.group.length && this.group.map((item: INavGroup) => {
          return (
            <HomeNav key={item.name} group={item} />
          )
        })
      }
    </div>
  }
})