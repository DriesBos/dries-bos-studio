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
    z-index: +7 // 1 higher than header for mouse interaction
    padding: var(--spacing-sides)
    padding-top: var(--spacing-top)
    transform: translateY(.15rem)

.close-Navigation_Blend
  mix-blend-mode: difference
  svg
    color: white
  &:hover
    @media ( hover: hover )
      mix-blend-mode: initial
      svg
        color: var(--support-color)

// main.spaced
//   .close-Navigation_Normal
//     border: 1px solid red
//     svg
//       color: var(--type)
</style>