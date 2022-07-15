export const state = () => ({
  prevState: false,
  nextState: false,
  prevBtn: false,
  nextBtn: false
})

export const mutations = {
  // Toggle Prev/Next
  togglePrevState(state) {
    state.prevState = !state.prevState
  },
  toggleNextState(state) {
    state.nextState = !state.nextState
  },
  // Disable buttons
  truePrevBtn(state) {
    state.prevBtn = true
  },
  falsePrevBtn(state) {
    state.prevBtn = false
  },
  trueNextBtn(state) {
    state.nextBtn = true
  },
  falseNextBtn(state) {
    state.nextBtn = false
  }
}
