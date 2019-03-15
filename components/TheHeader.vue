<template>
  <header>
    <nav>
      <ul>
        <nuxt-link to="/" tag="li">
          <a>Home</a>
        </nuxt-link>
        <nuxt-link to="/about" tag="li">
          <a>About</a>
        </nuxt-link>
      </ul>
    </nav>
  </header>
</template>

<style lang="sass">
@import '~/assets/styling/variables.sass'

header
  position: relative
  width: 100%
  background: pink
  ul
    display: flex
    justify-content: space-around
    li
      padding: $spacing
      a
        color: black
        text-decoration: none
    li.nuxt-link-exact-active
      a
        text-decoration: underline
</style>
