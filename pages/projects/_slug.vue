<template>
  <div class="view view-Container view-Project">
    <section class="contentListItem-Single">
      <ul class="contentListItem end">
        <li class="contentListItem-Column contentListItem-OneThree justified">
          <markdown-item :input="story.content.content" />
        </li>
      </ul>
    </section>
    <section class="contentListItem-Images">
      <ul>
        <div class="contentListItem-Nav">
          <nuxt-link
            v-if="story.content.prev_link.id !== ''"
            :to="`/${story.content.prev_link.cached_url}`"
            class="contentListItem-Nav_Prev"
            title="previous project"
            tag="div"
          >
            <div
              class="icon-Arrow"
              v-html="require('~/assets/images/icon-arrow-long.svg?include')"
            />
          </nuxt-link>
          <nuxt-link
            v-if="story.content.next_link.id !== ''"
            :to="`/${story.content.next_link.cached_url}`"
            class="contentListItem-Nav_Next"
            title="next project"
            tag="div"
          >
            <div
              class="icon-Arrow"
              v-html="require('~/assets/images/icon-arrow-long.svg?include')"
            />
          </nuxt-link>
        </div>
        <li v-for="(image, index) in story.content.images" :key="index">
          <div v-lazy-container="{ selector: 'img' }">
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
      } else if (event.keyCode === 39) {
        if (this.story.content.next_link.cached_url) {
          this.$router.push({
            path: `/${this.story.content.next_link.cached_url}`
          })
        }
      } else if (event.keyCode === 37) {
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
      padding-left: var(--spacing-sides)
      padding-right: var(--spacing-sides)
      padding-bottom: var(--spacing-two)
      background: var(--background-color)
      @media screen and ( max-width: $breakpoint-mobile)
        padding-bottom: var(--spacing-three)
    &-Nav
      position: fixed
      padding: var(--spacing-two) var(--spacing-sides)
      mix-blend-mode: difference
      z-index: 999
      top: 50%
      transform: translateY(-50%)
      &:hover
        @media (hover: hover)
          mix-blend-mode: initial
          .icon
            svg
              color: var(--support-color)
      .icon
        width: calc(#{var(--spacing-icons)} * 2)
        opacity: 1
        svg
          color: white
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
