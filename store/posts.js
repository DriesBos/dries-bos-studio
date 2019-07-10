export const state = () => ({
  list: [],
  isList: false
})

export const mutations = {
  update(state, items) {
    state.list.push(...items)
  },
  toggleList(state, isList) {
	state.isList = isList
  }
}
