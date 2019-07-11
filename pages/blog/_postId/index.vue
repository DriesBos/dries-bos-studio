<template>
  <div>
    <TheHeader :headerTitle="title" :previousUrl="previous_url" :nextUrl="next_url" />
    <section class="view-Container">
      <div class="post">
        <div class="post-Content">
          <MarkdownItem v-if="content" :input="content" />
          <p class="ellipsis">
            <span v-if="year">Date: {{ year }}</span>
            <br />
            <span v-if="category">Role: {{ role }}</span>
            <br />
            <a v-if="hyperlink" :href="hyperlink" target="_blank">{{ hyperlink }}</a>
          </p>
        </div>
        <div class="post-Images" v-lazy-container="{ selector: 'img' }">
          <img v-if="image_0" :data-src="image_0" />
          <img v-if="image_1" :data-src="image_1" />
          <img v-if="image_2" :data-src="image_2" />
          <img v-if="image_3" :data-src="image_3" />
          <img v-if="image_4" :data-src="image_4" />
          <img v-if="image_5" :data-src="image_5" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MarkdownItem from '~/components/MarkdownItem.vue'
import TheHeader from '~/components/TheHeader.vue'

/* eslint-disable */
function getProjectIndex(projects, id) {
  let index = projects.findIndex(element => element.id === id)
  return index === -1 ? 0 : index
}
export default {
  components: {
    MarkdownItem,
    TheHeader: TheHeader
  },
  asyncData({ app, store, params }) {
    return app.$storyapi
      .get('cdn/stories/blog/' + params.postId, {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft'
      })
      .then(res => {
        let previous =
            store.state.posts.list[
              getProjectIndex(store.state.posts.list, params.postId) - 1
            ],
          next =
            store.state.posts.list[
              getProjectIndex(store.state.posts.list, params.postId) + 1
            ]
        return {
          title: res.data.story.content.title,
          year: res.data.story.content.year,
          content: res.data.story.content.content,
          thumbnail: res.data.story.content.thumbnail,
          role: res.data.story.content.role,
          category: res.data.story.content.category,
          hyperlink: res.data.story.content.hyperlink,
          image_0: res.data.story.content.image_0,
          image_1: res.data.story.content.image_1,
          image_2: res.data.story.content.image_2,
          image_3: res.data.story.content.image_3,
          image_4: res.data.story.content.image_4,
          image_5: res.data.story.content.image_5,
          previous_url: previous ? '/blog/' + previous.id : null,
          next_url: next ? '/blog/' + next.id : null
        }
      })
  },
  methods: {
    navigateToProject(id) {
      this.$router.push({ path: `/blog/${id}` })
    }
  }
  /* eslint-enable */
}
</script>

<style lang="sass" scoped>
.view-Project
  margin-top: 100px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
.project-List
  display: flex
  flex-direction: column
  width: 500px
  li
    background: lightblue
    margin-bottom: 100px
  img
    width: 100%
    height: auto
</style>
