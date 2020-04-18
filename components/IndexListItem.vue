<template>
  <li :key="post.id" :id="post.id" class="listItem listItem_Project hovered">
    <nuxt-link :to="`/projects/${post.id}`" class="listItem-DetailsWrapper" tag="div">
      <div class="listItem-Year listItem-Details ellipsis">
        <p title="project year">{{ post.year || "" }}</p>
      </div>
      <div v-if="post.title" class="listItem-Title listItem-Details ellipsis">
        <p title="project title">{{ post.title || "" }}</p>
      </div>
      <div v-if="post.category" class="listItem-Category listItem-Details ellipsis">
        <p title="project category">{{ post.category || "" }}</p>
      </div>
      <div class="listItem-Icons">
        <div class="icon-Container" title="view project">
          <div
            class="icon arrow"
            v-html="require('~/assets/images/icon-arrow.svg?include')"
            title="go to project"
          ></div>
        </div>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
import { gsap } from "gsap"

export default {
  name: "IndexListItem",
  props: {
    post: Object
  },
  mounted() {
    gsap.to(".listItem", {
      opacity: 1,
      duration: 1,
      stagger: 0.1
    })
    window.addEventListener("load", event => {
      document.querySelector(".listItem").style.opacity = 1
    })
  },
  methods: {
    // setListItemOpacity() {
    //   this.document.querySelector(".listItem").style.opacity = 1
    //   // console.log("SET", document.getElementsByClassName("listItem"))
    // }
  }
}
</script>

<style lang="sass">
@import '~/assets/styling/variables.sass'

.list
  position: relative
  display: flex
  flex-direction: column
  flex-shrink: 0
  width: 100%
  min-height: 0
  .listItem
    position: relative
    width: 100%
    display: flex
    align-items: center
    justify-content: space-between
    min-height: 0
    opacity: 0
    background: var(--background-color)
    &-DetailsWrapper
      display: flex
      flex-grow: 1
      align-items: center
    &-Details
      flex-shrink: 0
      flex-basis: calc(100% * .25)
      min-height: 0
      padding-left: var(--spacing-one)
      padding-top: var(--spacing-type-vertical)
      padding-bottom: var(--spacing-type-vertical)
      &.active
        a, p, input
          opacity: 1
          color: var(--support-color)
      @media screen and ( max-width: $breakpoint-tablet)
        flex-basis: auto
        padding-right: var(--spacing-two)
      &:nth-child(1)
        padding-left: var(--spacing-sides)
        @media screen and ( max-width: $breakpoint-tablet)
          width: calc(#{var(--spacing-three)} + 2.6rem)
    &-Category
      flex-grow: 1
      @media screen and ( max-width: $breakpoint-tablet)
        display: none
    &-Icons
      position: absolute
      top: 0
      right: 0
      bottom: 0
      display: flex
      .icon-Container
        display: flex
        align-items: center
        justify-content: center
        height: 100%
        padding-left: var(--spacing-two)
        padding-right: var(--spacing-sides)
        color: var(--type)
    &_Project
      border-bottom: 1px solid var(--type)
      &:first-child
        border-top: 1px solid var(--type)
      &:last-child
        border-bottom: 0px
      &:hover
        @media ( hover: hover )
          .listItem-DetailsWrapper
            background: var(--support-color)
            a, p, svg
              color: var(--support-type)
    &_Filter
      p, input::placeholder, svg, input
        transition: color $transition-hover, opacity $transition-hover
        opacity: 0.25
      .listItem-Details
        &:hover
          @media ( hover: hover )
            p
              color: var(--support-color)
              opacity: 1
      .listItem-Icons
        input
          opacity: 0
        &.active
          input, svg
            opacity: 1
.spaced
  .listItem
    &_Project
      &:first-child
        border-top: 0px solid var(--type)
    &_Filter
      p, input::placeholder, svg, input
        opacity: 1
</style>
