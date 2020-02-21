<template>
  <p>BLOG SPECIFIC PAGE</p>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"
import JQuery from "jquery"
let $ = JQuery

export default {
  mixins: [storyblokLivePreview],
  scrollToTop: true,
  asyncData(context) {
    let endpoint = `cdn/stories/blog/${context.params.slug}`

    return context.app.$storyapi
      .get(endpoint, {
        version: "draft"
      })
      .then(res => {
        return res.data
      })
      .catch(res => {
        if (!res.response) {
          console.error(res)
          context.error({
            statusCode: 404,
            message: "Failed to receive content form api"
          })
        } else {
          console.error(res.response.data)
          context.error({
            statusCode: res.response.status,
            message: res.response.data
          })
        }
      })
  },
  data() {
    return {
      story: { content: {} }
    }
  },
  mounted() {
    console.log(this.story)
  }
}
</script>
