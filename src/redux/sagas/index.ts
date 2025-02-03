import { takeLatest, put, spawn, retry, debounce } from 'redux-saga/effects';
import { searchSkillsRequest, searchSkillsSuccess, searchSkillsFailure, changeSearchField } from '../slices/searchSlice';
import apiRequests from '../../api/apiRequests';
import VITE_BACKEND_URL from '../../environment/environment';


function filterChangeSearchAction({ type, payload }: SearchSkillsSaga) {
  return changeSearchField.type === type && payload.search.trim() !== ""
}

function* handleChangeSearchSaga(action: SearchSkillsSaga): Generator<unknown, void, unknown> {

  if (filterChangeSearchAction(action)) {
    yield put(searchSkillsRequest({ search: action.payload.search }));
  } else {
    yield put(searchSkillsRequest({ search: '' }));
  }
}

function* handleSearchSkillsSaga(action: SearchSkillsSaga): Generator<unknown, void, unknown> {

  try {
    const retryCount = 3;
    const retryDelay = 1000;

    const data = yield retry(retryCount, retryDelay, apiRequests, {
      type: 'searchSkillsRequest',
      payload: { search: action.payload.search },
      url: VITE_BACKEND_URL
    });

    if (data) {
      yield put(searchSkillsSuccess(data));
    } else {
      yield put(searchSkillsSuccess([]));
    }

  } catch (error) {
    if (error instanceof Error) {
      yield put(searchSkillsFailure(error.message));
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

function* watchChangeSearchSaga() {
  yield debounce(300, changeSearchField, handleChangeSearchSaga);
}

function* watchSearchSkillsSaga() {
  yield takeLatest(searchSkillsRequest.type, handleSearchSkillsSaga);
}

export default function* rootSaga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
}