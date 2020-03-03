export const state = () => ({
  viewState: true
})

export const mutations = {
  toggleTheView(state) {
    state.viewState = !state.viewState
  }
}
