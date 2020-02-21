export default {
  actions: {
    async nuxtServerInit({ commit }, { app }) {
      let getPosts = await app.$storyapi.get("cdn/stories", {
        version: process.env.NODE_ENV === "production" ? "published" : "draft",
        starts_with: "blog/"
      })
      let posts = getPosts.data.stories.map(bp => {
        return {
          id: bp.slug,
          title: bp.content.title,
          year: bp.content.year,
          category: bp.content.category,
          content: bp.content.content,
          cover_image: bp.content.cover_image,
          images: bp.content.images
        }
      })
      commit("posts/update", posts)
    }
  }
}
