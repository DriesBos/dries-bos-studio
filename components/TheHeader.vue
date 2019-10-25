<template>
  <header class="header">
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
        tag="div"
        title="close page"
      >
        <img v-if="isLight" src="~assets/images/arrow-left-dark.png" class="icon" />
        <img v-else src="~assets/images/arrow-left-light.png" class="icon" />
      </nuxt-link>
      <nuxt-link
        v-if="$route.path !== '/'"
        class="icon-Container"
        to="/"
        tag="div"
        title="close page"
      >
        <img v-if="isLight" src="~assets/images/close-dark.png" class="icon" />
        <img v-else src="~assets/images/close-light.png" class="icon" />
      </nuxt-link>
      <nuxt-link
        v-if="nextUrl"
        class="icon-Container header-Arrow"
        :to="nextUrl"
        tag="div"
        title="close page"
      >
        <img v-if="isLight" src="~assets/images/arrow-right-dark.png" class="icon" />
        <img v-else src="~assets/images/arrow-right-light.png" class="icon" />
      </nuxt-link>
      <div
        v-if="$route.path === '/' && isList === true"
        @click="$store.commit('posts/toggleList', !isList)"
        class="icon-Container header-Toggle"
      >
        <img key="dark" v-if="isLight" src="~assets/images/grid-dark.png" class="icon" />
        <img key="light" v-else src="~assets/images/grid-light.png" class="icon" />
      </div>
      <div
        v-if="$route.path === '/' && isList === false"
        @click="$store.commit('posts/toggleList', !isList)"
        class="icon-Container header-Toggle"
      >
        <img key="dark" v-if="isLight" src="~assets/images/list-dark.png" class="icon" />
        <img key="light" v-else src="~assets/images/list-light.png" class="icon" />
      </div>
      <div
        v-if="$route.path === '/'"
        @click="$store.commit('posts/toggleLight', !isLight)"
        class="icon-Container"
        title="change theme"
      >
        <img v-if="isLight" src="~assets/images/theme-dark.png" class="icon" />
        <img v-else src="~assets/images/theme-light.png" class="icon" />
      </div>
      <nuxt-link
        v-if="$route.path === '/'"
        class="icon-Container header-Profile"
        to="/about"
        tag="div"
        title="about page"
      >
        <img v-if="isLight" src="~assets/images/profile-dark.png" class="icon" />
        <img v-else src="~assets/images/profile-light.png" class="icon" />
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
    isList: state => state.posts.isList,
    isLight: state => state.posts.isLight
  })
}
</script>
