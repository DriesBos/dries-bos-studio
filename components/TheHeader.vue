<template>
  <header class="header">
    <nuxt-link class="header-Link" to="/" tag="div">
      <h1 v-if="$route.name === 'index'">Dries Bos Studio</h1>
      <h1 v-if="headerTitle">Dries and {{ headerTitle }}</h1>
    </nuxt-link>
    <div class="header-Icons">
      <nuxt-link
        v-if="$route.path !== '/'"
        class="header-Link header-Close"
        to="/"
        tag="div"
        title="close page"
      >
        <img src="~assets/images/close.png" class="site-Icon" />
      </nuxt-link>
      <div v-if="$route.path === '/'" @click="toggle()" class="header-Link header-Toggle">
        <img key="list" v-if="isList" src="~assets/images/blocks.png" class="site-Icon" />
        <img key="grid" v-else src="~assets/images/list.png" class="site-Icon" />
      </div>
      <nuxt-link
        v-if="$route.path === '/'"
        class="header-Link header-Profile"
        to="/about"
        tag="div"
        title="about page"
      >
        <img src="~assets/images/profile.png" class="site-Icon" />
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
  },
  data: function() {
    return {
      isList: false
    }
  },
  methods: {
    toggle: function() {
      this.isList = !this.isList
      console.log(isList)
    }
  }
}
</script>
