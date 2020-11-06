export const state = () => ({
  initState: false
})

export const mutations = {
  toggleTheInit(state) {
    state.initState = !state.initState
  }
}
