import { Types } from '../actions/data';

const INIT_STATE = {
  loadingImgs: false,
  imgs: [],
  loadingMetrics: false,
  metrics: {},
}

export default function data(state = INIT_STATE, action) {
  switch (action.type) {
    case Types.GET_METRICS_DATA_REQUEST: {
      return {
        ...state,
        loadingMetrics: true,
        metrics: {},
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
        imgs: [],
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
    default: return state;
  }
}