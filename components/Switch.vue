<template>
  <div class="switch" :class="{ active: isActive }" @click="clickSwitch">
    <div class="switch-Toggle"></div>
  </div>
</template>

<script>
export default {
  name: "Switch",
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    clickSwitch() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="sass">
.switch
  position: relative
  height: var(--spacing-icons)
  width: var(--spacing-icons-double)
  background: #313131
  border-radius: 100px
  &-Toggle
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
    .switch-Toggle
      transform: translateX(#{var(--spacing-icons)})
</style>
