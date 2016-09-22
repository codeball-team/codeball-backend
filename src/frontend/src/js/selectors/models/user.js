export function hasUserLoadedSelector(state) {
  return state.userData.hasLoaded;
}

export function userSelector(state) {
  return state.userData.user;
}
