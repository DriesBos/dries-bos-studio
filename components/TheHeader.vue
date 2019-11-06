<template>
  <transition name="header">
    <header v-if="toggleHeader" class="header">
      <nuxt-link class="header-Logo icon-Container ellipsis" to="/" tag="a">
        <h1>Dries Bos</h1>
      </nuxt-link>
      <div class="header-Container">
        <div
          class="header-Work icon-Container ellipsis"
          v-scroll-to="{
          el: '.view-Index',
          offset: -200
        }"
        >
          <h1>work</h1>
        </div>
        <div class="header-Profile icon-Container ellipsis" v-scroll-to="`.view-Profile`">
          <h1>profile</h1>
        </div>
      </div>
    </header>
  </transition>
</template>

<script>
export default {
  name: 'TheHeader',
  data: function() {
    return {
      toggleHeader: false
    }
  },
  methods: {
    onScrollToggleHeader() {
      let scrollPosition = document.documentElement.scrollTop
      if (scrollPosition !== 0) {
        this.toggleHeader = true
      } else {
        this.toggleHeader = false
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScrollToggleHeader)
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScrollToggleHeader)
  }
}
</script>
