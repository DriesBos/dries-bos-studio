<template>
  <header class="header">
    <nuxt-link class="header-Link" to="/" tag="div">
      <h1 v-if="$route.name === 'index'">
        <span>Dries</span> Bos Studio
      </h1>
      <h1 v-if="headerTitle">
        <span>Dries</span>
        and {{ headerTitle }}
      </h1>
    </nuxt-link>
    <div class="header-Icons">
      <slot></slot>
      <nuxt-link
        v-if="$route.path !== '/'"
        class="header-Link header-Close"
        to="/"
        tag="div"
        title="close page"
      >
        <img src="~assets/images/close.png" class="site-Icon">
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
