<template>
  <li
    :key="post.id"
    :id="post.id"
    class="gridItem gridItem_Project imageGrid-Item"
  >
    <div v-lazy-container="{ selector: 'img' }" class="imageGrid-Item_Wrapper">
      <img
        :srcset="
          `${transformImage(
            post.filename || post.cover_image,
            '1668x0'
          )} 1668w, ${transformImage(
            post.filename || post.cover_image,
            '1440x0'
          )} 1440w, ${transformImage(
            post.filename || post.cover_image,
            '1280x0'
          )} 1280w, ${transformImage(
            post.filename || post.cover_image,
            '960x0'
          )} 960w, ${transformImage(
            post.filename || post.cover_image,
            '800x0'
          )} 800w, ${transformImage(
            post.filename || post.cover_image,
            '690x0'
          )} 690w`
        "
        sizes="100vw"
        :data-src="post.filename || post.cover_image"
        :alt="post.title"
      />
    </div>
  </li>
</template>

<script>
export default {
  name: "GridItem",
  props: {
    post: Object
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
