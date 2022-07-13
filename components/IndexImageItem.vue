<template>
  <nuxt-link
    v-if="post.active"
    :id="post.id"
    :key="post.id"
    :to="`/projects/${post.id}`"
    class="gridItem gridItem_Project imageGrid-Item cursorInteract"
    tag="section"
  >
    <div v-if="slider" class="imageGrid-Item_Wrapper">
      <client-only>
        <VueCarouselItem :images="post.images" />
      </client-only>
      <!-- <template v-for="(image, index) in post.images">
        <nuxt-img
          :key="index"
          provider="storyblok"
          width="2300"
          format="webp"
          :src="image.filename"
          :alt="post.title"
        />
      </template> -->
    </div>
    <div v-else class="imageGrid-Item_Wrapper">
      <nuxt-img
        provider="storyblok"
        width="2300"
        format="webp"
        :src="post.cover_image"
        :alt="post.title"
      />
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    post: Object,
    slider: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // console.log("POSTS", this.post.images)
  }
}
</script>
