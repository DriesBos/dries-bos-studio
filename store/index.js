export default {
  actions: {
    // put asynchronous functions that can call one or more mutation functions
    async nuxtServerInit({ commit }, { app }) {
      let getPosts = await app.$storyapi.get("cdn/stories", {
        version: process.env.NODE_ENV === "production" ? "published" : "draft",
        starts_with: "projects/"
      })
      let posts = getPosts.data.stories.map(bp => {
        return {
          id: bp.slug,
          slug: bp.slug,
          active: bp.content.active,
          title: bp.content.title,
          year: bp.content.year,
          category: bp.content.category,
          agency: bp.content.agency,
          cover_image: bp.content.cover_image,
          body: bp.content.content,
          images: bp.content.images,
          content: bp
        }
      })
      commit("posts/update", posts)
    }
  }
}
