export default {
	actions: {
	  async nuxtServerInit ({ commit, dispatch }, { app }) { 
		
		let getPosts = await app.$storyapi.get('cdn/stories', {
			version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
			starts_with: 'blog/'
		})
		
		let posts = getPosts.data.stories.map(bp => {
	        return {
              id: bp.slug,
              thumbnail: bp.content.thumbnail,
              title: bp.content.title,
              year: bp.content.year,
              category: bp.content.category
            }
		})
		
		commit('posts/update', posts)
		
	  }
	}
}