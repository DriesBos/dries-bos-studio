<template>
  <main :class="currentTheme">
    <div class="background background-Two"></div>
    <div class="background background-Three"></div>
    <div class="background background-Four"></div>
    <the-header @clicked="changeTheme" />
    <transition name="page" mode="out-in">
      <nuxt />
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
      // console.log(this.themeNumber, this.currentTheme)
    }
  }
}
</script>
