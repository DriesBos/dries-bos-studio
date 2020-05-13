<template>
  <section class="footer">
    <div class="footer-Message">
      <a
        href="mailto:info@driesbos.com"
        class="cursorInteract"
        v-show="this.$route.name === 'index'"
      >Start your own project?</a>
      <a
        href="mailto:info@driesbos.com"
        class="cursorInteract"
        v-show="this.$route.name === 'about'"
      >More info?</a>
      <a
        href="mailto:info@driesbos.com"
        class="cursorInteract"
        v-show="this.$route.name === 'projects-slug' && this.$route.params.slug"
      >Start your own project?</a>
    </div>
    <div
      class="footer-Icon cursorInteract icon-ArrowUp"
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