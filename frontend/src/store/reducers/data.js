import { Types } from '../actions/data';

const INIT_STATE = {
  loadingImgs: false,
  imgs: null,
  loadingMetrics: false,
  metrics: null,
  count: 0
}

export default function data(state = INIT_STATE, action) {
  switch (action.type) {
    case Types.GET_METRICS_DATA_REQUEST: {
      return {
        ...state,
        loadingMetrics: true,
        metrics: null,
      }
    }
    case Types.GET_METRICS_DATA_SUCCESS: {
      return {
        ...state,
        loadingMetrics: false,
        metrics: action.payload.data.metrics,
      }
    }
    case Types.GET_METRICS_DATA_FAILED: {
      return {
        ...state,
        loadingMetrics: false,
        error: action.payload.error,
      }
    }
    case Types.GET_IMGS_DATA_REQUEST: {
      return {
        ...state,
        loadingImgs: true,
        imgs: null,
      }
    }
    case Types.GET_IMGS_DATA_SUCCESS: {
      return {
        ...state,
        loadingImgs: false,
        imgs: action.payload.data,
      }
    }
    case Types.GET_IMGS_DATA_FAILED: {
      return {
        ...state,
        loadingImgs: false,
        error: action.payload.error,
      }
    }
    case Types.SET_COUNT_TIME_REQUEST: {
      return {
        ...state,
        count: action.payload.count,
      }
    }
    case Types.SET_COUNT_TIME_SUCCESS: {
      return {
        ...state,
        count: action.payload.count,
      }
    }
    default: return state;
  }
}