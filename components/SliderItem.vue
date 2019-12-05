<template>
  <div class="slider-Container">
    <div class="slider-Inside">
      <transition-group name="slider">
        <div
          class="image-Slider"
          v-for="number in [index]"
          :id="postid"
          :key="number"
          v-lazy-container="{ selector: '.image' }"
          :style="`background:#${bgcolor}`"
        >
          <img :data-src="currentImage" class="image" />
        </div>
      </transition-group>
      <div v-if="imageCount > 1" @click="previous" class="image-Slider_Nav image-Slider_Prev">
        <svg width="25" height="25" viewBox="0 0 25 25" class="icon" title="previous image">
          <path
            d="M13.5101551,-0.0106601718 L13.5094466,21.1873398 L21.0001551,13.6964466 L22.4143687,15.1106602 L12.5148737,25.0101551 L12.5104466,25.0053398 L12.5059415,25.0101551 L2.60644661,15.1106602 L4.02066017,13.6964466 L11.5094466,21.1853398 L11.5101551,-0.0106601718 L13.5101551,-0.0106601718 Z"
            fill
            transform="translate(12.510408, 12.499747) scale(1, -1) rotate(90.000000) translate(-12.510408, -12.499747)"
            fill-rule="evenodd"
          />
        </svg>
      </div>
      <div v-if="imageCount > 1" @click="next" class="image-Slider_Nav image-Slider_Next">
        <svg width="25" height="25" viewBox="0 0 25 25" class="icon" title="next image">
          <path
            d="M13.5101551,-0.0106601718 L13.5094466,21.1873398 L21.0001551,13.6964466 L22.4143687,15.1106602 L12.5148737,25.0101551 L12.5104466,25.0053398 L12.5059415,25.0101551 L2.60644661,15.1106602 L4.02066017,13.6964466 L11.5094466,21.1853398 L11.5101551,-0.0106601718 L13.5101551,-0.0106601718 Z"
            fill
            transform="translate(12.510408, 12.499747) scale(-1, -1) rotate(90.000000) translate(-12.510408, -12.499747)"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SliderItem',
  props: {
    bgcolor: String,
    images: Array,
    postid: String
  },
  data: function() {
    return {
      index: 0,
      style: ''
    }
  },
  computed: {
    style() {
      this.style = 'background-color:red'
    }
  },
  methods: {
    increment: function() {
      if (this.index >= this.images.length - 1) {
        this.index = 0
      } else {
        this.index += 1
      }
    },
    decrement: function() {
      if (this.index > 0) {
        this.index -= 1
      } else {
        this.index = this.images.length - 1
      }
    },
    getCurrentImage: function() {
      return this.images[this.index]
    },
    next: function() {
      this.increment()
      while (!this.getCurrentImage()) {
        this.increment()
      }
    },
    close: function() {
      this.index = -1
    },
    previous: function() {
      this.decrement()
      while (!this.getCurrentImage()) {
        this.decrement()
      }
    }
  },
  computed: {
    currentImage: function() {
      return this.getCurrentImage()
    },
    imageCount: function() {
      return this.images.filter(image => image).length
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/styling/variables.sass'
.slider-Container
  position: relative
  // height: calc(61.5vw - #{var(--spacing-two)})
  height: 0
  overflow: hidden
  padding-top: 62.5%
.slider-Inside
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  &:hover .image-Slider_Nav
    opacity: 1
.image-Slider
  position: relative
  height: 100%
  .image
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
  img
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
.image-Slider_Nav
  position: absolute
  z-index: 999
  width: 25%
  top: 0
  bottom: 0
  cursor: pointer
  transition: opacity $transition-hover
  opacity: 0
  @media screen and ( max-width: $breakpoint-mobile )
    opacity: 1
  .icon
    position: absolute
    top: 50%
    transform: translateY(-50%)
    width: calc(20px + (26 - 20) * ((100vw - 700px) / (1400 - 700)))
    height: calc(20px + (26 - 20) * ((100vw - 700px) / (1400 - 700)))
    opacity: 1
    margin-left: var(--spacing-two)
    margin-right: var(--spacing-two)
.image-Slider_Prev
  left: 0
  .icon
    left: 0
.image-Slider_Next
  right: 0
  .icon
    right: 0

.slider-enter-active, 
  transition: all .37s ease .13s
.slider-leave-active
  transition: all .13s ease-out
.slider-enter, .slider-leave-to
  opacity: 0
  transform: scale(.95)
</style>
