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
        <a href="mailto:info@driesbos.com">info@driesbos.com</a> —
        <a href="tel:0031636101262">+31(0)636101262</a>
      </p>
    </section>
    <section>
      <p>stay in contact</p>
      <p>
        <a href="https://instagram.com/driesbosstudio">Instagram</a> —
        <a href="https://behance.net/driesbos">Behance</a> —
        <a href="https://codepen.io/driesbos">Codepen</a> —
        <a href="https://github.com/DriesBos">GitHub</a> —
        <a href="https://linkedin.com/in/dries-bos">LinkedIn</a>
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
      a
        text-decoration: underline
    section:nth-child(1), section:nth-child(2)
      p:nth-child(2)
        flex-basis: calc(100% / 4)
    section:nth-child(3), section:nth-child(4), section:nth-child(5)
      p:nth-child(1)
        flex-basis: calc(100% / 4)
    section:last-child
      border-bottom: 0
      flex-grow: 1
</style>