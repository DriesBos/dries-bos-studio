<template>
  <div class="view view-Container view-About">
    <section id="floatBlock">
      <div class="spaceForm"></div>
      <div class="about-Details about-Details_Left">
        <p>short</p>
      </div>
      <markdown-item :input="story.content.short" class="about-Details about-Details_Right" />
    </section>
    <section>
      <div class="spaceForm"></div>
      <div class="about-Details about-Details_Left">
        <p>long</p>
      </div>
      <markdown-item :input="story.content.long" class="about-Details about-Details_Right" />
    </section>
    <section>
      <div class="about-Details about-Details_Left">
        <p>services</p>
      </div>
      <markdown-item :input="story.content.services" class="about-Details about-Details_Right" />
    </section>
    <section>
      <div class="about-Details about-Details_Left">
        <p>
          awards &
          <br />features
        </p>
      </div>
      <markdown-item :input="story.content.awards" class="about-Details about-Details_Right" />
    </section>
    <section>
      <div class="about-Details about-Details_Left">
        <p>contact</p>
      </div>
      <div class="about-Details about-Details_Right">
        <p>
          <a class="slideIn" href="mailto:info@driesbos.com">info@driesbos.com</a>,
          <a class="slideIn" href="tel:0031636101262">+31(0)636101262</a>
        </p>
      </div>
    </section>
    <section>
      <div class="about-Details about-Details_Left">
        <p>social</p>
      </div>
      <div class="about-Details about-Details_Right">
        <p>
          <a class="slideIn" href="https://instagram.com/driesbosstudio">Instagram</a>,
          <a class="slideIn" href="https://behance.net/driesbos">Behance</a>,
          <a class="slideIn" href="https://codepen.io/driesbos">Codepen</a>,
          <a class="slideIn" href="https://github.com/DriesBos">GitHub</a>,
          <a class="slideIn" href="https://linkedin.com/in/dries-bos">LinkedIn</a>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"
import { gsap } from "gsap"

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
    gsap.to(".slideIn", {
      "--var-about": "100%",
      duration: 0.66,
      delay: 0.1,
      ease: "ease"
    })
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
@import '~/assets/styling/variables.sass'

main
  .view-About
    section
      display: flex
      border-bottom: 1px solid var(--type)
      border-top: 0
      .about-Details
        padding-top: var(--spacing-one)
        padding-bottom: var(--spacing-one)
        min-height: 0
        padding-left: var(--spacing-one)
        padding-right: var(--spacing-one)
        a
          position: relative
          --var-about: 0%
          &:after
            content: ''
            position: absolute
            left: 0
            display: inline-blick
            bottom: 0
            width: var(--var-about)
            border-bottom: 1px solid var(--support-type)
          &:hover
            &:after
              @media ( hover: hover )
                animation: hyperHyperLink .66s ease
                animation-iteration-count: 1
        &_Left
          flex-basis: calc(100% * .25)
          padding-left: var(--spacing-two)
          @media screen and ( max-width: $breakpoint-tablet)
            flex-basis: calc(#{var(--spacing-three)} + 4em)
            flex-shrink: 0
        &_Right
          flex-basis: calc(100% * .75)
          padding-right: var(--spacing-two)
          @media screen and ( max-width: $breakpoint-tablet)
            flex-basis: auto
</style>
