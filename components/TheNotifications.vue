<template>
  <div id="messages" class="messages">
    <div class="messages-Item cursorInteract" @click="toggleTheme">
      <p class="underline">darkmode ?</p>
    </div>
    <div class="messages-Item">
      <p>spacemode on</p>
    </div>
    <!-- Message on resize -->
    <div class="messages-Item">
      <p>spacemode off</p>
    </div>
    <!-- Message on toggle -->
    <div class="messages-Item">
      <p>larger window needed</p>
    </div>
    <div class="messages-Item">
      <p>darkmode on</p>
    </div>
    <div class="messages-Item">
      <p>darkmode off</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      this.$emit("toggleTheme")
    }
  }
}
</script>

<style lang="sass">
$transition-messages: .165s ease-out

.messages
  position: fixed
  right: 0
  bottom: 0
  z-index: 999
  pointer-events: none
  width: 100%
  &-Item
    position: absolute
    bottom: var(--spacing-icons)
    right: var(--spacing-icons)
    display: block
    background: var(--type-color)
    border-radius: 1000px
    padding: .22rem var(--spacing-icons)
    opacity: 0
    transform: translateY(50%)
    transition: opacity $transition-messages, transform $transition-messages
    z-index: +10
    display: none
    p, h1
      color: #F2F2F2
      line-height: 1.5
    p.underline
      text-decoration: underline
  &.activeOne
    .messages-Item:nth-child(1)
      opacity: 1
      transform: translateY(0)
      pointer-events: auto
      display: block
  &.activeTwo
    .messages-Item:nth-child(2)
      opacity: 1
      transform: translateY(0)
      display: block
  &.activeThree
    .messages-Item:nth-child(3)
      opacity: 1
      transform: translateY(0)
      display: block
  &.activeFour
    .messages-Item:nth-child(4)
      opacity: 1
      transform: translateY(0)
      display: block
  &.activeFive
    .messages-Item:nth-child(5)
      opacity: 1
      transform: translateY(0)
      display: block
  &.activeSix
    .messages-Item:nth-child(6)
      opacity: 1
      transform: translateY(0)
      display: block
</style>