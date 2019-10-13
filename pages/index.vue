<template>
  <div>
    <TheHeader :data-header="toggleHeader" />
    <div class="view-Container view-Index">
      <ul class="list">
        <li is="IndexListItem" v-for="post in posts" :key="post.id" :post="post"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import IndexListItem from '~/components/IndexListItem.vue'

import { mapState } from 'vuex'

export default {
  components: {
    TheHeader: TheHeader,
    IndexListItem: IndexListItem
  },
  data: function() {
    return {
      toggleHeader: false,
      lastScrollPosition: 0
    }
  },
  computed: mapState({
    posts: state => state.posts.list
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
