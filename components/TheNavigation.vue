<template>
  <section id="floatBlock" class="contentListItem-Header spaced-TopSide">
    <div
      class="spaceForm"
      v-html="require('~/assets/images/spaceform.svg?include')"
    />
    <ul class="contentListItem">
      <!-- TITLE -->
      <li class="contentListItem-Column title">
        <nuxt-link class="cursorInteract" to="/">
          <span v-show="this.$route.name === 'index'" title="that's me!"
            >Dries Bos</span
          >
          <span
            class="title"
            v-show="this.$route.name === 'index'"
            title="that's me!"
            >&nbsp;— Creative Web Developer</span
          >
          <span v-show="this.$route.name !== 'index'">&nbsp;</span>
        </nuxt-link>
      </li>
      <!-- ICONS -->
      <!-- THEME SLIDER -->
      <li class="contentListItem-Column icons">
        <ul class="contentListItem-Icons">
          <!-- <li v-show="this.$route.name === 'index'" title="theme colors">
            <input
              class="cursorInteract rangeSlider"
              type="range"
              min="0"
              max="100"
              value="100"
              step="1"
              v-model="rangeValue"
            />
          </li> -->
          <!-- INDEX -->
          <li
            v-show="this.$route.name === 'index'"
            class="contentListItem-Icon contentListItem-View"
            @click="toggleTheView"
          >
            <div
              v-if="viewState"
              class="cursorInteract icon icon-View"
              title="image view"
            >
              <div
                v-html="require('~/assets/images/icon-img.svg?include')"
              ></div>
            </div>
            <div v-else class="cursorInteract icon icon-View" title="text view">
              <div
                v-html="require('~/assets/images/icon-txt.svg?include')"
              ></div>
            </div>
          </li>
          <!-- SPACE -->
          <li
            v-show="this.$route.name === 'index'"
            class="contentListItem-Icon contentListItem-Space"
            title="space view"
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
          <!-- ABOUT -->
          <li
            v-show="this.$route.name === 'index'"
            class="contentListItem-Icon contentListItem-About"
            title="about page"
          >
            <nuxt-link
              to="/about"
              class="cursorInteract icon icon-About"
              title="about"
              tag="div"
            >
              <div
                v-html="require('~/assets/images/icon-about.svg?include')"
              ></div>
            </nuxt-link>
          </li>
          <!-- MAIL -->
          <li
            v-show="this.$route.name === 'about'"
            class="contentListItem-Icon contentListItem-View mobileContent"
            title="mail me!"
          >
            <a
              href="mailto:info@driesbos.com"
              class="cursorInteract icon icon-Mail"
            >
              <div v-html="require('~/assets/images/icon-mail.svg?include')" />
            </a>
          </li>
          <!-- PHONE -->
          <li
            v-show="this.$route.name === 'about'"
            class="contentListItem-Icon contentListItem-View mobileContent"
            title="call me!"
          >
            <a href="tel:0031636101262" class="cursorInteract icon icon-Phone">
              <div v-html="require('~/assets/images/icon-phone.svg?include')" />
            </a>
          </li>
          <!-- PREV -->
          <!-- <li
            v-if="this.$route.name === 'projects-slug'"
            class="contentListItem-Icon contentListItem-View"
            title="previous project"
          >
            <div class="cursorInteract icon icon-Arrow icon-Arrow_Prev">
              <div v-html="require('~/assets/images/icon-arrow-long.svg?include')"></div>
            </div>
          </li>-->
          <!-- NEXT -->
          <!-- <li
            v-if="this.$route.name === 'projects-slug'"
            class="contentListItem-Icon contentListItem-View"
            title="next project"
          >
            <div class="cursorInteract icon icon-Arrow icon-Arrow_Next">
              <div v-html="require('~/assets/images/icon-arrow-long.svg?include')"></div>
            </div>
          </li>-->
          <!-- CLOSE -->
          <li
            v-show="this.$route.name !== 'index'"
            class="contentListItem-Icon contentListItem-Close"
            title="close page"
          >
            <nuxt-link
              to="/"
              class="cursorInteract icon icon-Close"
              title="close"
              tag="div"
            >
              <div
                v-html="require('~/assets/images/icon-close.svg?include')"
              ></div>
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
      slug: null,
      rangeValue: "100"
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
  mounted() {
    this.processedSlug()
    window.addEventListener("resize", this.toggleTheSpaceOnResize)
  },
  updated() {
    // this.setBackgroundColor(this.rangeValue)
  },
  destroyed() {
    window.removeEventListener("resize", this.toggleTheSpaceOnResize)
  },
  methods: {
    setBackgroundColor(color) {
      var root = document.body
      root.style.setProperty("--background-color", `hsl(0,0%,${color}%)`)
      if (color > 30) {
        root.style.setProperty("--type-color", "black")
        root.style.setProperty("--active-color", "white")
      } else {
        root.style.setProperty("--type-color", "white")
        root.style.setProperty("--active-color", "black")
      }
      if (color > 50) {
        root.style.setProperty("--space-color", "black")
      } else {
        root.style.setProperty("--space-color", "white")
      }
    },
    processedSlug() {
      if (this.$route.name === "projects-slug" && this.$route.params.slug) {
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
          document.querySelector("body").classList.remove("spaced")
          document.querySelector("html").classList.remove("spaced")
          document.querySelector("#floatBlock").classList.remove("low")
          document.querySelector("#messages").classList.add("activeThree")
          document.querySelector("#messages").classList.remove("activeOne")
          document.querySelector("#messages").classList.remove("activeTwo")
          document.querySelector("#messages").classList.remove("activeFour")
          setTimeout(function() {
            document.querySelector("#messages").classList.remove("activeThree")
          }, 2500)
        } else {
          // Spacemode activation
          this.$store.commit("space/turnOnTheSpace")
          document.querySelector("body").classList.add("spaced")
          document.querySelector("html").classList.add("spaced")
          document.querySelector("#messages").classList.add("activeTwo")
          document.querySelector("#messages").classList.remove("activeOne")
          document.querySelector("#messages").classList.remove("activeThree")
          document.querySelector("#messages").classList.remove("activeFour")
          setTimeout(function() {
            document.querySelector("#messages").classList.remove("activeTwo")
          }, 2500)
        }
      } else {
        // Message: "spacemode requires a larger window"
        document.querySelector("#messages").classList.add("activeFour")
        document.querySelector("#messages").classList.remove("activeOne")
        document.querySelector("#messages").classList.remove("activeTwo")
        document.querySelector("#messages").classList.remove("activeThree")
        setTimeout(function() {
          document.querySelector("#messages").classList.remove("activeFour")
        }, 2500)
      }
    },
    toggleTheSpaceOnResize() {
      // Disable spacemode
      if (window.innerWidth < 1000 && this.spaceState === true) {
        this.$store.commit("space/turnOffTheSpace")
        document.querySelector("body").classList.remove("spaced")
        document.querySelector("#floatBlock").classList.remove("low")
        document.querySelector("#messages").classList.add("activeThree")
        document.querySelector("#messages").classList.remove("activeOne")
        document.querySelector("#messages").classList.remove("activeTwo")
        document.querySelector("#messages").classList.remove("activeFour")
        setTimeout(function() {
          document.querySelector("#messages").classList.remove("activeThree")
        }, 2500)
      }
    },
    toggleTheView() {
      this.$store.commit("view/toggleTheView")
      setTimeout(function() {
        window.scrollTo(0, 0)
      }, 330)
    }
  }
}
</script>

<style lang="sass">
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
