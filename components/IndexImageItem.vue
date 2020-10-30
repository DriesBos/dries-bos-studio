<template>
  <nuxt-link
    :id="post.id"
    :key="post.id"
    :to="`/projects/${post.id}`"
    class="gridItem gridItem_Project imageGrid-Item"
    tag="section"
  >
    <div v-lazy-container="{ selector: 'img' }" class="imageGrid-Item_Wrapper">
      <img
        :v-lazy="post.cover_image"
        :data-srcset="
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
        :alt="post.title"
        class="lazy"
      />
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    post: Object
  },
  methods: {
    transformImage(image, option) {
      if (!image) return ""
      if (!option) return ""
      let imageService = "//img2.storyblok.com/"
      let pathOne = image.replace("https://a.storyblok.com", "")
      let pathTwo = pathOne.replace("//a.storyblok.com", "")
      return imageService + option + pathTwo
    }
  }
}
</script>
