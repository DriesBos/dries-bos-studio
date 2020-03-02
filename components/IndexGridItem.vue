<template>
  <nuxt-link
    :to="`/projects/${post.id}`"
    :key="post.id"
    :id="post.id"
    class="gridItem gridItem_Project"
    tag="li"
  >
    <p>{{ post.title }}</p>
    <!-- <img :src="post.cover_image" /> -->
    <img
      :srcset="`${transformImage(post.cover_image, '1668x0')} 1668w, ${transformImage(post.cover_image, '1440x0')} 1440w, ${transformImage(post.cover_image, '1280x0')} 1280w, ${transformImage(post.cover_image, '960x0')} 960w, ${transformImage(post.cover_image, '800x0')} 800w, ${transformImage(post.cover_image, '690x0')} 690w`"
      sizes="100vw"
      :data-src="post.cover_image"
      alt="Project image"
    />
  </nuxt-link>
</template>

<script>
export default {
  name: "IndexGridItem",
  props: {
    post: Object
  },
  mounted() {
    console.log(this.post)
  },
  methods: {
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
