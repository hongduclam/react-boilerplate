/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from 'old/containers_del/HomePage/reducer';

const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );

export { selectHome, makeSelectUsername };
