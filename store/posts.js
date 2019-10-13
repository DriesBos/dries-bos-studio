export const state = () => ({
  list: []
})

export const mutations = {
  update(state, items) {
    state.list.push(...items)
  }
}
