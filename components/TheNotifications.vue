<template>
  <div id="messages" class="messages">
    <div class="messages-Item">
      <p>darkmode detected</p>
    </div>
    <div class="messages-Item">
      <p>spacemode activated</p>
    </div>
    <div class="messages-Item">
      <p>spacemode deactivated</p>
    </div>
    <div class="messages-Item">
      <p>spacemode requires a larger window</p>
    </div>
  </div>
</template>

<style lang="sass">
$transition-messages: .165s ease-out

.messages
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 999
  pointer-events: none
  &-Item
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -25%)
    border: 1px solid var(--type)
    color: var(--support-type)
    background: var(--support-color)
    border-radius: 1000px
    padding-left: 30px
    padding-right: 30px
    opacity: 0
    text-align: center
    transition: opacity $transition-messages, transform $transition-messages
  &.activeOne
    .messages-Item:nth-child(1)
      opacity: 1
      transform: translate(-50%, -50%)
  &.activeTwo
    .messages-Item:nth-child(2)
      opacity: 1
      transform: translate(-50%, -50%)
  &.activeThree
    .messages-Item:nth-child(3)
      opacity: 1
      transform: translate(-50%, -50%)
  &.activeFour
    .messages-Item:nth-child(4)
      opacity: 1
      transform: translate(-50%, -50%)
</style>