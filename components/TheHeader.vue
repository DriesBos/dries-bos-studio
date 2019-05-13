<template>
  <header>
    <nuxt-link class="header-Logo header-Link" to="/" tag="div">
      <span v-if="$route.path === '/'">Dries Bos Studio</span>
      <span v-if="$route.name === 'blog-postId'">Dries and {{ headerTitle }}</span>
    </nuxt-link>
    <nuxt-link v-if="$route.path === '/'" class="header-Link" to="/about" tag="div">
      <span>Profile</span>
    </nuxt-link>
    <nuxt-link v-if="$route.path !== '/'" class="header-Link" to="/" tag="div">
      <span>X</span>
    </nuxt-link>
  </header>
</template>

<script>
export default {
  props: {
    headerTitle: {
      type: String,
      required: false
    }
  }
}
</script>
