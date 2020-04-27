<template>
  <component
    :is="story.content.component | dashify"
    v-if="story.content.component"
    :key="story.content._uid"
    :blok="story.content"
  ></component>
</template>

<script>
export default {
  asyncData(context) {
    let version =
      context.query._storyblok || context.isDev ? "draft" : "published"
    return context.app.$storyapi
      .get(`cdn/stories/${context.params.slug}`, {
        version: version
      })
      .then(res => {
        return res.data
      })
      .catch(res => {
        context.error({
          statusCode: res.response.status,
          message: res.response.data
        })
      })
  },
  data() {
    return { story: { content: {} } }
  }
  // head() {
  //   return {
  //     title: this.story.content.SEO.title || this.story.name,
  //     meta: [
  //       {
  //         hid: "description",
  //         name: "description",
  //         content: this.story.content.SEO.description || this.story.name
  //       }
  //     ]
  //   }
  // }
}
</script>
