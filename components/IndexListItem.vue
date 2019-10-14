<template>
  <li :data-active="[isActive]" :id="post.id">
    <div @click="toggle" v-scroll-to="`#${post.id}`" class="list-Outer">
      <transition name="fade" mode="out-in">
        <div v-if="isActive" class="icons-Row">
          <div class="icon-Container" title="close project">
            <img src="~assets/images/close.png" class="icon" />
          </div>
        </div>
        <div v-else class="icons-Row">
          <div class="icon-Container" title="open page">
            <img src="~assets/images/eye.png" class="icon" />
          </div>
        </div>
      </transition>

      <p class="list-Year">{{ post.year }}</p>
      <p class="list-Title">{{ post.title }}</p>
      <p class="list-Category">{{ post.category }}</p>
    </div>
    <div v-show="isActive" class="list-Inner">
      <div class="list-Inner_Content">
        <p class="list-Year"></p>
        <p class="list-Content">{{ post.content }}</p>
      </div>
      <SliderItem
        :postid="post.id"
        :images="[post.image_0, post.image_1, post.image_2, post.image_3, post.image_4, post.image_5, post.image_6, post.image_7, post.image_8, post.image_9]"
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
