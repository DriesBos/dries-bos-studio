<template>
  <header class="list">
    <li class="listItem listItem_Header">
      <div class="listItem-DetailsWrapper">
        <div class="listItem-Logo listItem-Details">
          <nuxt-link to="/">
            Dries Bos
            <span v-if="this.$route.name === 'projects-slug'">— {{ $route.params.slug }}</span>
            <span v-else>— Web & Interaction Development</span>
          </nuxt-link>
        </div>
        <div v-if="this.$route.name === 'projects-slug'" class="listItem-Icons">
          <nuxt-link to="/" class="icon-Container" title="close project">
            <div class="icon close" v-html="require('~/assets/images/icon-close.svg?include')"></div>
          </nuxt-link>
        </div>
        <div v-if="this.$route.name === 'index'" class="listItem-Icons">
          <div @click="toggleTheme" class="icon-Container" title="change theme">
            <div class="icon theme" v-html="require('~/assets/images/icon-theme.svg?include')"></div>
          </div>
        </div>
      </div>
    </li>
  </header>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      this.$emit("clicked")
    }
  }
}
</script>
