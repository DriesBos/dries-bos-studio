export const state = () => ({
  list: [],
  isList: true,
  isLight: true
})

export const mutations = {
  update(state, items) {
    state.list.push(...items)
  },
  toggleList(state, isList) {
    state.isList = isList
  },
  toggleLight(state, isLight) {
    state.isLight = isLight
  }
}
