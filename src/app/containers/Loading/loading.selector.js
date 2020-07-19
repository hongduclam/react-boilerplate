export const makeLoadingSelector = state => {
  console.log('state.loading', state.loading);
  if (!state.loading) {
    return false;
  }
  let rs = false;
  // eslint-disable-next-line consistent-return
  Object.keys(state.loading).forEach(key => {
    if (state.loading[key]) {
      rs = true;
    }
  });
  return rs;
};
