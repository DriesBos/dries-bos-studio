<template>
  <header class="header">
    <nuxt-link class="header-Logo header-Link ellipsis" to="/" tag="a">
      <h1 v-if="$route.name === 'index'">Dries Bos Studio</h1>
      <h1 v-else-if="headerTitle">Dries and {{ headerTitle }}</h1>
      <h1 v-else>&nbsp;</h1>
    </nuxt-link>
    <div class="header-Icons">
      <nuxt-link
        v-if="previousUrl"
        class="header-Link header-Arrow"
        :to="previousUrl"
        tag="a"
        title="close page"
      >
        <img src="~assets/images/arrow-left.png" class="site-Icon" />
      </nuxt-link>
      <nuxt-link v-if="$route.path !== '/'" class="header-Link" to="/" tag="a" title="close page">
        <img src="~assets/images/close.png" class="site-Icon" />
      </nuxt-link>
      <nuxt-link
        v-if="nextUrl"
        class="header-Link header-Arrow"
        :to="nextUrl"
        tag="a"
        title="close page"
      >
        <img src="~assets/images/arrow-right.png" class="site-Icon" />
      </nuxt-link>
      <a
        v-if="$route.path === '/'"
        @click="$store.commit('posts/toggleList', !isList)"
        class="header-Link header-Toggle"
      >
        <img key="list" v-if="isList" src="~assets/images/blocks.png" class="site-Icon" />
        <img key="grid" v-else src="~assets/images/list.png" class="site-Icon" />
      </a>
      <nuxt-link
        v-if="$route.path === '/'"
        class="header-Link header-Profile"
        to="/about"
        tag="a"
        title="about page"
      >
        <img src="~assets/images/profile.png" class="site-Icon" />
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    headerTitle: {
      type: String,
      required: false
    },
    previousUrl: {
      type: String,
      required: false
    },
    nextUrl: {
      type: String,
      required: false
    }
  },
  computed: mapState({
    isList: state => state.posts.isList
  })
}
</script>
