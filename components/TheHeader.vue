<template>
  <header>
    <nav>
      <ul>
        <nuxt-link to="/" tag="li">
          <a>Home</a>
        </nuxt-link>
        <nuxt-link to="/blog" tag="li">
          <a>Blog</a>
        </nuxt-link>
        <nuxt-link to="/about" tag="li">
          <a>About</a>
        </nuxt-link>
      </ul>
    </nav>
  </header>
</template>

<style lang="sass" scoped>
@import '~/assets/styling/variables.sass'

header
  position: relative
  width: 100%
  background: lightgrey
  ul
    display: flex
    justify-content: flex-start
    li
      padding: $spacing
      a
        color: black
        text-decoration: none
    li.nuxt-link-exact-active
      a
        text-decoration: underline
</style>
