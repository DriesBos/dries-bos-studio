<template>
  <header class="header header-Normal">
    <ul>
      <nuxt-link to="/" class="header-Logo" tag="li">
        <span title="that's me!">Dries</span>
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
          this.$route.name === 'projects-slug' || this.$route.name === 'about'
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
      <li v-if="this.$route.name === 'index'" class="header-Space" @click="toggleTheSpace">
        <div class="icon space">
          <svg viewBox="0 0 25 25">
            <g fill="currentColor" fill-rule="evenodd">
              <path
                d="M19,23.75 L14.41625,21.909375 C15.2475,20.0925 15.84125,18.21625 16.209375,16.304375 L19,23.75 M4.58375,21.909375 L0,23.75 L2.790625,16.304375 C3.15875,18.21625 3.7525,20.0925 4.58375,21.909375 M9.5,0 C9.5,0 15.4375,2.375 15.4375,11.875 C15.4375,15.55625 14.546875,18.703125 13.454375,21.173125 C13.0625,22.028125 12.219375,22.5625 11.28125,22.5625 L7.71875,22.5625 C6.780625,22.5625 5.9375,22.028125 5.545625,21.173125 C4.465,18.703125 3.5625,15.55625 3.5625,11.875 C3.5625,2.375 9.5,0 9.5,0 M9.5,11.875 C10.80625,11.875 11.875,10.80625 11.875,9.5 C11.875,8.19375 10.80625,7.125 9.5,7.125 C8.19375,7.125 7.125,8.19375 7.125,9.5 C7.125,10.80625 8.19375,11.875 9.5,11.875 Z"
                transform="translate(15.500000, 9.402796) rotate(45.000000) translate(-15.500000, -9.402796) translate(6.000000, -2.597204)"
                fill-rule="nonzero"
              />
              <path
                id="fireIcon"
                d="M2.40621997,17.0798105 L6.40621997,17.0798105 L7.26618602,24.0056373 C5.96079715,20.8838854 4.99046103,19.3272067 4.35517766,19.3356011 C3.71989429,19.3439955 2.81910657,20.9253986 1.65281451,24.0798105 L2.40621997,17.0798105 Z"
                transform="translate(4.459500, 20.579810) rotate(45.000000) translate(-4.459500, -20.579810)"
              />
            </g>
          </svg>
        </div>
      </li>
      <li
        v-if="this.$route.name === 'index'"
        @click="toggleTheView"
        :class="{ active: viewState }"
        title="toggle text & images"
      >
        <div class="header-Toggle">
          <div class="header-Toggle_Toggler" :class="{ active: viewState }"></div>
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
      if (window.innerWidth > 1000) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        })
        if (this.spaceState === true) {
          // Disable spacemode
          this.$store.commit("space/turnOffTheSpace")
          $("body").removeClass("spaced")
          $("#floatBlock").removeClass("active")
          $("#messages").addClass("activeThree")
          setTimeout(function() {
            $("#messages").removeClass("activeThree")
          }, 2000)
        } else {
          // Spacemode activation
          this.$store.commit("space/turnOnTheSpace")
          $("body").addClass("spaced")
          $("#messages").addClass("activeTwo")
          setTimeout(function() {
            $("#messages").removeClass("activeTwo")
          }, 2000)
        }
      } else {
        // Message: "spacemode requires a larger window"
        $("#messages").addClass("activeFour")
        setTimeout(function() {
          $("#messages").removeClass("activeFour")
        }, 2000)
      }
    },
    toggleTheSpaceOnResize() {
      // Disable spacemode
      if (window.innerWidth < 1000 && this.spaceState === true) {
        this.$store.commit("space/turnOffTheSpace")
        $("body").removeClass("spaced")
        $("#floatBlock").removeClass("active")
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
      if (this.spaceState === false) {
        $("main").addClass("tempBackground")
        setTimeout(function() {
          $("main").removeClass("tempBackground")
        }, 565)
      }
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
    position: relative
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
        // background: var(--support-color)
        p
          color: var(--support-type)
      p
        line-height: 1
        transform: translateY(3px)
    &_Toggler
      position: absolute
      right: 0
      top: 0
      bottom: 0
      width: 50%
      background: var(--support-color)
      border-radius: 1000px
      transform: translateX(0)
      transition: all .23s ease-out
      &.active
        transform: translateX(-100%)
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
    a, p, h1, input, svg
      color: white
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
