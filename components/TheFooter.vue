<template>
  <footer class="footer">
    <div class="footer-Search">
      <p v-show="this.$route.name === 'index'">What are you looking for? Type it here</p>
    </div>
    <div class="icon-ArrowUp">
      <div v-html="require('~/assets/images/icon-arrow-long-up.svg?include')"></div>
    </div>
  </footer>
</template>