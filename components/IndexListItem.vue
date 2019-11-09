<template>
  <li :key="post.id" :id="post.id" class="list-Item list-Item_Project">
    <div class="list-Top">
      <img src="~/assets/images/top-ground.png" />
    </div>
    <div
      @click="isOpen = !isOpen"
      v-scroll-to="{
          el: `#${post.id}`,
          duration: 600
        }"
      :id="post.id"
      class="list-Outer"
      :class="{ active: isOpen }"
    >
      <div v-if="post.year" class="list-Year list-Details ellipsis">
        <p>{{ post.year }}</p>
      </div>
      <div v-if="post.title" class="list-Title list-Details ellipsis">
        <p>{{ post.title }}</p>
      </div>
      <div v-if="post.category" class="list-Category list-Details ellipsis">
        <p>{{ post.category }}</p>
      </div>
      <div class="icons-Row">
        <div v-if="isOpen" class="icon-Container" title="view project">
          <img src="~assets/images/close-light.png" class="icon" />
        </div>
        <div v-else class="icon-Container" title="view project">
          <img src="~assets/images/arrow-right-light.png" class="icon" />
        </div>
      </div>
    </div>
    <div v-show="isOpen" class="list-Inner">
      <div class="list-Inner_Content">
        <div v-if="post.year" class="list-Year list-Details ellipsis">
          <p>{{post.year }}</p>
        </div>
        <div v-if="post.content" class="list-Content list-Details">
          <MarkdownItem :input="post.content" />
        </div>
      </div>
      <SliderItem
        :bgcolor="post.image_background_color"
        :images="[post.image_0, post.image_1, post.image_2, post.image_3, post.image_4, post.image_5]"
        :postid="post.id"
      />
    </div>
  </li>
</template>

<script>
import SliderItem from '~/components/SliderItem.vue'
import MarkdownItem from '~/components/MarkdownItem.vue'
import TweenMax from 'gsap'
import JQuery from 'jquery'
let $ = JQuery

export default {
  name: 'IndexListItem',
  components: {
    SliderItem: SliderItem,
    MarkdownItem: MarkdownItem
  },
  props: {
    post: Object
  },
  data: function() {
    return {
      isOpen: false
    }
  },
  methods: {
    initState() {
      this.isOpen = false
    }
  },
  mounted() {
    window.addEventListener('beforeunload', this.initState)
  }
}
</script>
