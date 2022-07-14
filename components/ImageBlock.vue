<template>
  <section
    :id="post.id"
    :key="post.id"
    class="gridItem gridItem_Project imageGrid-Item"
  >
    <div class="imageGrid-Item_Wrapper">
      <NuxtImg :src="post.filename" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    post: Object
  },
  mounted() {
    console.log("IMAGEBLOCK IMAGE FILENAME", this.post.filename)
  }
}
</script>
