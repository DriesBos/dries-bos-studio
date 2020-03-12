<template>
  <div class="view view-Container view-About">
    <section id="floatBlock">
      <div class="spaceForm"></div>
      <p>short</p>
      <markdown-item :input="story.content.short" />
    </section>
    <section>
      <div class="spaceForm"></div>
      <p>long</p>
      <markdown-item :input="story.content.long" />
    </section>
    <section>
      <p>services</p>
      <markdown-item :input="story.content.services" />
    </section>
    <section>
      <p>contact</p>
      <p>
        <a href>info@driesbos.com</a> —
        <a href>+31(0)636101262</a>
      </p>
    </section>
    <section>
      <p>stay in contact</p>
      <p>
        <a href>Instagram</a> —
        <a href>Behance</a> —
        <a href>Codepen</a> —
        <a href>GitHub</a> —
        <a href>LinkedIn</a>
      </p>
    </section>
  </div>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
  mixins: [storyblokLivePreview],
  asyncData(context) {
    return context.app.$storyapi
      .get("cdn/stories/about", {
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
      story: {
        content: {}
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0)
    window.addEventListener("scroll", this.toggleBlock)
  },
  destroyed() {
    window.removeEventListener("scroll", this.toggleBlock)
  },
  methods: {
    toggleBlock() {
      let scrollPosition = document.documentElement.scrollTop
      if (scrollPosition > 0) {
        $("#floatBlock").addClass("active")
      } else {
        $("#floatBlock").removeClass("active")
      }
    }
  }
}
</script>

<style lang="sass">
main
  .view-About
    section
      display: flex
      padding-left: var(--spacing-two)
      padding-right: var(--spacing-two)
      border-bottom: 1px solid var(--type)
      border-top: 0
      p
        padding-top: var(--spacing-one)
        padding-bottom: var(--spacing-one)
      p:first-child, p:nth-child(2)
        flex-basis: calc(100% / 4)
    section:last-child
      border-bottom: 0
</style>