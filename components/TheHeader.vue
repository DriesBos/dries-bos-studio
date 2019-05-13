<template>
  <header>
    <nuxt-link class="header-Logo header-Link" to="/" tag="div">
      <p v-if="$route.path === '/'">Dries Bos Studio</p>
      <p v-if="headerTitle">Dries and {{ headerTitle }}</p>
    </nuxt-link>
    <div v-if="$route.path === '/'" class="header-Icons header-Profile">
      <nuxt-link class="header-Link" to="/about" tag="div">
        <img src="~assets/images/profile.png">
      </nuxt-link>
    </div>
    <div v-if="$route.path !== '/'" class="header-Icons header-Close">
      <nuxt-link class="header-Link" to="/" tag="div">
        <img src="~assets/images/close.png">
      </nuxt-link>
    </div>
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
