<template>
  <section
    :id="post.id"
    :key="post.id"
    class="gridItem gridItem_Project imageGrid-Item"
  >
    <div class="imageGrid-Item_Wrapper">
      <!-- <nuxt-img
        provider="storyblok"
        width="2300"
        format="webp"
        :src="post.filename"
        :alt="post.title"
      /> -->
    </div>
  </section>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>
