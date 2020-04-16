<template>
  <li :key="post.id" :id="post.id" class="listItem listItem_Project">
    <nuxt-link
      :to="`/projects/${post.id}`"
      class="listItem-DetailsWrapper"
      tag="div"
    >
      <div class="listItem-Year listItem-Details ellipsis">
        <p title="project year">{{ post.year || "" }}</p>
      </div>
      <div v-if="post.title" class="listItem-Title listItem-Details ellipsis">
        <p title="project title">{{ post.title || "" }}</p>
      </div>
      <div
        v-if="post.category"
        class="listItem-Category listItem-Details ellipsis"
      >
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
    &-DetailsWrapper
      display: flex
      flex-grow: 1
      align-items: center
    &-Details
      flex-shrink: 0
      flex-basis: calc(100% * .25)
      padding-bottom: var(--spacing-one)
      cursor: pointer
      min-height: 0
      padding-left: var(--spacing-one)
      padding-top: var(--spacing-one)
      &.active
        a, p, input
          opacity: 1
          color: var(--support-color)
      @media screen and ( max-width: $breakpoint-tablet)
        flex-basis: auto
        padding-right: var(--spacing-two)
      &:nth-child(1)
        padding-left: var(--spacing-two)
        @media screen and ( max-width: $breakpoint-tablet)
          width: calc(#{var(--spacing-three)} + 2.6em)
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
        cursor: pointer
        height: 100%
        padding-left: var(--spacing-two)
        padding-right: var(--spacing-two)
        color: var(--type)
    &_Project
      cursor: pointer
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
        transition: color $transition-hover
      .listItem-Details
        &:hover
          @media ( hover: hover )
            p
              color: var(--support-color)
      .listItem-Icons
        input
          opacity: 0
        &.active
          input, svg
            opacity: 1
.spaced
  .listItem_Project
    &:first-child
      border-top: 0px solid var(--type)
</style>
