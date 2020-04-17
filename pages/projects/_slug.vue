<template>
  <div class="view view-Container view-Project">
    <section id="floatBlock" class="projectItem-Text text">
      <div class="spaceForm"></div>
      <markdown-item :input="story.content.content" />
    </section>
    <nuxt-link
      v-if="story.content.prev_link.id !== ''"
      :to="`/${story.content.prev_link.cached_url}`"
      class="projectItem-Nav projectItem-Nav_Prev"
      title="previous project"
    >
      <div class="icon arrow" v-html="require('~/assets/images/icon-arrow-long.svg?include')" />
    </nuxt-link>
    <nuxt-link
      v-if="story.content.next_link.id !== ''"
      :to="`/${story.content.next_link.cached_url}`"
      class="projectItem-Nav projectItem-Nav_Next"
      title="next project"
    >
      <div class="icon arrow" v-html="require('~/assets/images/icon-arrow-long.svg?include')" />
    </nuxt-link>
    <section class="projectItem-Images">
      <div class="spaceForm"></div>
      <ul class="imageGrid">
        <li v-for="(image, index) in story.content.images" class="imageGrid-Item" :key="index">
          <div v-lazy-container="{ selector: 'img' }" class="imageGrid-Item_Wrapper">
            <img
              :srcset="
                `${transformImage(
                  image.filename,
                  '1668x0'
                )} 1668w, ${transformImage(
                  image.filename,
                  '1440x0'
                )} 1440w, ${transformImage(
                  image.filename,
                  '1280x0'
                )} 1280w, ${transformImage(
                  image.filename,
                  '960x0'
                )} 960w, ${transformImage(
                  image.filename,
                  '800x0'
                )} 800w, ${transformImage(image.filename, '690x0')} 690w`
              "
              sizes="100vw"
              :data-src="image.filename"
              :alt="image.name"
            />
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
// STORYBLOK ASYNC CHECKED WITH https://www.storyblok.com/tp/nuxt-js-multilanguage-website-tutorial
import storyblokLivePreview from "@/mixins/storyblokLivePreview"
import JQuery from "jquery"
let $ = JQuery

export default {
  mixins: [storyblokLivePreview],
  scrollToTop: true,
  asyncData(context) {
    let endpoint = `cdn/stories/projects/${context.params.slug}`
    let version =
      context.query._storyblok || context.isDev ? "draft" : "published"
    return context.app.$storyapi
      .get(endpoint, {
        version: version,
        cv: context.store.state.cacheVersion
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
    window.scrollTo(0, 0)
    window.addEventListener("scroll", this.toggleBlock)
    document.addEventListener("keydown", this.backOnEscape)
    document.addEventListener("keydown", this.keyNavigation)
  },
  destroyed() {
    window.removeEventListener("scroll", this.toggleBlock)
    document.removeEventListener("keydown", this.backOnEscape)
    document.removeEventListener("keydown", this.keyNavigation)
  },
  methods: {
    toggleBlock() {
      let scrollPosition = document.documentElement.scrollTop
      if (scrollPosition > 0) {
        $("#floatBlock").addClass("active")
      } else {
        $("#floatBlock").removeClass("active")
      }
    },
    transformImage(image, option) {
      if (!image) return ""
      if (!option) return ""

      let imageService = "//img2.storyblok.com/"
      let path = image.replace("//a.storyblok.com", "")
      return imageService + option + path
    },
    backOnEscape(event) {
      if (event.keyCode === 27) {
        this.$router.push({ name: "index" })
      } else if (event.keyCode === 39 || event.keyCode === 40) {
        if (this.story.content.next_link.cached_url) {
          this.$router.push({
            path: `/${this.story.content.next_link.cached_url}`
          })
        }
      } else if (event.keyCode === 37 || event.keyCode === 38) {
        if (this.story.content.prev_link.cached_url) {
          this.$router.push({
            path: `/${this.story.content.prev_link.cached_url}`
          })
        }
      }
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/styling/variables.sass'

main
  .projectItem
    &-Text
      position: relative
      padding-left: var(--spacing-two)
      padding-right: var(--spacing-two)
      padding-bottom: var(--spacing-two)
      background: var(--background-color)
    &-Nav
      position: fixed
      padding: var(--spacing-two)var(--spacing-two)
      mix-blend-mode: difference
      z-index: 999
      @media screen and ( min-width: $breakpoint-mobile)
        top: 50%
        transform: translateY(-50%)
      @media screen and ( max-width: $breakpoint-mobile)
        bottom: 0
        padding: var(--spacing-four)var(--spacing-two)

      .icon
        width: 2.5em
        opacity: 1
        svg
          color: white !important
          opacity: 1
      &_Prev
        left: 0
        svg
          transform: rotate(180deg)
      &_Next
        right: 0
main.spaced.four
  .projectItem
    &-Nav
      color: black
</style>
