export function hasPitchLoadedSelector(state) {
  return state.pitchData.hasLoaded;
}

export function pitchSelector(state) {
  return state.pitchData.pitch;
}
