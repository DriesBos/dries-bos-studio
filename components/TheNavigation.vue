<template>
  <header class="header">
    <ul>
      <nuxt-link to="/" class="header-Logo" tag="li">
        <span
          v-if="
            this.$route.name === 'index' || this.$route.name === 'projects-slug'
          "
          title="that's me!"
        >Dries</span>
        <span
          v-if="this.$route.name === 'index'"
          title="that's me!"
        >Bos — Web & Interaction Development</span>
        <span v-if="this.$route.name === 'projects-slug'" title="me and ...">
          and
          <span class="header-Logo_Capitalize">{{ slug }}</span>
        </span>
      </nuxt-link>
      <li
        v-if="
          this.$route.name === 'projects-slug' || this.$route.name === 'slug'
        "
        class="header-Close"
        title="close project"
      >
        <nuxt-link to="/">
          <div class="icon close" v-html="require('~/assets/images/icon-close.svg?include')"></div>
        </nuxt-link>
      </li>
      <li v-if="this.$route.name === 'index'" @click="toggleTheView" title="toggle text & images">
        <div class="header-Toggle">
          <div class="header-Toggle_Item" :class="{ active: viewState }">
            <p>text</p>
          </div>
          <div class="header-Toggle_Item" :class="{ active: !viewState }">
            <p>img</p>
          </div>
        </div>
      </li>
      <nuxt-link
        v-if="this.$route.name === 'index'"
        to="/about"
        class="header-Profile"
        tag="li"
        title="about me"
      >
        <p>about</p>
      </nuxt-link>
      <li v-if="this.$route.name === 'index'" @click="toggleTheme" title="change theme">
        <div class="header-Theme">
          <div class="header-Theme_Half"></div>
        </div>
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
    toggleTheView() {
      this.$store.commit("view/toggleTheView")
      setTimeout(function() {
        window.scrollTo(0, 0)
      }, 330)
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
  z-index: +1
  ul
    display: flex
    flex-wrap: wrap
    li
      padding-top: var(--spacing-two)
      padding-bottom: var(--spacing-two)
      padding-left: var(--spacing-one)
      padding-right: var(--spacing-one)
      cursor: pointer
      color: var(--type)
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
    background: var(--background-color)
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
    position: relative
    background-color: var(--support-color)
    height: 100%
    min-height: 24px // Prevents collapse when single item in a row
    border: 1px solid var(--type)
    width: 1.495em
    border-radius: 1000px
    overflow: hidden
    &_Half
      position: absolute
      left: 0
      top: 0
      height: 100%
      width: 50%
      transition: background-color $transition-theme
      background-color: var(--background-color)
      transform: rotate(-45deg)
      transform-origin: 100% 50%
</style>
