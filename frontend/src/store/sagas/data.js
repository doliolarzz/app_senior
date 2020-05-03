import { takeEvery, call, fork, put } from 'redux-saga/effects';
import * as actions from '../actions/data';
import * as api from '../api/data';
var JSZip = require('jszip');

function* fetchDataRange() {
    try {
        const data = yield call(api.getCVITable);
        yield put(actions.getDataRangeSuccess({ ...data }))
    } catch(e) {
        yield put(actions.getDataRangeFailed({ error: e.message }))
    }
}
function* watchFetchDataRange() {
    yield takeEvery(actions.Types.GET_DATA_RANGE_REQUEST, fetchDataRange);
}

function* fetchImagesData(action) {
    try {
        const data = yield call(api.getCompareRegion, { time: action.payload.time });
        const imgs =  yield call(JSZip.loadAsync(data).then(function (zip) {
            return zip.file("content.txt").async("string");
        }))
        yield put(actions.getImagesDataSuccess({ ...data }))
    } catch(e) {
        yield put(actions.getImagesDataFailed({ error: e.message }))
    }
}
function* watchFetchImagesData() {
    yield takeEvery(actions.Types.GET_IMGS_DATA_REQUEST, fetchImagesData);
}

const DataSagas = [
    fork(watchFetchDataRange),
    fork(watchFetchImagesData),
];

export default DataSagas;