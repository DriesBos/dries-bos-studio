<template>
  <section>
    <nuxt-link
      :id="post.id"
      :key="post.id"
      :to="`/projects/${post.id}`"
      class="contentListItem-List"
      tag="section"
    >
      <ul class="contentListItem">
        <li class="contentListItem-Column year">
          <p title="project year">{{ post.year || "" }}</p>
        </li>
        <li class="contentListItem-Column title">
          <p title="project title">{{ post.title || "" }}</p>
        </li>
        <li class="contentListItem-Column agency">
          <p title="project agency">{{ post.agency || "" }}</p>
        </li>
        <li class="contentListItem-Column category">
          <p title="project category">{{ post.category || "" }}</p>
        </li>
        <li class="contentListItem-Column icons">
          <ul class="contentListItem-Icons">
            <li class="contentListItem-Icon contentListItem-Arrow">
              <!-- <div
                class="icon icon-Arrow"
                title="view project"
                v-html="require('~/assets/images/icon-arrow.svg?include')"
              ></div> -->
            </li>
          </ul>
        </li>
      </ul>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>
