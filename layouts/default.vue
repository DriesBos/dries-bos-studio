<template>
  <main :class="[currentTheme, currentView]">
    <div class="background background-Two"></div>
    <div class="background background-Three"></div>
    <div class="background background-Four"></div>
    <the-header @toggleTheme="changeTheme" @toggleView="changeView" />
    <transition name="page" mode="out-in">
      <nuxt :view="currentView" />
    </transition>
  </main>
</template>

<script>
import TheHeader from "~/components/TheHeader.vue"
export default {
  components: {
    "the-header": TheHeader
  },
  data() {
    return {
      themeNumber: 0,
      currentTheme: "one",
      currentView: false
    }
  },
  computed: {
    myProps() {
      if (this.$route.name === "index") {
        return { view: this.currentView }
      }
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
    },
    changeView() {
      this.currentView = !this.currentView
    }
  }
}
</script>
