<template>
  <header class="header">
    <ul>
      <nuxt-link to="/" class="header-Logo" tag="li">
        <span v-if="this.$route.name === 'index' || this.$route.name === 'projects-slug'">Dries</span>
        <span v-if="this.$route.name === 'index'">Bos — Web & Interaction Development</span>
        <span v-if="this.$route.name === 'projects-slug'">
          and
          <span class="header-Logo_Capitalize">{{ slug }}</span>
        </span>
      </nuxt-link>
      <li
        v-if="this.$route.name === 'projects-slug' || this.$route.name === 'all'"
        class="header-Close"
      >
        <nuxt-link to="/" title="close project">
          <div class="icon close" v-html="require('~/assets/images/icon-close.svg?include')"></div>
        </nuxt-link>
      </li>
      <li v-if="this.$route.name === 'index'" @click="toggleTheView">
        <div class="header-Toggle">
          <div class="header-Toggle_Item" :class="{ active: viewState }">
            <p>list</p>
          </div>
          <div class="header-Toggle_Item" :class="{ active: !viewState }">
            <p>grid</p>
          </div>
        </div>
      </li>
      <nuxt-link v-if="this.$route.name === 'index'" to="/profile" class="header-Profile" tag="li">
        <p>profile</p>
      </nuxt-link>
      <li v-if="this.$route.name === 'index'" @click="toggleTheme">
        <div class="header-Theme" title="change theme"></div>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
      slug: null
    }
  },
  fetch({ store }) {
    store.commit("toggleTheView")
  },
  computed: {
    ...mapState({
      viewState: state => state.view.viewState
    })
  },
  watch: {
    $route(to, from) {
      this.processedSlug()
    }
  },
  methods: {
    toggleTheme() {
      this.$emit("toggleTheme")
    },
    processedSlug() {
      if (this.$route.name === "projects-slug") {
        let str = this.$route.params.slug
        this.slug = str.replace(/-/g, " ")
      }
    },
    // ...mapMutations("view", ["set", "toggleTheView"]),
    toggleTheView() {
      this.$store.commit("view/toggleTheView")
    }
  },
  mounted() {
    this.processedSlug()
  }
}
</script>

<style lang="sass">
@import '~/assets/styling/variables.sass'

.header
  position: fixed
  top: 0
  left: 0
  right: 0
  z-index: 1
  box-sizing: border-box
  ul
    display: flex
    flex-wrap: wrap
    li
      padding-top: var(--spacing-two)
      padding-bottom: var(--spacing-two)
      padding-left: var(--spacing-one)
      padding-right: var(--spacing-one)
      cursor: pointer
    li:first-child
      padding-left: var(--spacing-two)
      flex-grow: 1
      flex-shrink: 0
    li:last-child
      padding-right: var(--spacing-two)
  &-Logo_Capitalize
    text-transform: capitalize
  &-Toggle
    height: 100%
    border-radius: 1000px
    display: inline-flex
    border: 1px solid var(--type)
    min-height: 24px
    &_Item
      padding-left: 30px
      padding-right: 30px
      border-radius: 1000px
      &.active
        background: var(--support-color)
        color: var(--support-type)
      p
        line-height: 1
        transform: translateY(3px)
  &-Profile
    &:hover
      transition: color $transition-hover
      color: var(--support-color)
  &-Theme
    background-color: var(--support-color)
    height: 100%
    min-height: 24px // Prevents collapse when single item in a row
    border: 1px solid var(--type)
    width: 1.495em
    border-radius: 1000px
</style>