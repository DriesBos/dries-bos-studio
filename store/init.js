export const state = () => ({
  initState: true
})

export const mutations = {
  toggleTheInit(state) {
    state.initState = !state.initState
  },
  falseTheInit(state) {
    state.initState = false
  }
}
