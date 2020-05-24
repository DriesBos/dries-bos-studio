<template>
  <section>
    <nuxt-link
      :to="`/projects/${post.id}`"
      :key="post.id"
      :id="post.id"
      class="contentListItem-List"
      tag="section"
    >
      <ul class="contentListItem">
        <li class="contentListItem-Column year">
          <p title="project year">{{ post.year || "" }}</p>
        </li>
        <li class="contentListItem-Column category">
          <p title="project category">{{ post.category || "" }}</p>
        </li>
        <li class="contentListItem-Column agency">
          <p title="project agency">{{ post.agency || "" }}</p>
        </li>
        <li class="contentListItem-Column title">
          <p title="project title">{{ post.title || "" }}</p>
        </li>
        <li class="contentListItem-Column icons">
          <ul class="contentListItem-Icons">
            <li class="contentListItem-Icon contentListItem-Arrow">
              <div
                class="icon icon-Arrow"
                v-html="require('~/assets/images/icon-arrow.svg?include')"
                title="go see project"
              ></div>
            </li>
          </ul>
        </li>
      </ul>
    </nuxt-link>
  </section>
</template>

<script>
import { gsap } from "gsap"

export default {
  name: "IndexTextItem",
  props: {
    post: Object
  }
}
</script>
