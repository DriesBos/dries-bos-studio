export const state = () => ({
  spaceState: false
})

export const mutations = {
  toggleTheSpace(state) {
    state.spaceState = !state.spaceState
  },
  turnOffTheSpace(state) {
    state.spaceState = false
  },
  turnOnTheSpace(state) {
    state.spaceState = true
  }
}
