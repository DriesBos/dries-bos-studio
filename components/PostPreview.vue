<template>
  <nuxt-link :to="id" tag="li">
    <h1>{{ title }}</h1>
    <p>{{ excerpt }}</p>
    <img :src="thumbnail">
  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  }
}
</script>
