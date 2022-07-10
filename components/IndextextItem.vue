<template>
  <nuxt-link
    :id="post.id"
    :key="post.id"
    :to="`/projects/${post.id}`"
    class="block block-Text contentListItem-List hoverUp"
    :class="[{ disabled: !post.active }, { cursorInteract: post.active }]"
    tag="section"
  >
    <ul class="contentListItem">
      <li class="contentListItem-Column year">
        <p title="year">{{ post.year || "" }}</p>
      </li>
      <li class="contentListItem-Column title">
        <p title="project">{{ post.title || "" }}</p>
      </li>
      <!-- <li class="contentListItem-Column agency">
          <p title="agency">{{ post.agency || "" }}</p>
        </li>
        <li class="contentListItem-Column category">
          <p title="industry">{{ post.category || "" }}</p>
        </li>
        <li class="contentListItem-Column category">
          <p title="role">role</p>
        </li> -->
      <li class="contentListItem-Column icons">
        <ul class="contentListItem-Icons">
          <li class="contentListItem-Icon contentListItem-Arrow">
            <div
              class="icon icon-Arrow"
              title="view project"
              v-html="require('~/assets/images/icon-arrow.svg?include')"
            ></div>
          </li>
        </ul>
      </li>
    </ul>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>
