<template>
  <button class="btn cursorInteract" :type="type">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    type: {
      type: String,
      default: "link"
    }
  }
}
</script>

<style lang="sass">
.btn
  color: var(--color)
  border: 1px solid var(--color)
  border-radius: 1000px
  background: var(--background)
  cursor: pointer
  box-shadow: 0
  // transition: box-shadow $transition-hover, background $transition-hover
  // transform: translateY(10px)
  a, p
    padding: .5rem 1rem
    font-size: 38px
    font-weight: 300
    text-transform: uppercase
    line-height: 1
  // &:first-child
  //   margin-bottom: 0.5rem
  // &:hover
  //   @media ( hover: hover )
  //     animation: excited 0.165s ease infinite
  //     box-shadow: 0px 0px 10rem 2.25rem rgba(#B6FFF5, 0.33)
  //     z-index: +2
  // &.active
    // background: var(--color)
    // box-shadow: 0px 0px 10rem 2.25rem rgba(#B6FFF5, 0.66)
    // z-index: +1
    // a, p
    //   color: black !important
</style>
