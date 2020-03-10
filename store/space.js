export const state = () => ({
  spaceState: false
})

export const mutations = {
  toggleTheSpace(state) {
    state.spaceState = !state.spaceState
  }
}
