<template>
  <main :class="currentTheme">
    <the-header @toggleTheme="changeTheme" />
    <transition name="fade" mode="out-in">
      <div class="transitionWrapper">
        <nuxt />
      </div>
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
    }
  }
}
</script>
