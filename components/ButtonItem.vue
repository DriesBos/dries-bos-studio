<template>
  <div class="btn cursorInteract" :class="{ animated: animated }" :type="type">
    <div
      v-if="icon === 'arrowleft'"
      class="icon icon-Arrow_Left"
      v-html="require('~/assets/images/icon-arrow.svg?include')"
    ></div>
    <div
      v-if="icon === 'arrowup'"
      class="icon icon-Arrow_Up"
      v-html="require('~/assets/images/icon-arrow.svg?include')"
    ></div>
    <div
      v-if="icon === 'arrowright'"
      class="icon icon-Arrow_Right"
      v-html="require('~/assets/images/icon-arrow.svg?include')"
    ></div>
    <div
      v-if="icon === 'arrowdown'"
      class="icon icon-Arrow_Down"
      v-html="require('~/assets/images/icon-arrow.svg?include')"
    ></div>
    <div
      v-if="icon === 'mail'"
      class="icon icon-Mail"
      v-html="require('~/assets/images/icon-mail.svg?include')"
    ></div>
    <slot />
  </div>
</template>

<script>
export default {
  name: "ButtonItem",
  props: {
    type: {
      type: String,
      default: "link"
    },
    icon: String,
    animated: Boolean
  }
}
</script>

<style lang="sass">
.btn
  display: flex
  flex-wrap: nowrap
  align-items: center
  padding: 2px .45em
  color: var(--color)
  border: 1px solid var(--color)
  border-radius: 1000px
  background: var(--block-color)
  font-size: 38px
  font-weight: 300
  text-transform: uppercase
  line-height: 1
  letter-spacing: -0.025em
  & .icon
    margin-right: 8px
  // transition: box-shadow $transition-hover, background $transition-hover
  // transform: translateY(10px)
  a, p
    font-size: 38px
    font-weight: 300
    text-transform: uppercase
    line-height: 1
    letter-spacing: -0.05em
  &.animated
    animation-name: bounce
    animation-duration: 3s
    animation-timing-function: ease
    animation-delay: 1s
    animation-direction: alternate
    animation-iteration-count: infinite
    animation-fill-mode: none
    animation-play-state: running

@keyframes bounce
  0%
    transform: translateY(0)
  25%
    transform: translateY(0)
  50%
    transform: translateY(0)
  90%
    transform: translateY(0)
  100%
    transform: translateY(13px)


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
