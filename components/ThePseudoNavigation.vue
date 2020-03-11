<template>
  <header class="header header-Pseudo">
    <ul v-if="this.$route.name === 'index'">
      <li>
        <p>about</p>
      </li>
      <li>
        <div class="header-Toggle">
          <div class="header-Toggle_Item" :class="{ active: viewState }">
            <p>text</p>
          </div>
          <div class="header-Toggle_Item" :class="{ active: !viewState }">
            <p>img</p>
          </div>
        </div>
      </li>
      <li>
        <div class="header-Theme">
          <div class="header-Theme_Half"></div>
        </div>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState({
      viewState: state => state.view.viewState
    })
  }
}
</script>
