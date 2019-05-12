<template>
  <div>
    <TheHeader/>
    <transition name="pageFade" mode="out-in">
      <nuxt/>
    </transition>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'

export default {
  components: {
    TheHeader: TheHeader
  }
}
</script>
