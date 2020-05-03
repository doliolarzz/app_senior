import { Types } from '../actions/data';

const INIT_STATE = {
  cviTable: [],
  loadingTable: false,
  cmpReg: [],
  loadingCmpReg: false,
  stats: [],
  loadingStats: false,
  mapType: null,
  mapShape: null,
  loadingShape: false,
  dataRadar: {},
  loadingRadar: false,
  provinceDataLine: [],
  loadingDataLine: false,
}

export default function data(state = INIT_STATE, action) {
  switch (action.type) {
    case Types.GET_TABLE_DATA_REQUEST: {
      return {
        ...state,
        loadingTable: true,
        cviTable: [],
      }
    }
    case Types.GET_TABLE_DATA_SUCCESS: {
      return {
        ...state,
        loadingTable: false,
        cviTable: action.payload.data,
      }
    }
    case Types.GET_TABLE_DATA_FAILED: {
      return {
        ...state,
        loadingTable: false,
        error: action.payload.error,
      }
    }
    case Types.GET_CMP_REG_DATA_REQUEST: {
      return {
        ...state,
        loadingCmpReg: true,
        cmpReg: [],
      }
    }
    case Types.GET_CMP_REG_DATA_SUCCESS: {
      return {
        ...state,
        loadingCmpReg: false,
        cmpReg: action.payload.data,
      }
    }
    case Types.GET_CMP_REG_DATA_FAILED: {
      return {
        ...state,
        loadingCmpReg: false,
        error: action.payload.error,
      }
    }
    case Types.GET_ST_TIME_DATA_REQUEST: {
      return {
        ...state,
        loadingStats: true,
        stats: [],
      }
    }
    case Types.GET_ST_TIME_DATA_SUCCESS: {
      return {
        ...state,
        loadingStats: false,
        stats: action.payload.data['Data'],
      }
    }
    case Types.GET_ST_TIME_DATA_FAILED: {
      return {
        ...state,
        loadingStats: false,
        error: action.payload.error,
      }
    }
    case Types.GET_MAP_SHAPE_DATA_REQUEST: {
      return {
        ...state,
        loadingShape: true,
        mapShape: null,
        mapType: null,
      }
    }
    case Types.GET_MAP_SHAPE_DATA_SUCCESS: {
      return {
        ...state,
        loadingShape: false,
        mapShape: action.payload.data,
        mapType: action.payload.mapType,
      }
    }
    case Types.GET_MAP_SHAPE_DATA_FAILED: {
      return {
        ...state,
        loadingShape: false,
        error: action.payload.error,
      }
    }
    case Types.GET_RAD_DATA_REQUEST: {
      return {
        ...state,
        loadingRadar: true,
        dataRadar: {},
      }
    }
    case Types.GET_RAD_DATA_SUCCESS: {
      return {
        ...state,
        loadingRadar: false,
        dataRadar: action.payload.data,
      }
    }
    case Types.GET_RAD_DATA_FAILED: {
      return {
        ...state,
        loadingRadar: false,
        error: action.payload.error,
      }
    }
    case Types.GET_PR_LIN_DATA_REQUEST: {
      return {
        ...state,
        loadingDataLine: true,
        provinceDataLine: {},
      }
    }
    case Types.GET_PR_LIN_DATA_SUCCESS: {
      return {
        ...state,
        loadingDataLine: false,
        provinceDataLine: action.payload.data,
      }
    }
    case Types.GET_PR_LIN_DATA_FAILED: {
      return {
        ...state,
        loadingDataLine: false,
        error: action.payload.error,
      }
    }
    default: return state;
  }
}