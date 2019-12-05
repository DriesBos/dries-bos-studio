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
        <div v-if="isOpen" class="icon-Container" title="close project">
          <svg width="25" height="25" class="icon">
            <path
              d="M13.5373645,0.0666483999 L13.5366484,11.5366484 L25.0666484,11.5373645 L25.0666484,13.5373645 L13.5366484,13.5366484 L13.5373645,25.0666484 L11.5373645,25.0666484 L11.5366484,13.5366484 L0.0666483999,13.5373645 L0.0666483999,11.5373645 L11.5366484,11.5366484 L11.5373645,0.0666483999 L13.5373645,0.0666483999 Z"
              fill
              transform="translate(12.566648, 12.566648) rotate(45.000000) translate(-12.566648, -12.566648)"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        <div v-else class="icon-Container" title="view project">
          <svg width="25" height="25" class="icon">
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
