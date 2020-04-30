<template>
  <section class="footer">
    <div class="footer-Search">
      <!-- <p v-show="this.$route.name === 'index'">What are you looking for? Type it here</p> -->
    </div>
    <div
      class="cursorInteract icon-ArrowUp"
      v-scroll-to="{
     el: '#top',
     duration: 500,
     easing: 'ease-out'
 }"
    >
      <div v-html="require('~/assets/images/icon-arrow-long-up.svg?include')"></div>
    </div>
  </section>
</template>