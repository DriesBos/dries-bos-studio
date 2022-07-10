<template>
  <div
    class="switchToggle"
    :class="{ active: isActive }"
    @click="clickSwitchToggle"
  >
    <div class="switchToggle-Dot"></div>
  </div>
</template>

<script>
export default {
  name: "SwitchToggle",
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    clickSwitchToggle() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="sass">
.switchToggle
  position: relative
  height: var(--spacing-icons)
  width: var(--spacing-icons-double)
  background: #313131
  border-radius: 100px
  &-Dot
    position: absolute
    left: 2px
    top: 2px
    bottom: 0
    height: calc(100% - 4px)
    width: calc(50% - 4px)
    background: white
    border-radius: 1000px
    transition: transform .125s ease-in-out
  &.active
    .switchToggle-Dot
      transform: translateX(#{var(--spacing-icons)})
</style>
