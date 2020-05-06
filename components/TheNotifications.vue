<template>
  <div id="messages" class="messages">
    <div class="messages-Item">
      <p>Darkmode detected. Toggle theme in navigation.</p>
    </div>
    <div class="messages-Item">
      <p>spacemode activated</p>
    </div>
    <div class="messages-Item">
      <p>spacemode deactivated</p>
    </div>
    <div class="messages-Item">
      <p>spacemode requires larger window</p>
    </div>
    <div class="messages-Item">
      <p>darkmode</p>
    </div>
    <div class="messages-Item">
      <p>lightmode</p>
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
    background: var(--type-color)
    border-radius: 1000px
    padding: .22rem var(--spacing-icons)
    opacity: 0
    transform: translateY(50%)
    transition: opacity $transition-messages, transform $transition-messages
    z-index: +10
    p, h1
      color: #F2F2F2
      line-height: 1.5
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
  &.activeFive
    .messages-Item:nth-child(5)
      opacity: 1
      transform: translateY(0)
  &.activeSix
    .messages-Item:nth-child(6)
      opacity: 1
      transform: translateY(0)
</style>