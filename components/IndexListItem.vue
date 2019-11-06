<template>
  <li :key="post.id" :id="post.id" class="list-Item">
    <!-- <div class="list-Cursor" :id="post.id" :data-is-open="isOpen">
      <img :src="post.thumbnail" />
    </div>-->
    <div class="list-Top">
      <img src="~/assets/images/top-ground.png" />
    </div>
    <div
      @click="isOpen = !isOpen"
      v-scroll-to="`#${post.id}`"
      :id="post.id"
      class="list-Outer ellipsis"
    >
      <div class="icons-Row">
        <div v-if="isOpen" class="icon-Container" title="view project">
          <img src="~assets/images/close-light.png" class="icon" />
        </div>
        <div v-else class="icon-Container" title="view project">
          <img src="~assets/images/arrow-right-light.png" class="icon" />
        </div>
      </div>
      <div class="list-Year list-Details">
        <p>{{ post.year }}</p>
      </div>
      <div class="list-Title list-Details">
        <p>{{ post.title }}</p>
      </div>
      <div class="list-Category list-Details">
        <p>{{ post.category }}</p>
      </div>
    </div>
    <div v-if="isOpen" class="list-Inner">
      <div class="list-Inner_Content">
        <div class="list-Year list-Details">
          <p>{{post.year }}</p>
        </div>
        <div class="list-Content list-Details">
          <p>{{ post.content }}</p>
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
import TweenMax from 'gsap'
import JQuery from 'jquery'
let $ = JQuery

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
      isOpen: false
    }
  },
  methods: {
    initState() {
      this.isOpen = false
    }
    // customListCursor() {
    //   var $listcursor = $(`.list-Cursor#${this.post.id}`)
    //   function moveCursor(e) {
    //     TweenLite.to($listcursor, 0, {
    //       left: e.pageX,
    //       top: e.offsetY
    //     })
    //   }
    //   function displayImage() {
    //     $listcursor.addClass('image')
    //   }
    //   function removeImage() {
    //     $listcursor.removeClass('image')
    //   }
    //   $(`.list-Outer#${this.post.id}`).on('mouseenter', displayImage)
    //   $(`.list-Outer#${this.post.id}`).on('mouseleave', removeImage)
    //   document
    //     .querySelector(`.list-Item#${this.post.id}`)
    //     .addEventListener('mousemove', moveCursor, false)
    // }
  },
  mounted() {
    window.addEventListener('beforeunload', this.initState)
    // this.customListCursor()
  }
}
</script>
