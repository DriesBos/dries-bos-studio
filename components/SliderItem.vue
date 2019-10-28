<template>
  <div class="slider-Container">
    <transition-group name="slider">
      <div
        class="image-Slider"
        v-for="number in [index]"
        :id="`${postid}${postid}`"
        :key="number"
        v-lazy-container="{ selector: '.image' }"
      >
        <img :data-src="currentImage" @click="next" class="image" />
        <div v-if="imageCount > 1" @click="previous" class="image-Slider_Nav image-Slider_Prev"></div>
        <div v-if="imageCount > 1" @click="next" class="image-Slider_Nav image-Slider_Next"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'SliderItem',
  props: {
    images: Array,
    postid: String
  },
  data: function() {
    return {
      index: 0
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
.slider-Container
  position: relative
.image-Slider
  position: relative
  .image
    width: 100%
    img
      max-width: 100%
.image-Slider_Nav
  position: absolute
  z-index: 999
  width: 50%
  top: 0
  bottom: 0
  cursor: pointer
.image-Slider_Prev
  left: 0
.image-Slider_Next
  right: 0

.slider-enter-active, 
  transition: all .2s ease .2s
.slider-leave-active
  transition: all .2s ease
.slider-enter, .slider-leave-to
  opacity: 0
</style>
