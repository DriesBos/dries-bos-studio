<template>
  <li class="close-Navigation" title="close page">
    <nuxt-link to="/">
      <div class="icon close" v-html="require('~/assets/images/icon-close.svg?include')"></div>
    </nuxt-link>
  </li>
</template>

<style lang="sass">
.close
  &-Navigation
    position: fixed
    top: 0
    right: 0
    z-index: +2
    padding: var(--spacing-two)
    &_Blend
      mix-blend-mode: difference
      svg
        color: white
</style>