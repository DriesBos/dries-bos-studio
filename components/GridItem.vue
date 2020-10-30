<template>
  <section
    :id="post.id"
    :key="post.id"
    class="gridItem gridItem_Project imageGrid-Item"
  >
    <div v-lazy-container="{ selector: 'img' }" class="imageGrid-Item_Wrapper">
      <img
        :v-lazy="post.filename"
        :data-srcset="
          `${transformImage(post.filename, '1668x0')} 1668w, ${transformImage(
            post.filename,
            '1440x0'
          )} 1440w, ${transformImage(
            post.filename,
            '1280x0'
          )} 1280w, ${transformImage(
            post.filename,
            '960x0'
          )} 960w, ${transformImage(
            post.filename,
            '800x0'
          )} 800w, ${transformImage(post.filename, '690x0')} 690w`
        "
        sizes="100vw"
        :alt="post.title"
        class="lazy"
      />
    </div>
  </section>
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
