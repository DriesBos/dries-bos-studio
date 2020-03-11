<template>
  <header class="header header-Normal">
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
      <nuxt-link
        v-if="this.$route.name === 'index'"
        to="/about"
        class="header-Profile"
        tag="li"
        title="about me"
      >
        <p>about</p>
      </nuxt-link>
      <li class="header-Space" v-if="this.$route.name === 'index'" @click="toggleTheSpace">
        <div class="icon space" v-html="require('~/assets/images/icon-rocket.svg?include')"></div>
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
import JQuery from "jquery"
let $ = JQuery

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
      viewState: state => state.view.viewState,
      spaceState: state => state.space.spaceState
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
    toggleTheSpace() {
      if (this.spaceState === true) {
        $("#floatBlock").removeClass("active")
      }
      if (window.innerWidth > 1350) {
        this.$store.commit("space/toggleTheSpace")
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        })
        if (this.spaceState === true) {
          $("#messages").addClass("activeTwo")
          setTimeout(function() {
            $("#messages").removeClass("activeTwo")
          }, 2000)
        } else {
          $("#messages").addClass("activeThree")
          setTimeout(function() {
            $("#messages").removeClass("activeThree")
          }, 2000)
        }
      } else {
        $("#messages").addClass("activeFour")
        setTimeout(function() {
          $("#messages").removeClass("activeFour")
        }, 2000)
      }
    },
    toggleTheSpaceOnResize() {
      if (window.innerWidth < 1350 && this.spaceState === true) {
        this.$store.commit("space/turnOffTheSpace")
        $("#messages").addClass("activeThree")
        setTimeout(function() {
          $("#messages").removeClass("activeThree")
        }, 2000)
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
    window.addEventListener("resize", this.toggleTheSpaceOnResize)
  },
  destroyed() {
    window.removeEventListener("resize", this.toggleTheSpaceOnResize)
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
  &-Space
    @media screen and ( max-width: $breakpoint-tablet)
      display: none
    #fireIcon
      opacity: 0
    &:hover
      @media ( hover: hover )
        animation: vibrate .3s infinite
        #fireIcon
          animation: flicker .1s infinite
          opacity: 1
  &-Toggle
    height: 100%
    border-radius: 1000px
    display: inline-flex
    min-height: 24px
    border: 1px solid var(--type)
    background: var(--background-color)
    &_Item
      padding-left: 30px
      padding-right: 30px
      border-radius: 1000px
      color: var(--type)
      &.active
        color: var(--support-type)
        background: var(--support-color)
      p
        line-height: 1
        transform: translateY(3px)
  &-Profile
    &:hover
      @media ( hover: hover )
        transition: color $transition-hover
        color: var(--support-color)
  &-Theme
    position: relative
    background: var(--support-color)
    height: 100%
    min-height: 24px // Prevents collapse when single item in a row
    border: 1px solid var(--type)
    width: 1.495em
    border-radius: 1000px
    overflow: hidden
    transition: transform .11s ease-in
    &:hover
      @media ( hover: hover )
        transform: rotate(180deg)
    &_Half
      position: absolute
      left: 0
      top: 0
      height: 100%
      width: 50%
      transition: background $transition-theme
      background: var(--background-color)
      transform: rotate(-45deg)
      transform-origin: 100% 50%
  &-Normal
    z-index: +2
    color: var(--type)
  &-Pseudo // Prevents mix-blend mode on view toggle and theme toggle
    isolation: isolate
    z-index: +3
    pointer-events: none
    @media screen and ( max-width: 850px)
      display: none
    ul
      position: absolute
      top: 0
      left: 0
      right: 0
    li
      padding: 0 !important
      margin-top: var(--spacing-two)
      margin-bottom: var(--spacing-two)
      margin-left: var(--spacing-one)
      margin-right: var(--spacing-one)
      isolation: isolate
    li:nth-child(1)
      opacity: 0
    li:nth-child(2)
      background: white
      border-radius: 1000px
      &.active
        color: var(--support-type)
        background: var(--support-color)
    li:nth-child(3)
      margin-right: var(--spacing-two)
      background: white
      border-radius: 1000px
      pointer-events: auto
      .header-Theme
        transition: transform .11s ease-in
        &:hover
          @media ( hover: hover )
            transform: rotate(180deg)

.spaced
  .header-Normal
    color: white
    mix-blend-mode: difference

@keyframes vibrate
  0%
    transform: translateX(-1%)
  50%
    transform: translateX(0%)
  100%
    transform: translateX(-1%)
@keyframes flicker
  0%
    opacity: 1
  100%
    opacity: 0.6
@keyframes rotate
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(180deg)
</style>
