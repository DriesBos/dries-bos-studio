<template>
  <div>
    <TheHeader :data-header="toggleHeader" />
    <transition-group tag="div" name="indexView" class="view-Container view-Index">
      <ul v-show="isList" class="list" key="list">
        <li is="IndexListItem" v-for="post in posts" :key="post.id" :post="post"></li>
      </ul>

      <ul v-show="!isList" class="grid" key="grid">
        <li is="IndexGridItem" v-for="post in posts" :key="post.id" :post="post"></li>
      </ul>
    </transition-group>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import IndexListItem from '~/components/IndexListItem.vue'
import IndexGridItem from '~/components/IndexGridItem.vue'

import { mapState } from 'vuex'

export default {
  components: {
    TheHeader: TheHeader,
    IndexListItem: IndexListItem,
    IndexGridItem: IndexGridItem
  },
  data: function() {
    return {
      toggleHeader: false,
      lastScrollPosition: 0
    }
  },
  computed: mapState({
    posts: state => state.posts.list,
    isList: state => state.posts.isList
  }),
  methods: {
    onScroll() {
      // https://medium.com/@Taha_Shashtari/hide-navbar-on-scroll-down-in-vue-fb85acbdddfe
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      this.toggleHeader = currentScrollPosition > this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>
