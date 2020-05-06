<template>
  <section id="floatBlock" class="contentListItem-Header spaced-TopSide">
    <div class="spaceForm" v-html="require('~/assets/images/spaceform.svg?include')" />
    <ul class="contentListItem">
      <li class="contentListItem-Column contentListItem-One">
        <nuxt-link class="cursorInteract" to="/">
          <span
            v-show="this.$route.name === 'index'"
            class="contentListItem-Header_TheTitle"
            :class="{ active: showTitle }"
            title="that's me!"
          >Dries</span>
          <span v-show="this.$route.name === 'about-new'" class="contentListItem-Header_About">Dries</span>
        </nuxt-link>
      </li>
      <li class="contentListItem-Column contentListItem-Two">
        <span
          v-show="this.$route.name === 'projects-slug'"
          class="contentListItem-Header_TheTitleSingle"
          title="me and ..."
        >
          Dries and
          <span class="capitalize">{{ slug }}</span>
        </span>
        <span v-show="this.$route.name === 'about-new'" title="about">About</span>
      </li>
      <li class="contentListItem-Column contentListItem-Three"></li>
      <li class="contentListItem-Column contentListItem-Four">
        <ul class="contentListItem-Icons">
          <li
            v-show="this.$route.name === 'index'"
            class="contentListItem-Icon contentListItem-Theme"
            @click="toggleTheme"
            title="change theme"
          >
            <div class="cursorInteract icon icon-Theme" :class="{ active: themeActive }">
              <div v-html="require('~/assets/images/icon-theme.svg?include')"></div>
            </div>
          </li>
          <li
            v-show="this.$route.name === 'index'"
            class="contentListItem-Icon contentListItem-Space"
            @click="toggleTheSpace"
          >
            <div class="cursorInteract icon icon-Space">
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
            v-show="this.$route.name === 'index'"
            class="contentListItem-Icon contentListItem-About"
          >
            <nuxt-link
              to="/about-new"
              class="cursorInteract icon icon-About"
              title="about"
              tag="div"
            >
              <div v-html="require('~/assets/images/icon-about.svg?include')"></div>
            </nuxt-link>
          </li>
          <li
            v-show="this.$route.name !== 'index'"
            class="contentListItem-Icon contentListItem-Close"
          >
            <nuxt-link to="/" class="cursorInteract icon icon-Close" title="close" tag="div">
              <div v-html="require('~/assets/images/icon-close.svg?include')"></div>
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from "vuex"
import JQuery from "jquery"
let $ = JQuery

export default {
  data() {
    return {
      slug: null,
      showTitle: false,
      themeActive: false
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
    changeCursor() {
      let $cursor = $(".cursor")
      $cursor.addClass("active")
    },
    removeChangeCursor() {
      let $cursor = $(".cursor")
      $cursor.removeClass("active")
    },
    toggleTheme() {
      this.$emit("toggleTheme")
      this.themeActive = !this.themeActive
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
    },
    showTitleOnScroll(event) {
      if (this.$route.name === "index") {
        var elLogo = document.querySelector(".contentListItem-Header")
        var elFilt = document.querySelector(".contentListItem-Filter")
        var elLogoPos = elLogo.getBoundingClientRect()
        var elFiltPos = elFilt.getBoundingClientRect()
        if (elFiltPos.top <= elLogoPos.height + 1) {
          this.showTitle = true
        } else {
          this.showTitle = false
        }
      }
    }
  },
  mounted() {
    this.processedSlug()
    $(".cursorInteract").on("mouseover", this.changeCursor)
    $(".cursorInteract").on("mouseleave", this.removeChangeCursor)
    window.addEventListener("resize", this.toggleTheSpaceOnResize)
    window.addEventListener("scroll", this.showTitleOnScroll)
  },
  destroyed() {
    $(".cursorInteract").off("mouseover", this.changeCursor)
    $(".cursorInteract").off("mouseleave", this.removeChangeCursor)
    window.removeEventListener("resize", this.toggleTheSpaceOnResize)
    window.removeEventListener("scroll", this.showTitleOnScroll)
  }
}
</script>

<style lang="sass">
// @import '~/assets/styling/variables.sass'
// .header
//   position: fixed
//   top: 0
//   left: 0
//   right: 0
//   z-index: 999

//   ul
//     li
//       @media screen and ( max-width: $breakpoint-mobile)
//         padding-left: .75rem
//         padding-right: .75rem
//     li:first-child
//       padding-left: var(--spacing-sides)
//     li:last-child
//       padding-right: var(--spacing-sides)
//   &-Logo
//     flex-grow: 1
//     flex-shrink: 0
//     pointer-events: none
//     span
//       pointer-events: auto
//   &-Toggle
//     position: relative
//     height: 1.5rem // Prevents collapse when single item in a row
//     border-radius: 1000px
//     display: inline-flex
//     border: 1px solid var(--type)
//     box-sizing: border-box
//     background: var(--background-color)
//     overflow: hidden
//     &_Item
//       padding-left: var(--spacing-icons)
//       padding-right: var(--spacing-icons)
//       p
//         line-height: 1
//         transform: translateY(0.175rem)
//         color: var(--type)
//         transition: all .23s ease
//       &.active
//         color: var(--support-type)
//         p
//           color: var(--support-type)
//     &_Toggler
//       position: absolute
//       right: 0
//       top: 0
//       bottom: 0
//       width: 50%
//       background: var(--support-color)
//       border-radius: 1000px
//       transform: translateX(0)
//       transition: all .23s ease-out
//       &.active
//         transform: translateX(-101%)
//   &-Theme
//     position: relative
//     background: var(--support-color)
//     width: 1.5rem
//     height: 1.5rem // Prevents collapse when single item in a row
//     border: 1px solid var(--type)
//     border-radius: 1000px
//     overflow: hidden
//     transition: transform .11s ease-in
//     pointer-events: auto
//     transform: rotate(0)
//     transform-origin: center
//     &:hover
//       @media ( hover: hover )
//         transform: rotate(-180deg)
//     &_Half
//       position: absolute
//       left: 0
//       top: 0
//       height: 100%
//       width: 50%
//       transition: background $transition-theme
//       background: var(--background-color)
//       transform: rotate(90deg)
//       transform-origin: 100% 50%
//   &-Profile
//     pointer-events: auto
//     &:hover
//       @media ( hover: hover )
//         transition: color $transition-hover
//         color: var(--support-color)
//   &-Normal
//     z-index: +5
//     color: var(--type)
//   &-Pseudo // Prevents mix-blend mode on view toggle and theme toggle
//     isolation: isolate
//     z-index: +6
//     pointer-events: none
//     li:nth-child(1), li:nth-child(4), li:nth-child(5)
//       opacity: 0
//       pointer-events: none
//     @media screen and ( max-width: 850px)
//       display: none
//       position: absolute
//       top: 0
//       left: 0
//       right: 0
// .spaced
//   .header-Normal
//     color: white
//     mix-blend-mode: difference
//     a, p, h1, input, svg,
//       color: white
//     li:nth-child(2)
//       opacity: 0
//     li:nth-child(3)
//       opacity: 0
//   .header-Pseudo
//     li:nth-child(2)
//       opacity: 1
//     li:nth-child(3)
//       opacity: 1
//     .header-Toggle, .header-Theme
//       border: 1px solid var(--type)

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
