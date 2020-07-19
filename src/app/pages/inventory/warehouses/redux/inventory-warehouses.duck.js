/*
*
- actions types
- actions
- saga
- reducer
- crud
- selector
* */
import { call, put, takeLatest } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import produce from 'immer';
import * as crud from 'app/pages/inventory/warehouses/redux/inventory-warehouses.crud';
import { MODULE_STATE_NAME } from '../constants';

const buildAsyncActionTypes = actionName => ({
  start: `${MODULE_STATE_NAME}/${actionName}/start`,
  error: `${MODULE_STATE_NAME}/${actionName}/error`,
  success: `${MODULE_STATE_NAME}/${actionName}/success`,
});

export const actionTypes = {
  getById: {
    ...buildAsyncActionTypes('getById'),
  },
  create: {
    ...buildAsyncActionTypes('create'),
  },
  update: {
    ...buildAsyncActionTypes('update'),
  },
  remove: {
    ...buildAsyncActionTypes('remove'),
  },
  filter: {
    ...buildAsyncActionTypes('filter'),
  },
  resetState: `${MODULE_STATE_NAME}.resetState`,
};

export const initialState = {
  inventoryWarehouseDetail: {
    id: '',
  },
  inventoryWarehouseList: {},
  error: '',
};

export const reducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.getById.success:
        draft.inventoryWarehouseDetail = action.payload;
        break;
      case actionTypes.filter.success:
        draft.inventoryWarehouseList = action.payload;
        break;
      case actionTypes.resetState:
      case actionTypes.create.success:
      case actionTypes.remove.success:
        draft.inventoryWarehouseDetail = initialState.inventoryWarehouseDetail;
        break;
      case actionTypes.create.error:
      case actionTypes.remove.error:
      case actionTypes.getById.error:
      case actionTypes.filter.error:
        draft.error = action.payload && action.payload.toString();
        break;
      default:
        break;
    }
  });

export const actions = {
  create: {
    start: (payload, callback) => ({
      type: actionTypes.create.start,
      payload,
      callback,
    }),
    success: payload => ({ type: actionTypes.create.success, payload }),
    error: error => ({ type: actionTypes.create.error, error }),
  },
  remove: {
    start: (payload, callback) => ({
      type: actionTypes.remove.start,
      payload,
      callback,
    }),
    success: payload => ({ type: actionTypes.remove.success, payload }),
    error: error => ({ type: actionTypes.remove.error, error }),
  },
  getById: {
    start: payload => ({ type: actionTypes.getById.start, payload }),
    error: error => ({ type: actionTypes.getById.error, error }),
    success: payload => ({ type: actionTypes.getById.success, payload }),
  },
  filter: {
    start: payload => ({ type: actionTypes.filter.start, payload }),
    error: error => ({ type: actionTypes.filter.error, error }),
    success: payload => ({ type: actionTypes.filter.success, payload }),
  },
  resetState: () => ({ type: actionTypes.resetState }),
};

export function toModel(values) {
  const data = { ...values };
  return data;
}

export function* saga() {
  yield takeLatest(actionTypes.getById.start, function* getByIdSaga(action) {
    try {
      const data = yield call(crud.get, action.payload);
      yield put(actions.getById.success(data));
    } catch (e) {
      yield put(actions.getById.error(e));
    }
  });

  yield takeLatest(
    actionTypes.create.start,
    function* createInventoryWarehouseSaga(action) {
      try {
        const data = yield call(crud.create, toModel(action.payload));
        yield put(actions.create.success(data));
        action.callback && action.callback();
      } catch (e) {
        yield put(actions.create.error(e));
      }
    },
  );

  yield takeLatest(
    actionTypes.remove.start,
    function* deleteInventoryWarehouseSaga(action) {
      try {
        yield call(crud.remove, action.payload.id);
        yield put(actions.remove.success(action.payload));
        action.callback && action.callback();
      } catch (e) {
        yield put(actions.remove.error(e));
      }
    },
  );

  yield takeLatest(
    actionTypes.filter.start,
    function* filterInventoryWarehouseSaga(action) {
      try {
        const data = yield call(crud.filter, action.payload);
        yield put(actions.filter.success(data));
      } catch (e) {
        yield put(actions.filter.error(e));
      }
    },
  );
}

const selectInventoryWarehouseListState = state =>
  state[MODULE_STATE_NAME] || initialState;

export const makeSelectInventoryWarehouseDetail = createSelector(
  selectInventoryWarehouseListState,
  (state = {}) => {
    const { inventoryWarehouseDetail = {} } = state;
    return {
      ...inventoryWarehouseDetail,
    };
  },
);

export const makeSelectInventoryWarehouseList = createSelector(
  selectInventoryWarehouseListState,
  (state = {}) => ({
    ...state.inventoryWarehouseList,
    results: state.inventoryWarehouseList.results || [],
  }),
);
