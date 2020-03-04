<template>
  <main :class="currentTheme">
    <the-navigation @toggleTheme="changeTheme" />
    <transition>
      <!-- <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @enter-cancelled="enterCancelled"
      @before-Leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      @leave-cancelled="leaveCancelled"
      :css="false"
      >-->
      <div class="transitionWrapper">
        <nuxt />
      </div>
    </transition>
  </main>
</template>

<script>
import TheNavigation from "~/components/TheNavigation.vue"
export default {
  components: {
    "the-navigation": TheNavigation
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
  transition(to, from) {
    if (!from) {
      console.log("LEFT")
      return "left"
    }
    console.log("RIGHT")
    return +to.query.page < +from.query.page ? "right" : "left"
  },
  data() {
    return {
      themeNumber: 0,
      currentTheme: "one"
    }
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
    }
  }
}
</script>
