<template>
  <nuxt-link
    :to="`/projects/${post.id}`"
    :key="post.id"
    :id="post.id"
    class="gridItem gridItem_Project"
    tag="li"
  >
    <div v-lazy-container="{ selector: 'img' }">
      <img
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
export default {
  name: "IndexGridItem",
  props: {
    post: Object
  },
  mounted() {},
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

<style lang="sass">
@import '~/assets/styling/variables.sass'

.grid
  display: flex
  flex-direction: column
  li
    cursor: pointer
  li:nth-child(2)
    width: calc((100% / 3) * 2)
    align-self: flex-end
  li:nth-child(3)
    width: calc(100% / 3)
  li:nth-child(4)
    width: calc((100% / 3) * 2)
  li:nth-child(5)
    width: calc(100% / 3)
    align-self: flex-end
  li:nth-child(6)
    width: 100%
    align-self: flex-end
  li:nth-child(7)
    width: calc((100% / 3) * 2)
    align-self: flex-end
  li:nth-child(8)
    width: calc((100% / 3) * 2)
  li:nth-child(9)
    width: calc(100% / 3)
    align-self: flex-end
  li:nth-child(10)
    width: calc((100% / 3) * 2)
    align-self: flex-end
  li:last-child
    width: calc((100% / 3) * 2)
    align-self: flex-start
  @media screen and ( max-width: $breakpoint-mobile)
    li
      width: 100%
</style>
