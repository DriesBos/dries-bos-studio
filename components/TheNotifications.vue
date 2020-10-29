<template>
  <div id="messages" class="messages">
    <!-- Detect user theme -->
    <div class="messages-Item">
      <p>darkmode available</p>
    </div>
    <!-- Spacemode activated -->
    <div class="messages-Item">
      <p>spacemode on</p>
    </div>
    <!-- Spacemode deactivated -->
    <div class="messages-Item">
      <p>spacemode off</p>
    </div>
    <!-- Spacemode toggle when under 1000px wide -->
    <div class="messages-Item">
      <p>larger window needed</p>
    </div>
  </div>
</template>

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
    background: var(--selection-background)
    border-radius: 1000px
    padding: .25rem var(--spacing-icons)
    opacity: 0
    transform: translateY(50%)
    transition: opacity $transition-messages, transform $transition-messages
    z-index: +10
    p, h1
      color: var(--selection-color)
      line-height: 1.5
      transform: translateY(-1px)
  &.activeOne
    .messages-Item:nth-child(1)
      opacity: 1
      transform: translateY(0)
  &.activeTwo
    .messages-Item:nth-child(2)
      opacity: 1
      transform: translateY(0)
  &.activeThree
    .messages-Item:nth-child(3)
      opacity: 1
      transform: translateY(0)
  &.activeFour
    .messages-Item:nth-child(4)
      opacity: 1
      transform: translateY(0)
</style>
