<template>
  <main :class="{ active: currentTheme }">
    <div class="background-One"></div>
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
      currentTheme: false
    }
  },
  methods: {
    changeTheme() {
      this.currentTheme = !this.currentTheme
    }
  }
}
</script>
