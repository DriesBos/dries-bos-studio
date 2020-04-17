<template>
  <nuxt-link
    :to="`/projects/${post.id}`"
    :key="post.id"
    :id="post.id"
    class="gridItem gridItem_Project imageGrid-Item"
    tag="li"
  >
    <div v-lazy-container="{ selector: 'img' }" class="imageGrid-Item_Wrapper">
      <img
        class="hovered"
        :srcset="
          `${transformImage(
            post.cover_image,
            '1668x0'
          )} 1668w, ${transformImage(
            post.cover_image,
            '1440x0'
          )} 1440w, ${transformImage(
            post.cover_image,
            '1280x0'
          )} 1280w, ${transformImage(
            post.cover_image,
            '960x0'
          )} 960w, ${transformImage(
            post.cover_image,
            '800x0'
          )} 800w, ${transformImage(post.cover_image, '690x0')} 690w`
        "
        sizes="100vw"
        :data-src="post.cover_image"
        :alt="post.title"
      />
    </div>
  </nuxt-link>
</template>

<script>
import JQuery from "jquery"
let $ = JQuery

export default {
  name: "IndexGridItem",
  props: {
    post: Object
  },
  mounted() {
    $(".hovered").on("mouseover", this.changeCursor)
    $(".hovered").on("mouseleave", this.removeChangeCursor)
  },
  destroyed() {
    $(".hovered").off("mouseover", this.changeCursor)
    $(".hovered").off("mouseleave", this.removeChangeCursor)
  },
  methods: {
    changeCursor() {
      let $cursor = $(".cursor")
      $cursor.addClass("interact")
    },
    removeChangeCursor() {
      let $cursor = $(".cursor")
      $cursor.removeClass("interact")
    },
    transformImage(image, option) {
      if (!image) return ""
      if (!option) return ""

      let imageService = "//img2.storyblok.com/"
      let path = image.replace("//a.storyblok.com", "")
      return imageService + option + path
    }
  }
}
</script>
