<template>
  <main :class="[currentTheme, { spaced: spaceState }]">
    <div class="background"></div>
    <div id="messages" class="messages">
      <div class="messages-Item">
        <p>darkmode detected</p>
      </div>
      <div class="messages-Item">
        <p>spacemode activated</p>
      </div>
      <div class="messages-Item">
        <p>spacemode deactivated</p>
      </div>
      <div class="messages-Item">
        <p>spacemode requires wider window</p>
      </div>
    </div>
    <transition>
      <div class="spaceWrapper">
        <div class="spaceForm"></div>
        <nuxt />
      </div>
    </transition>
    <the-navigation @toggleTheme="changeTheme" />
    <the-pseudo-navigation />
  </main>
</template>

<script>
import { mapState } from "vuex"
import TheNavigation from "~/components/TheNavigation.vue"
import ThePseudoNavigation from "~/components/ThePseudoNavigation.vue"
import JQuery from "jquery"
let $ = JQuery

export default {
  components: {
    "the-navigation": TheNavigation,
    "the-pseudo-navigation": ThePseudoNavigation
  },
  // transition: {
  //   mode: "out-in",
  //   css: false,
  //   afterEnter(el) {
  //     console.log("afterEnter", el)
  //   },
  //   afterLeave(el) {
  //     console.log("afterLeave", el)
  //   }
  // },
  // transition(to, from) {
  //   if (!from) {
  //     console.log("LEFT")
  //     return "left"
  //   }
  //   console.log("RIGHT")
  //   return +to.query.page < +from.query.page ? "right" : "left"
  // },
  data() {
    return {
      themeNumber: 0,
      currentTheme: "one"
    }
  },
  computed: {
    ...mapState({
      spaceState: state => state.space.spaceState
    })
  },
  methods: {
    changeTheme() {
      if (this.themeNumber < 3) {
        this.themeNumber++
      } else {
        this.themeNumber = 0
      }
      if (this.themeNumber === 1) {
        this.currentTheme = "two"
      } else if (this.themeNumber === 2) {
        this.currentTheme = "three"
      } else if (this.themeNumber === 3) {
        this.currentTheme = "four"
      } else {
        this.currentTheme = "One"
      }
    },
    checkDarkMode() {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        this.themeNumber = 2
        this.currentTheme = "three"
        $("#messages").addClass("activeOne")
        setTimeout(function() {
          $("#messages").removeClass("activeOne")
        }, 2000)
      }
    },
    // BROWSER APIS
    windowIsVisible() {
      if (document.visibilityState === "hidden") {
        document.title = "👀 You there?"
      } else {
        document.title = "🧑‍🚀 Dries Bos — Web & Interaction Developer"
        let scrollPosition = document.documentElement.scrollTop
      }
    }
  },
  mounted() {
    this.checkDarkMode()
    document.addEventListener("visibilitychange", this.windowIsVisible)
  },
  destroyed() {
    document.removeEventListener("visibilitychange", this.windowIsVisible)
  }
}
</script>
