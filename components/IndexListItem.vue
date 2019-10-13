<template>
  <li :data-active="[isActive]" :id="post.id">
    <div @click="toggle" v-scroll-to="`#${post.id}`" class="list-Outer">
      <div class="icons-Row">
        <transition name="fade" mode="out-in">
          <div v-if="isActive" class="icon-Container" title="close project">
            <img src="~assets/images/close.png" class="icon" />
          </div>
          <div v-else class="icon-Container" title="open page">
            <img src="~assets/images/eye.png" class="icon" />
          </div>
        </transition>
      </div>

      <p class="list-Title">{{ post.title }}</p>
      <p class="list-Category">{{ post.category }}</p>
      <p class="list-Year">{{ post.year }}</p>
    </div>
    <div v-show="isActive" class="list-Inner">
      <div class="list-Inner_Content">
        <p class="list-Content">{{ post.content }}</p>
      </div>
      <SliderItem
        :images="[post.thumbnail, post.image_0, post.image_1, post.image_2, post.image_3, post.image_4, post.image_5, post.image_6, post.image_7, post.image_8, post.image_9]"
      />
    </div>
  </li>
</template>

<script>
import SliderItem from '~/components/SliderItem.vue'
export default {
  name: 'IndexListItem',
  components: {
    SliderItem: SliderItem
  },
  props: {
    post: Object
  },
  data: function() {
    return {
      isActive: false
    }
  },
  methods: {
    toggle: function() {
      this.isActive = !this.isActive
    }
  }
}
</script>
