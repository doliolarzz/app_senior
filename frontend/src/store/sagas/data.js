import { takeEvery, call, fork, put, all } from 'redux-saga/effects';
import * as actions from '../actions/data';
import * as api from '../api/data';
var JSZip = require('jszip');

function* fetchMetricsData(action) {
    try {
        const data = yield call(api.getMetricsData, { dt: action.payload.dt });
        yield put(actions.getMetricsDataSuccess({ ...data }))
    } catch (e) {
        yield put(actions.getMetricsDataFailed({ error: e.message }))
    }
}
function* watchFetchMetricsData() {
    yield takeEvery(actions.Types.GET_METRICS_DATA_REQUEST, fetchMetricsData);
}

function* fetchImagesData(action) {
    const getImg = (itype, n) => call(api.getImagesData, { dt: action.payload.dt, itype, n });
    try {
        const pred = yield all([...Array(18).keys()].map((_, i) => getImg('pred', i)));
        const label = yield all([...Array(18).keys()].map((_, i) => getImg('label', i)));
        yield put(actions.getImagesDataSuccess({
            data: { pred: pred.map((v) => v.data.img), label: label.map((v) => v.data.img) }
        }))
    } catch (e) {
        yield put(actions.getImagesDataFailed({ error: e.message }))
    }
}
function* watchFetchImagesData() {
    yield takeEvery(actions.Types.GET_IMGS_DATA_REQUEST, fetchImagesData);
}

const DataSagas = [
    fork(watchFetchMetricsData),
    fork(watchFetchImagesData),
];

export default DataSagas;