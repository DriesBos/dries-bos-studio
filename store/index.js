export default {
  actions: {
    async nuxtServerInit({ commit }, { app }) {
      let getPosts = await app.$storyapi.get('cdn/stories', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        starts_with: 'blog/'
      })
      let posts = getPosts.data.stories.map(bp => {
        return {
          id: bp.slug,
          title: bp.content.title,
          year: bp.content.year,
          category: bp.content.category,
          content: bp.content.content,
          image_0: bp.content.image_0,
          image_1: bp.content.image_1,
          image_2: bp.content.image_2,
          image_3: bp.content.image_3,
          image_4: bp.content.image_4,
          image_5: bp.content.image_5,
          video_0: bp.content.video_0,
          video_1: bp.content.video_1,
          video_2: bp.content.video_2,
          video_3: bp.content.video_3,
          video_4: bp.content.video_4,
          video_5: bp.content.video_5
        }
      })
      commit('posts/update', posts)
    }
  }
}
