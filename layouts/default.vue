<template>
  <div>
    <!-- <TheStars /> -->
    <transition name="page" mode="out-in">
      <nuxt />
    </transition>
  </div>
</template>

<script>
// import TheStars from '~/components/TheStars.vue'

export default {
  components: {
    // TheStars: TheStars
  }
}
</script>
