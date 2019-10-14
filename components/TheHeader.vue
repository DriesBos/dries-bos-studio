<template>
  <header class="header" :data-theme="isList">
    <nuxt-link class="header-Logo icon-Container ellipsis" to="/" tag="a">
      <h1 v-if="$route.name === 'index'">Dries Bos</h1>
      <h1 v-else-if="headerTitle">Dries and {{ headerTitle }}</h1>
      <h1 v-else>&nbsp;</h1>
    </nuxt-link>
    <div class="icons-Row">
      <nuxt-link
        v-if="previousUrl"
        class="icon-Container header-Arrow"
        :to="previousUrl"
        tag="a"
        title="close page"
      >
        <img src="~assets/images/arrow-left.png" class="icon" />
      </nuxt-link>
      <nuxt-link
        v-if="$route.path !== '/'"
        class="icon-Container"
        to="/"
        tag="a"
        title="close page"
      >
        <img v-if="isList" src="~assets/images/close-dark.png" class="icon" />
        <img v-else src="~assets/images/close.png" class="icon" />
      </nuxt-link>
      <nuxt-link
        v-if="nextUrl"
        class="icon-Container header-Arrow"
        :to="nextUrl"
        tag="a"
        title="close page"
      >
        <img src="~assets/images/arrow-right.png" class="icon" />
      </nuxt-link>
      <!-- <a
        v-if="$route.path === '/'"
        @click="$store.commit('posts/toggleList', !isList)"
        class="icon-Container header-Toggle"
      >
        <img key="list" v-if="isList" src="~assets/images/blocks.png" class="icon" />
        <img key="grid" v-else src="~assets/images/list.png" class="icon" />
      </a>-->
      <div
        v-if="$route.path === '/'"
        @click="$store.commit('posts/toggleList', !isList)"
        class="icon-Container"
        title="change theme"
      >
        <img v-if="isList" src="~assets/images/theme-dark.png" class="icon" />
        <img v-else src="~assets/images/theme.png" class="icon" />
      </div>
      <nuxt-link
        v-if="$route.path === '/'"
        class="icon-Container header-Profile"
        to="/about"
        tag="a"
        title="about page"
      >
        <img v-if="isList" src="~assets/images/profile-dark.png" class="icon" />
        <img v-else src="~assets/images/profile.png" class="icon" />
      </nuxt-link>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TheHeader',
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
