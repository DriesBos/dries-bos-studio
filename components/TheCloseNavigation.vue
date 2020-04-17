<template>
  <li class="close-Navigation hovered" title="close page">
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
    z-index: +5 // 1 higher than header for mouse interaction
    padding: var(--spacing-two)

.close-Navigation_Blend
  mix-blend-mode: difference
  svg
    color: white
  &:hover
    @media ( hover: none )
      mix-blend-mode: initial
      svg
        color: var(--support-color)
</style>